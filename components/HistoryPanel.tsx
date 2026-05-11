"use client";

import { useEffect, useState } from "react";
import type { GenerateResponse } from "@/types";

interface HistoryItem {
  id: string;
  productName: string;
  category: string;
  tone: string;
  seoTitle: string;
  description: string;
  bullets: string[];
  model: string;
  createdAt: string;
}

interface HistoryPanelProps {
  onSelect: (result: GenerateResponse) => void;
  refreshTrigger: number;
}

export default function HistoryPanel({ onSelect, refreshTrigger }: HistoryPanelProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Recent Generations
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect({ seoTitle: item.seoTitle, description: item.description, bullets: item.bullets })}
            className="w-full text-left rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-indigo-300 hover:shadow-sm transition group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                {item.productName}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400">{item.category}</p>
              {item.tone && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 font-medium">
                  {item.tone}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
