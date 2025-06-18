
'use server';
/**
 * @fileOverview A Genkit flow for the EduBot chatbot.
 *
 * - eduBotFlow - An async function that invokes the Genkit-defined chatbot flow.
 * - EduBotFlowInput - The input type for the eduBotFlow function.
 * - EduBotFlowOutput - The return type for the eduBotFlow function.
 */

import {ai} from '@/ai/genkit';
import {Message, Role} from 'genkit/model'; // Correct import for Message and Role
import {z} from 'genkit';

const SystemPrompt = `Você é o Edu, 21 anos, dev full stack, responde com sarcasmo, praticidade, foco em benefício para quem lê, sem formalidade. Se receber uma imagem, comente sobre ela de forma relevante à conversa antes de prosseguir com a resposta principal.`;

// Schema for individual parts of a chat message (text or inline image data)
const ChatMessagePartSchema = z.object({
  text: z.string().optional(),
  inlineData: z.object({
    mimeType: z.string(),
    data: z.string(), // Base64 encoded data
  }).optional(),
});

// Schema for a single chat message (user, model, or system)
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']), // System role for history is unusual, typically user/model
  parts: z.array(ChatMessagePartSchema),
});

// Input schema for the Genkit flow
const EduBotFlowInputSchema = z.object({
  message: z.string().describe('The current user message.'),
  history: z.array(ChatMessageSchema.extend({ // Make sure history roles are only user/model
    role: z.enum(['user', 'model'])
  })).optional().describe('The conversation history.'),
  imageDataUri: z.string().optional().describe("An optional image provided by the user, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type EduBotFlowInput = z.infer<typeof EduBotFlowInputSchema>;

// Output schema for the Genkit flow
const EduBotFlowOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s response.'),
});
export type EduBotFlowOutput = z.infer<typeof EduBotFlowOutputSchema>;


// Define the Genkit flow that contains the core AI logic
const eduBotGenkitLogicFlow = ai.defineFlow(
  {
    name: 'eduBotGenkitLogicFlow', // Distinct name for Genkit internal registration
    inputSchema: EduBotFlowInputSchema,
    outputSchema: EduBotFlowOutputSchema,
  },
  async (input: EduBotFlowInput): Promise<EduBotFlowOutput> => {
    // Map input history (from client) to Genkit Message format
    const genkitHistory: Message[] = (input.history || []).map(hMsg => ({
      role: hMsg.role as Role, // 'user' or 'model'
      content: hMsg.parts.map(part => {
        if (part.text) {
          return { text: part.text };
        }
        // History images are not directly handled by this simple flow's prompt structure.
        // If historical images were needed, the prompt and processing would need to be more complex.
        return {text: ''}; 
      }).filter(p => p.text) // Ensure only parts with text are included for history
    }));

    const currentUserParts: any[] = [{ text: input.message }];
    if (input.imageDataUri) {
      // The imageDataUri is already a data URI string, ready for Genkit media helper
      currentUserParts.push({ media: { url: input.imageDataUri } });
    }

    const messages: Message[] = [
      ...genkitHistory,
      { role: 'user', content: currentUserParts },
    ];

    const result = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest', // Ensure this is a suitable multimodal model
      prompt: messages,
      system: SystemPrompt,
      config: {
         safetySettings: [ 
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }
    });

    const answer = result.text || "Não consegui pensar em nada para isso agora. Tenta de novo?";
    return { answer };
  }
);

// Exported async function that React components will call.
// This function now invokes the Genkit-defined flow.
export async function eduBotFlow(input: EduBotFlowInput): Promise<EduBotFlowOutput> {
  return eduBotGenkitLogicFlow(input);
}
