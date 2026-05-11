export type Tone = "Professional" | "Luxury" | "Casual" | "Minimalist";

export interface ProductInput {
  name: string;
  category: string;
  features: string;
  tone: Tone;
}

export interface GenerateResponse {
  description: string;
  bullets: string[];
  seoTitle: string;
  used?: number;
  limit?: number;
}
