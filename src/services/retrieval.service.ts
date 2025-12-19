import { qdrantClient } from "../config/qdrant";

const COLLECTION = process.env.QDRANT_COLLECTION || "news_vectors";

export async function retrieveArticles(
  embedding: number[],
  limit = 1
): Promise<string> {
  if (!embedding || embedding.length === 0) {
    throw new Error("Query embedding is empty");
  }

  try {
    const results = await qdrantClient.search(COLLECTION, {
      vector: embedding,
      limit,
      with_payload: true,
    });

    if (!results || results.length === 0) {
      return "";
    }

    return results
      .map((r, i) => {
        const payload = r.payload as any;

        return `
Article ${i + 1}:
Title: ${payload?.title}
Content: ${payload?.content}
`;
      })
      .join("\n");
  } catch (error) {
    console.error("Qdrant search failed:", error);
    throw error;
  }
}
