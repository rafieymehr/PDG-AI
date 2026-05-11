"use client";

import { useState } from "react";
import type { GenerateResponse, Tone } from "@/types";

interface ProductFormProps {
  onResult: (result: GenerateResponse) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  disabled?: boolean;
}

interface FormErrors {
  name?: string;
  category?: string;
  features?: string;
}

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: "Professional", label: "Professional", description: "Clear & authoritative" },
  { value: "Luxury", label: "Luxury", description: "Aspirational & premium" },
  { value: "Casual", label: "Casual", description: "Friendly & approachable" },
  { value: "Minimalist", label: "Minimalist", description: "Short & precise" },
];

export default function ProductForm({ onResult, onLoading, onError, disabled = false }: ProductFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!features.trim()) newErrors.features = "Key features are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    onLoading(true);
    onError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, category, features, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      onResult(data);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
      onLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Wireless Noise-Cancelling Headphones"
          className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            errors.name ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Electronics, Fashion, Home & Garden"
          className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            errors.category ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
          }`}
        />
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="features" className="block text-sm font-medium text-slate-700 mb-1">
          Key Features
        </label>
        <textarea
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows={4}
          placeholder="e.g. Active noise cancellation, 30-hour battery life, premium leather ear cushions, Bluetooth 5.2"
          className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${
            errors.features ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
          }`}
        />
        {errors.features && <p className="mt-1 text-sm text-red-600">{errors.features}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Tone
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TONES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`rounded-lg border px-3 py-2.5 text-left transition ${
                tone === t.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <p className="text-sm font-medium">{t.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || disabled}
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating...
          </>
        ) : (
          "Generate Description"
        )}
      </button>
    </form>
  );
}
