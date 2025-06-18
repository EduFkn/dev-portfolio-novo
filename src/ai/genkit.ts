import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai'; // Ensure Google AI plugin is imported
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

export const ai = genkit({
  plugins: [
    googleAI({
      // A API Key do Google AI geralmente é pega de Application Default Credentials (ADC)
      // ou de uma variável de ambiente como GOOGLE_API_KEY, se explicitamente configurada.
      // Não é necessário colocar a chave diretamente aqui se o ADC estiver configurado.
      // apiKey: process.env.GOOGLE_API_KEY, // Descomente e configure se não estiver usando ADC
    }),
  ],
  // Definir um modelo padrão do Google AI
  model: 'googleai/gemini-1.5-flash-latest',
});
