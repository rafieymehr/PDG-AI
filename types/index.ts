export interface ProductInput {
  name: string;
  category: string;
  features: string;
}

export interface GenerateResponse {
  description: string;
  bullets: string[];
  seoTitle: string;
}
