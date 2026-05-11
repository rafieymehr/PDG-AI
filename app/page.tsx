"use client";

import { useState, useEffect } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import ProductForm from "@/components/ProductForm";
import ResultDisplay from "@/components/ResultDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import UsageBar from "@/components/UsageBar";
import type { GenerateResponse } from "@/types";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyTrigger, setHistoryTrigger] = useState(0);
  const [usage, setUsage] = useState<{ used: number; limit: number } | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/usage")
      .then((r) => r.json())
      .then((data) => { if (data.used !== undefined) setUsage(data); });
  }, [isSignedIn]);

  function handleResult(r: GenerateResponse) {
    setResult(r);
    if (r.used !== undefined && r.limit !== undefined) {
      setUsage({ used: r.used, limit: r.limit });
    }
    setHistoryTrigger((n) => n + 1);
  }

  const isLimitReached = error === "LIMIT_REACHED";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800 text-sm">PDG AI</span>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <span className="text-sm text-slate-500 hidden sm:block">
                {user.primaryEmailAddress?.emailAddress}
              </span>
              <UserButton />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition-colors">
                Sign in
              </button>
            </SignInButton>
          )}
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Product Description Generator
            </h1>
            <p className="mt-2 text-slate-500 text-base">
              Turn product details into premium ecommerce copy — powered by AI.
            </p>
          </div>

          {isSignedIn ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-8">
              <ProductForm
                onResult={handleResult}
                onLoading={setIsLoading}
                onError={setError}
                disabled={usage !== null && usage.used >= usage.limit}
              />
              {usage && <UsageBar used={usage.used} limit={usage.limit} />}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Sign in to generate copy</h2>
              <p className="text-slate-500 text-sm mb-6">Create an account or sign in to start generating premium product descriptions.</p>
              <SignInButton mode="modal">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
                  Sign in to get started
                </button>
              </SignInButton>
            </div>
          )}

          {isSignedIn && isLimitReached && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800">You've used all 10 free generations this month</p>
                  <p className="text-sm text-amber-700 mt-0.5">Upgrade to Pro for 500 generations/month, full history, and tone selector priority.</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    Upgrade to Pro — $19/mo
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSignedIn && error && !isLimitReached && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {isSignedIn && <ResultDisplay result={result} isLoading={isLoading} />}

          {isSignedIn && (
            <HistoryPanel onSelect={setResult} refreshTrigger={historyTrigger} />
          )}

          <p className="mt-8 text-center text-xs text-slate-400">
            Powered by Claude AI · Built with Next.js
          </p>
        </div>
      </div>
    </main>
  );
}
