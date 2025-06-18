
'use server';
/**
 * @fileOverview A Genkit flow for the EduBot chatbot.
 *
 * - eduBotFlow - A function that handles the chatbot conversation.
 * - EduBotFlowInput - The input type for the eduBotFlow function.
 * - EduBotFlowOutput - The return type for the eduBotFlow function.
 */

import {ai} from '@/ai/genkit';
import {Message, Role} from 'genkit/model';
import {z} from 'genkit';

const SystemPrompt = `Você é o Edu, 21 anos, dev full stack, responde com sarcasmo, praticidade, foco em benefício para quem lê, sem formalidade. Se receber uma imagem, comente sobre ela de forma relevante à conversa antes de prosseguir com a resposta principal.`;

const ChatMessagePartSchema = z.object({
  text: z.string().optional(),
  inlineData: z.object({
    mimeType: z.string(),
    data: z.string(), // Base64 encoded data
  }).optional(),
});

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']),
  parts: z.array(ChatMessagePartSchema),
});

// Remove export from Zod schema object
const EduBotFlowInputSchema = z.object({
  message: z.string().describe('The current user message.'),
  history: z.array(ChatMessageSchema).optional().describe('The conversation history.'),
  imageDataUri: z.string().optional().describe("An optional image provided by the user, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type EduBotFlowInput = z.infer<typeof EduBotFlowInputSchema>;

// Remove export from Zod schema object
const EduBotFlowOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s response.'),
});
export type EduBotFlowOutput = z.infer<typeof EduBotFlowOutputSchema>;


export async function eduBotFlow(input: EduBotFlowInput): Promise<EduBotFlowOutput> {
  // Map input history to Genkit Message format
  const genkitHistory: Message[] = (input.history || []).map(hMsg => ({
    role: hMsg.role as Role, // Assuming roles match. Add validation if needed.
    content: hMsg.parts.map(part => {
      if (part.text) {
        return { text: part.text };
      }
      if (part.inlineData) {
        // Ensure the data URI is correctly formatted for Genkit media helper
        const dataUri = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        return { media: { url: dataUri, contentType: part.inlineData.mimeType } };
      }
      return {text: ''}; // Should not happen with proper input
    }).filter(p => p.text || p.media)
  }));

  const currentUserParts: any[] = [{ text: input.message }];
  if (input.imageDataUri) {
    // The imageDataUri is already a data URI string
    currentUserParts.push({ media: { url: input.imageDataUri } });
  }

  const messages: Message[] = [
    ...genkitHistory,
    { role: 'user', content: currentUserParts },
  ];

  const result = await ai.generate({
    model: 'googleai/gemini-1.5-flash-latest', // Multimodal model
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

// Define the flow using ai.defineFlow, this is good practice for Genkit tooling
// but not strictly necessary for the eduBotFlow function to be callable from React components.
// Keep the internal flow definition (e.g., 'eduBotGenkitFlow') separate from the exported 'eduBotFlow'.
const eduBotGenkitFlow = ai.defineFlow(
  {
    name: 'eduBotGenkitFlow', // Distinct name for Genkit internal registration
    inputSchema: EduBotFlowInputSchema,
    outputSchema: EduBotFlowOutputSchema,
  },
  async (input: EduBotFlowInput) => {
    // This inner function directly calls the main logic.
    // This wrapper is primarily for Genkit's own flow management (tracing, etc.)
    // The exported eduBotFlow function is what the React component will call.
    return eduBotFlow(input);
  }
);
