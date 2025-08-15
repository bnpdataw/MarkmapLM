import { GoogleGenAI } from "@google/genai";

export async function fixMarkdownWithGemini(markdown: string, apiKey: string): Promise<string> {
  if (!apiKey) {
      throw new Error("Gemini API Key not provided. Please set it in the settings.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
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
    throw new Error("Failed to get a response from the AI service. Please check your API key and network connection.");
  }
}