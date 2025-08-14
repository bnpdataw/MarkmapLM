
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fixMarkdownWithGemini(markdown: string): Promise<string> {
  if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
  }
  
  const model = "gemini-2.5-flash";
  const prompt = `You are an expert at fixing Markdown syntax. The following text is a Markdown document that may contain syntax errors. Please analyze it, correct any issues you find, and return only the corrected Markdown content. Do not add any introductory text, explanations, or code block fences (like \`\`\`markdown) around the output. Just return the raw, corrected Markdown.
Here is the text to fix:
---
${markdown}`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    
    const fixedMarkdown = response.text;
    if (!fixedMarkdown) {
        throw new Error("Gemini returned an empty response.");
    }
    
    return fixedMarkdown.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI service.");
  }
}
