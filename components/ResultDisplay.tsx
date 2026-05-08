"use client";

import type { GenerateResponse } from "@/types";
import CopyButton from "./CopyButton";

interface ResultDisplayProps {
  result: GenerateResponse | null;
  isLoading: boolean;
}

function formatResultAsText(result: GenerateResponse): string {
  return `${result.seoTitle}\n\n${result.description}\n\n${result.bullets.map((b) => `• ${b}`).join("\n")}`;
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-4/6" />
      </div>
      <div className="space-y-2 pt-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded w-5/6" />
        ))}
      </div>
    </div>
  );
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  if (!isLoading && !result) return null;

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Generated Copy
        </h2>
        {result && (
          <CopyButton text={formatResultAsText(result)} />
        )}
      </div>

      <div className="px-6 py-6">
        {isLoading ? (
          <Skeleton />
        ) : result ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                SEO Title
              </p>
              <p className="text-xl font-bold text-slate-900">{result.seoTitle}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-slate-700 leading-relaxed">{result.description}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Key Benefits
              </p>
              <ul className="space-y-2">
                {result.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
