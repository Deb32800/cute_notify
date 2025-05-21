
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME, PERSONALIZED_CUTE_MESSAGE_PROMPT } from '../constants';

const getApiKey = (): string | undefined => {
  // Per instructions, we must use process.env.API_KEY directly.
  return process.env.API_KEY;
};


export const generateCuteMessage = async (): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("API Key is not configured. Please set the API_KEY environment variable.");
    // This specific error message will be displayed to Naano in a notification.
    throw new Error("My dearest Naano, Dev needs to set up my AI brain (API Key) so I can send you sweet messages! Please tell him. ❤️");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: PERSONALIZED_CUTE_MESSAGE_PROMPT,
      // config: { // Config options can be added here if needed
        // temperature: 0.8, // Slightly more creative for personal messages
        // topP: 0.95,
        // topK: 50,
      // }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI brain didn't have a message this time. Dev will check on it!");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating cute message:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid")) {
         throw new Error("My dearest Naano, the API key Dev set up for me isn't working. 😟 Please let him know!");
      }
       // Keep other specific errors from API or throw a softer one for Naano
       throw new Error(`Oh no! I tried to think of a sweet message for you, Naano, but something went wrong on my end. Dev will fix it! 🛠️ (Details: ${error.message})`);
    }
    throw new Error("An unknown hiccup occurred while crafting a message for you, Naano. Dev will look into it!");
  }
};
