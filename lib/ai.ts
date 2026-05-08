import Anthropic from "@anthropic-ai/sdk";
import type { ProductInput, GenerateResponse } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.MODEL ?? "claude-haiku-4-5";

export async function generateDescription(
  input: ProductInput
): Promise<GenerateResponse> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a premium ecommerce copywriter. Generate product copy for:
- Product: ${input.name}
- Category: ${input.category}
- Key Features: ${input.features}

Return ONLY valid JSON matching exactly this schema:
{
  "seoTitle": "SEO-optimized product title (50-60 chars)",
  "description": "Persuasive luxury paragraph (2-3 sentences)",
  "bullets": ["feature bullet 1", "feature bullet 2", "feature bullet 3", ...]
}

Rules:
- Luxury, professional, natural marketing language
- SEO-friendly keywords woven in
- 4-6 bullets highlighting specific benefits
- No repetition, no generic filler phrases
- Output ONLY the JSON object, no markdown, no extra text`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  const parsed = JSON.parse(text) as GenerateResponse;
  return parsed;
}
