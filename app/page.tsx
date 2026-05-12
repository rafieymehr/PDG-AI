"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import ResultDisplay from "@/components/ResultDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import UsageBar from "@/components/UsageBar";
import LandingPage from "@/components/LandingPage";
import type { GenerateResponse } from "@/types";

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (isLoaded && !isSignedIn) return <LandingPage />;
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyTrigger, setHistoryTrigger] = useState(0);
  const [usage, setUsage] = useState<{ used: number; limit: number } | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.usedThisMonth !== undefined) {
          setUsage({ used: data.usedThisMonth, limit: data.limit });
        }
        if (data.onWaitlist) setWaitlistJoined(true);
      });
  }, [isSignedIn]);

  function handleResult(r: GenerateResponse) {
    setResult(r);
    if (r.used !== undefined && r.limit !== undefined) {
      setUsage({ used: r.used, limit: r.limit });
    }
    setHistoryTrigger((n) => n + 1);
  }

  const isLimitReached = error === "LIMIT_REACHED";
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  async function joinWaitlist() {
    setWaitlistLoading(true);
    const res = await fetch("/api/waitlist", { method: "POST", credentials: "include" });
    if (res.ok) setWaitlistJoined(true);
    setWaitlistLoading(false);
  }

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
              <Link
                href="/profile"
                className="text-sm text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block"
              >
                {user.primaryEmailAddress?.emailAddress}
              </Link>
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

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-8">
              <ProductForm
                onResult={handleResult}
                onLoading={setIsLoading}
                onError={setError}
                disabled={usage !== null && usage.used >= usage.limit}
              />
              {usage && <UsageBar used={usage.used} limit={usage.limit} />}
              {!waitlistJoined && (
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Pro plan coming soon — 500 generations/month
                  </p>
                  <button
                    onClick={joinWaitlist}
                    disabled={waitlistLoading}
                    className="flex-shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors disabled:opacity-50"
                  >
                    {waitlistLoading ? "Joining..." : "Join waitlist →"}
                  </button>
                </div>
              )}
              {waitlistJoined && (
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-green-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the Pro waitlist.
                </div>
              )}
            </div>

          {isLimitReached && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800">You've used all 10 free generations this month</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Pro plan coming soon — 500 generations/month, priority access, and more.
                  </p>
                  {waitlistJoined ? (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      You're on the list — we'll email you when Pro launches.
                    </div>
                  ) : (
                    <button
                      onClick={joinWaitlist}
                      disabled={waitlistLoading}
                      className="mt-3 inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {waitlistLoading ? "Joining..." : "Join the Pro waitlist"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && !isLimitReached && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <ResultDisplay result={result} isLoading={isLoading} />

          <HistoryPanel onSelect={setResult} refreshTrigger={historyTrigger} />

          {!waitlistJoined && (
            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-indigo-800">Pro plan coming soon</p>
                <p className="text-xs text-indigo-600 mt-0.5">500 generations/month · brand voice · bulk CSV · API access</p>
              </div>
              <button
                onClick={joinWaitlist}
                disabled={waitlistLoading}
                className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {waitlistLoading ? "Joining..." : "Join waitlist"}
              </button>
            </div>
          )}

          {waitlistJoined && (
            <div className="mt-6 rounded-xl border border-green-100 bg-green-50 px-6 py-4 flex items-center gap-3">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium text-green-800">You're on the list — we'll email you when Pro launches.</p>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-400">
            Powered by Claude AI · Built with Next.js
          </p>
        </div>
      </div>
    </main>
  );
}
