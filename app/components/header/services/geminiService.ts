import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: "null" });

export const generateMarketingCopy = async (topic: string): Promise<GeneratedContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a catchy, high-conversion SaaS hero section headline and subheadline for a product about: ${topic}. Keep it punchy, modern, and direct.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: {
              type: Type.STRING,
              description: "A bold, short, attention-grabbing headline (max 8 words).",
            },
            subheadline: {
              type: Type.STRING,
              description: "A persuasive subheadline explaining the value proposition (max 20 words).",
            },
          },
          required: ["headline", "subheadline"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini");
    }

    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Error generating copy:", error);
    // Fallback in case of API error to keep UI functional
    return {
      headline: "Unlock Your Potential Today",
      subheadline: "Experience the power of intelligent tools designed to streamline your workflow and boost productivity effortlessly."
    };
  }
};