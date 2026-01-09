
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from '../types';

// Always use the named parameter and process.env.API_KEY directly for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  /**
   * Generates a chat response using gemini-3-flash-preview.
   * Uses ai.models.generateContent for querying the model with prompt and history.
   */
  async getChatResponse(history: ChatMessage[], userMessage: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are a helpful customer service assistant for "Sudha Dairy & Bakers" (सुधा डेयरी & बेकर्स). 
          You help customers find products, suggest cake ideas, provide health benefits of dairy, and answer questions about the shop. 
          The shop sells: Milk (Full cream, Toned), Paneer, Ghee, Lassi, Curd, Cakes (Chocolate, Vanilla, Fruit), Cookies, and Breads.
          Keep responses polite, brief, and helpful. Use a mix of Hindi and English where appropriate to reflect the local context.`,
          temperature: 0.7,
        },
      });

      // Directly access .text property from GenerateContentResponse.
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm sorry, I'm having trouble connecting. How can I help you otherwise?";
    }
  }

  /**
   * Provides personalized product recommendations based on cart items.
   */
  async getPersonalizedRecommendation(cartItems: string[]) {
    const prompt = `A customer has these items in their cart: ${cartItems.join(', ')}. Suggest 2 complementary bakery or dairy items from Sudha Dairy & Bakers. Return ONLY the names of the items.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      // Directly access .text property from GenerateContentResponse.
      return response.text;
    } catch (error) {
      return "";
    }
  }
}

export const geminiService = new GeminiService();
