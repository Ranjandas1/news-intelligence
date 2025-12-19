import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAnswer(
  context: string,
  query: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are a news intelligence assistant.

Rules:
- Use ONLY the information in the Context.
- The Context may contain multiple articles.
- If the question asks for comparison, analyze ALL relevant articles.
- If there is not enough information, say:
  "I don't have enough information."


Context:
${context || "NO_CONTEXT"}

Question:
${query}

Answer:
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
