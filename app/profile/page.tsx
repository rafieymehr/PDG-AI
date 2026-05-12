"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UsageBar from "@/components/UsageBar";

interface ProfileData {
  name: string;
  email: string;
  imageUrl: string | null;
  memberSince: number | null;
  plan: string;
  usedThisMonth: number;
  limit: number;
  totalGenerations: number;
  onWaitlist: boolean;
}

export default function ProfilePage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/");
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        if (data.onWaitlist) setWaitlistJoined(true);
      });
  }, [isSignedIn]);

  async function joinWaitlist() {
    setWaitlistLoading(true);
    const res = await fetch("/api/waitlist", { method: "POST", credentials: "include" });
    if (res.ok) {
      setWaitlistJoined(true);
      setProfile((p) => p ? { ...p, onWaitlist: true } : p);
    }
    setWaitlistLoading(false);
  }

  if (!isLoaded || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const memberSinceDate = profile.memberSince
    ? new Date(profile.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-3 flex items-center gap-3">
        <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800 text-sm">PDG AI</span>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-xl mx-auto space-y-4">

          {/* User card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-6 flex items-center gap-4">
            {profile.imageUrl ? (
              <img src={profile.imageUrl} alt={profile.name} className="w-14 h-14 rounded-full" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {profile.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-slate-900 text-lg">{profile.name}</p>
              <p className="text-sm text-slate-500">{profile.email}</p>
              {memberSinceDate && (
                <p className="text-xs text-slate-400 mt-0.5">Member since {memberSinceDate}</p>
              )}
            </div>
          </div>

          {/* Plan & usage */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-700">Current Plan</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {profile.plan}
              </span>
            </div>
            <UsageBar used={profile.usedThisMonth} limit={profile.limit} />
            <div className="mt-4 pt-4 border-t border-slate-100">
              {waitlistJoined ? (
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You're on the Pro waitlist — we'll email you when it launches.
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Pro plan coming soon</p>
                    <p className="text-xs text-slate-400 mt-0.5">500 generations/month · bulk CSV · API access</p>
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
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-2xl font-bold text-slate-900">{profile.totalGenerations}</p>
                <p className="text-xs text-slate-500 mt-0.5">Total generations</p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-2xl font-bold text-slate-900">{profile.usedThisMonth}</p>
                <p className="text-xs text-slate-500 mt-0.5">This month</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
