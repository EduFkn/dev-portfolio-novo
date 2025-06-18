
'use server';
/**
 * @fileOverview A Genkit flow for the EduBot chatbot using Google AI.
 *
 * - eduBotFlow - An async function that invokes the Genkit-defined chatbot flow.
 * - EduBotFlowInput - The input type for the eduBotFlow function.
 * - EduBotFlowOutput - The return type for the eduBotFlow function.
 */

import {ai} from '@/ai/genkit';
import {MessageData, Role} from 'genkit/model';
import {z} from 'genkit';

// System Prompt for Edu (image part removed as image input is currently disabled in this version)
const SystemPrompt = `Você é o Edu, 21 anos, dev full stack, responde com sarcasmo, praticidade, foco em benefício para quem lê, sem formalidade.`;

// Schema for individual parts of a chat message (text only for now)
const ChatMessagePartSchema = z.object({
  text: z.string().optional(),
  // imageDataUri: z.string().optional().describe("A data URI of an image (e.g., 'data:image/jpeg;base64,...'). Max 4MB."), // Image input disabled for now
});

// Schema for a single chat message (user, model, or system)
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']),
  parts: z.array(ChatMessagePartSchema),
});

// Input schema for the Genkit flow (imageDataUri removed)
const EduBotFlowInputSchema = z.object({
  message: z.string().describe('The current user message.'),
  history: z.array(ChatMessageSchema.extend({
    role: z.enum(['user', 'model']) 
  })).optional().describe('The conversation history.'),
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
    // Prepare history for Genkit: map and filter empty parts
    const genkitHistory: MessageData[] = (input.history || [])
      .map(hMsg => ({
        role: hMsg.role as Role, 
        content: hMsg.parts
          .map(part => ({ text: (part.text || "").trim() })) 
          .filter(p => p.text !== ''), // Filter out empty text parts
      }))
      .filter(msg => msg.content.length > 0); // Filter out messages with no content parts

    // Prepare current user message
    const currentUserContent: { text: string }[] = [];
    if (input.message && input.message.trim() !== "") {
      currentUserContent.push({ text: input.message.trim() });
    }
    
    // If no text in the current message, return a specific response
    if (currentUserContent.length === 0) {
        console.log('DEBUG: No content in current user message.');
        return { answer: "Você precisa me dizer algo para eu responder! 😉" };
    }

    const messagesToModel: MessageData[] = [
      { role: 'system', content: [{text: SystemPrompt}] }, 
      ...genkitHistory,
      { role: 'user', content: currentUserContent },
    ];

    try {
      console.log('DEBUG: Sending to ai.generate (Google AI). Messages:', JSON.stringify(messagesToModel, null, 2));

      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', // Using Google AI model
        prompt: messagesToModel,
        config: {
          // Example safety settings for Google AI (adjust as needed)
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        },
      });

      console.log('DEBUG: Received from ai.generate (Google AI). Result:', JSON.stringify(result, null, 2));

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
        
        // Handle cases where generation might have failed or been blocked
        if (!responseText.trim() && firstCandidate.finishReason && firstCandidate.finishReason !== 'STOP') { 
           // For Google AI, 'SAFETY' is a common reason for blocked content.
           if (firstCandidate.finishReason === 'SAFETY') {
              console.warn('DEBUG: Response blocked due to SAFETY finishReason (Google AI).');
              return { answer: "Hmm, parece que minha resposta foi bloqueada por alguma política. Tente algo diferente. 🤔" };
           }
           console.warn(`DEBUG: Response generation failed with finishReason: ${firstCandidate.finishReason}`);
           return { answer: `Não consegui gerar uma resposta (motivo: ${firstCandidate.finishReason}). Tenta de novo?`};
        }
      }

      const answer = responseText.trim() || "Não consegui pensar em nada para isso agora. Tenta de novo? 🙄";
      return { answer };

    } catch (error: any) {
      console.error('ERROR in eduBotGenkitLogicFlow (ai.generate call with Google AI):', error);
      // Log the full error for better server-side debugging
      // console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      return { answer: "Desculpe, tive um probleminha para processar sua mensagem com o assistente. Tente de novo, por favor. 🛠️" };
    }
  }
);

// Exported async function that React components will call.
export async function eduBotFlow(input: EduBotFlowInput): Promise<EduBotFlowOutput> {
  return eduBotGenkitLogicFlow(input);
}
