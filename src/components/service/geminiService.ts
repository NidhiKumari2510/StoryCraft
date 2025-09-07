import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;


if (!API_KEY) {
  console.error("❌ Gemini API key is missing. Did you set REACT_APP_GEMINI_API_KEY in .env?");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateStory(subject: string, storyType: string, ageGroup: string, imageStyle: string) {
  try {
    const prompt = `
    Write a children's story based on these inputs:
    - Subject: ${subject}
    - Story type: ${storyType}
    - Age group: ${ageGroup}
    - Image style: ${imageStyle}

    The story should be simple, kid-friendly, and split into 4 short pages.
    Each page should have around 3–4 sentences.
    Return the story in JSON format with "pages": [{text: "..."}].
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Gemini often wraps JSON in ```json ... ```
    const cleanText = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleanText);

    return parsed;
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
}
