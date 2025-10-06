import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";

// ✅ Safer API key check
if (!API_KEY) {
console.error("❌ Gemini API key is missing. Did you set VITE_GEMINI_API_KEY in your .env?");
}

const genAI = new GoogleGenerativeAI(API_KEY);
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


  The story should be simple, kid-friendly, and split into 5 short pages.
  Each page should have around 5–6 sentences.
  Return ONLY valid JSON in this format:
  { "pages": [ { "text": "..." }, { "text": "..." } ] }
`;

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();

console.log("🔍 Gemini raw response:", text);

// ✅ Strip any markdown wrappers
let cleanText = text.replace(/```json|```/g, "").trim();

// ✅ Extra safety: grab only the JSON part
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
