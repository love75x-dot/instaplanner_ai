import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInstagramStrategy = async (
  accountName: string,
  niche: string,
  currentFollowers: string,
  goal: string,
  recentTopics: string,
  benchmarkAccount?: string
): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert Social Media Manager and Instagram Strategist.
    
    Analyze the following Instagram profile context:
    - Account Name: ${accountName}
    - Niche/Category: ${niche}
    - Current Followers: ${currentFollowers}
    - Primary Goal: ${goal}
    - Recent Post Topics: ${recentTopics}
    - Benchmark Account (Role Model/Competitor): ${benchmarkAccount || "Not provided"}

    Task:
    1. Analyze the direction and suggest a growth strategy.
    2. If a Benchmark Account is provided, analyze why that account is successful (hooks, visual style, consistency) and explain how the user can emulate them. If not provided, give general competitive advice for this niche.
    3. Identify top 5 keywords for growth.
    4. Define 3-4 content pillars.
    5. Create a specific, actionable 12-post schedule (simulating a monthly plan, e.g., 3 posts/week) that aligns with this strategy.
    
    The output must be in Korean.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategy: {
            type: Type.OBJECT,
            properties: {
              targetAudience: { type: Type.STRING },
              toneAndManner: { type: Type.STRING },
              benchmarkAnalysis: { 
                type: Type.STRING, 
                description: "Analysis of the benchmark account or general competitive advice if none provided." 
              },
              contentPillars: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              growthKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              improvementSuggestions: { type: Type.STRING },
            },
            required: ["targetAudience", "toneAndManner", "benchmarkAnalysis", "contentPillars", "growthKeywords", "improvementSuggestions"]
          },
          monthlyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER, description: "Day of the month (1-30)" },
                title: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Reels", "Carousel", "Image", "Story"] },
                caption: { type: Type.STRING, description: "Engaging caption draft" },
                hashtags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                visualPrompt: { type: Type.STRING, description: "Description of what the image/video should look like" },
                status: { type: Type.STRING, enum: ["planned"] },
              },
              required: ["day", "title", "type", "caption", "hashtags", "visualPrompt", "status"]
            },
          },
        },
        required: ["strategy", "monthlyPlan"],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as AnalysisResult;
  }
  
  throw new Error("Failed to generate plan");
};