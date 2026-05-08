"use client";

import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import ResultDisplay from "@/components/ResultDisplay";
import type { GenerateResponse } from "@/types";

export default function Home() {
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Product Description Generator
          </h1>
          <p className="mt-2 text-slate-500 text-base">
            Turn product details into premium ecommerce copy — powered by AI.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-8">
          <ProductForm
            onResult={setResult}
            onLoading={setIsLoading}
            onError={setError}
          />
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <ResultDisplay result={result} isLoading={isLoading} />

        <p className="mt-8 text-center text-xs text-slate-400">
          Powered by Claude AI · Built with Next.js
        </p>
      </div>
    </main>
  );
}
