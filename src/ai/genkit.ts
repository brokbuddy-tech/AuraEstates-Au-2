import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const googleAiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export const hasGoogleAiKey = Boolean(googleAiApiKey);

export const ai = hasGoogleAiKey
  ? genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    })
  : genkit({
      plugins: [],
    });
