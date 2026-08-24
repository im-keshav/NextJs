import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

async function generateAiResponse(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });
    return response.text || "No AI response text returned";
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    throw err;
  }
}

export default generateAiResponse;