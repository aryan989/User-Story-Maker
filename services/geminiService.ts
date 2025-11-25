import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserStory, BRDData } from "../types";

// Initialize the client
// CRITICAL: process.env.API_KEY is guaranteed to be available in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const STORY_SCHEMA: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: "A unique identifier for the story (e.g., US-001)" },
      title: { type: Type.STRING, description: "A short, catchy title for the story" },
      role: { type: Type.STRING, description: "The user persona (As a...)" },
      goal: { type: Type.STRING, description: "The action user wants to take (I want to...)" },
      benefit: { type: Type.STRING, description: "The value derived (So that...)" },
      acceptanceCriteria: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of specific criteria to verify the story is done"
      },
      priority: { 
        type: Type.STRING, 
        enum: ["High", "Medium", "Low"],
        description: "Priority of the feature"
      },
      estimationPoints: { type: Type.INTEGER, description: "Fibonacci estimation point (1, 2, 3, 5, 8, 13)" }
    },
    required: ["id", "title", "role", "goal", "benefit", "acceptanceCriteria", "priority"]
  }
};

const BRD_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Project Title" },
    executiveSummary: { type: Type.STRING, description: "A high-level summary of the project goals and business value." },
    scope: {
      type: Type.OBJECT,
      properties: {
        inScope: { type: Type.ARRAY, items: { type: Type.STRING } },
        outOfScope: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["inScope", "outOfScope"]
    },
    functionalRequirements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          description: { type: Type.STRING },
          priority: { type: Type.STRING }
        },
        required: ["id", "description", "priority"]
      }
    },
    nonFunctionalRequirements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Performance, security, reliability requirements"
    },
    risksAndMitigation: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          risk: { type: Type.STRING },
          mitigation: { type: Type.STRING }
        },
        required: ["risk", "mitigation"]
      }
    }
  },
  required: ["title", "executiveSummary", "scope", "functionalRequirements", "nonFunctionalRequirements", "risksAndMitigation"]
};

export const generateUserStories = async (problem: string, solution: string): Promise<UserStory[]> => {
  try {
    const prompt = `
      Context: You are a Senior Product Manager.
      Problem Statement: ${problem}
      Proposed Solution: ${solution}
      
      Task: Generate a comprehensive list of User Stories for this solution. 
      Ensure coverage of happy paths, edge cases, and administrative functions if applicable.
      Focus on value delivery.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: STORY_SCHEMA,
        temperature: 0.3 // Lower temperature for more structured/standard output
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as UserStory[];
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating stories:", error);
    throw error;
  }
};

export const generateBRD = async (problem: string, solution: string): Promise<BRDData> => {
  try {
    const prompt = `
      Context: You are a Senior Business Analyst.
      Problem Statement: ${problem}
      Proposed Solution: ${solution}
      
      Task: Create a structured Business Requirements Document (BRD). 
      Be professional, concise, and thorough.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: BRD_SCHEMA,
        temperature: 0.4
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BRDData;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating BRD:", error);
    throw error;
  }
};