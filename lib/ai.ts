import Anthropic from "@anthropic-ai/sdk";
import type { ProductInput, GenerateResponse, Tone } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.MODEL ?? "claude-sonnet-4-6";

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  Professional: "Use clear, confident, and authoritative language suited for B2B or corporate buyers.",
  Luxury: "Use aspirational, sensory-rich language that evokes exclusivity and premium quality.",
  Casual: "Use friendly, conversational language that feels approachable and relatable.",
  Minimalist: "Use short, precise, no-fluff language. Every word must earn its place.",
};

export async function generateDescription(
  input: ProductInput
): Promise<GenerateResponse> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: `You are a premium ecommerce copywriter. Generate product copy based on the product details provided.

Return ONLY valid JSON matching exactly this schema:
{
  "seoTitle": "SEO-optimized product title (50-60 chars)",
  "description": "Persuasive paragraph (2-3 sentences)",
  "bullets": ["feature bullet 1", "feature bullet 2", "feature bullet 3", ...]
}

Rules:
- SEO-friendly keywords woven in naturally
- 4-6 bullets highlighting specific benefits
- No repetition, no generic filler phrases
- Output ONLY the JSON object, no markdown, no extra text`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Tone: ${input.tone} — ${TONE_INSTRUCTIONS[input.tone]}\nProduct: ${input.name}\nCategory: ${input.category}\nKey Features: ${input.features}`,
      },
    ],
  });

  const raw =
    message.content[0].type === "text" ? message.content[0].text : "";

  const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  const parsed = JSON.parse(text) as GenerateResponse;
  return parsed;
}
