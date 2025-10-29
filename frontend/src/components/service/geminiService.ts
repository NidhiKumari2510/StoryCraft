import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ✅ Check API key
if (!API_KEY) {
  console.error("❌ Gemini API key is missing. Please add VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

export async function generateStory(
  subject: string,
  storyType: string,
  ageGroup: string,
  imageStyle: string
) {
  try {
    const prompt = `
      Write a children's story based on these inputs:
      - Subject: ${subject}
      - Story type: ${storyType}
      - Age group: ${ageGroup}
      - Image style: ${imageStyle}

      The story should be simple, creative, and split into 5 short pages.
      Each page should have 4–6 sentences.
      Return ONLY valid JSON in this exact format:
      { "pages": [ { "text": "..." }, { "text": "..." }, ... ] }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("🔍 Gemini raw response:", text);

    // ✅ Clean up response
    let cleanText = text.replace(/```json|```/g, "").trim();

    // ✅ Extract only the JSON part
    const firstBrace = cleanText.indexOf("{");
    const lastBrace = cleanText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanText);
    return parsed;

  } catch (error) {
    console.error("❌ Error generating story:", error);
    throw error;
  }
}
