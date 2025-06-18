
'use server';
/**
 * @fileOverview A Genkit flow for the EduBot chatbot.
 *
 * - eduBotFlow - An async function that invokes the Genkit-defined chatbot flow.
 * - EduBotFlowInput - The input type for the eduBotFlow function.
 * - EduBotFlowOutput - The return type for the eduBotFlow function.
 */

import {ai} from '@/ai/genkit';
import {MessageData, MessagePart, Role} from 'genkit/model'; // Adjusted imports
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
  role: z.enum(['user', 'model', 'system']),
  parts: z.array(ChatMessagePartSchema),
});

// Input schema for the Genkit flow
const EduBotFlowInputSchema = z.object({
  message: z.string().describe('The current user message.'),
  history: z.array(ChatMessageSchema.extend({
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
    name: 'eduBotGenkitLogicFlow',
    inputSchema: EduBotFlowInputSchema,
    outputSchema: EduBotFlowOutputSchema,
  },
  async (input: EduBotFlowInput): Promise<EduBotFlowOutput> => {
    const genkitHistory: MessageData[] = (input.history || []).map(hMsg => ({
      role: hMsg.role as Role,
      content: hMsg.parts.map(part => {
        // For history, we primarily expect text parts based on current client implementation
        return { text: part.text || "" }; // Ensure text property exists
      }).filter(p => p.text.trim() !== '') // Filter out parts that are just empty strings
    })).filter(msg => msg.content.length > 0); // Filter out messages with no valid content

    const currentUserContent: MessagePart[] = [];
    if (input.message && input.message.trim() !== "") {
      currentUserContent.push({ text: input.message });
    }
    if (input.imageDataUri) {
      currentUserContent.push({ media: { url: input.imageDataUri } });
    }

    // Ensure there's actually content to send for the current user message
    if (currentUserContent.length === 0) {
        return { answer: "Você precisa me dizer ou mostrar algo para eu responder! 😉" };
    }

    const messagesToModel: MessageData[] = [
      ...genkitHistory,
      { role: 'user', content: currentUserContent },
    ];

    const result = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: { messages: messagesToModel, system: SystemPrompt }, // Pass as structured prompt
      config: {
         safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }
    });

    let responseText = "";
    if (result.candidates && result.candidates.length > 0) {
      const firstCandidate = result.candidates[0];
      if (firstCandidate.message && firstCandidate.message.content) {
        for (const part of firstCandidate.message.content) {
          if (part.text) {
            responseText += part.text;
          }
        }
      }
      // Check for finish reason if responseText is empty after processing candidates
      if (!responseText.trim() && firstCandidate.finishReason && firstCandidate.finishReason !== 'STOP') {
         if (firstCandidate.finishReason === 'SAFETY') {
            return { answer: "Hmm, parece que minha resposta foi bloqueada por segurança. Tente algo diferente. 🤔" };
         }
         // Add other specific finish reasons if needed
         return { answer: `Não consegui gerar uma resposta (motivo: ${firstCandidate.finishReason}). Tenta de novo?`};
      }
    }

    const answer = responseText.trim() || "Não consegui pensar em nada para isso agora. Tenta de novo? 🙄";
    return { answer };
  }
);

// Exported async function that React components will call.
export async function eduBotFlow(input: EduBotFlowInput): Promise<EduBotFlowOutput> {
  return eduBotGenkitLogicFlow(input);
}
