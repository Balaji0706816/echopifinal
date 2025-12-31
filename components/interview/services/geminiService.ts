
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { InterviewInfo, Message } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const createInterviewChat = (info: InterviewInfo): Chat => {
  const ai = getGeminiClient();
  const systemInstruction = `
    You are an expert interviewer for the position of ${info.role} at ${info.companyName}.
    The interview type is ${info.interviewType}.
    
    GUIDELINES:
    1. Be professional, slightly challenging, but encouraging.
    2. Ask exactly ONE question at a time.
    3. Start by introducing yourself and asking the first question.
    4. React to the user's answers naturally. If they are vague, ask for clarification.
    5. After about 5-7 questions, conclude the interview and say "[INTERVIEW_COMPLETE]".
    6. Do not provide feedback during the interview; save it for the final stage.
  `;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
      topP: 0.95,
    },
  });
};

export const generateFeedback = async (history: Message[], info: InterviewInfo) => {
  const ai = getGeminiClient();
  const transcript = history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following interview transcript for ${info.role} at ${info.companyName}, provide a detailed professional evaluation in JSON format.
    
    Transcript:
    ${transcript}
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: 'Score from 0 to 100' },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
          overallSummary: { type: Type.STRING }
        },
        required: ["score", "strengths", "improvements", "overallSummary"]
      }
    }
  });

  return JSON.parse(response.text ?? '{}');
};
