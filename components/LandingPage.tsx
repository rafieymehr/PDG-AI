"use client";

import { SignInButton } from "@clerk/nextjs";

const SAMPLE = {
  seoTitle: "Lightweight 3D Printed Earrings | Modern Statement Jewelry",
  description:
    "Redefine your everyday style with earrings that are as effortless as they are eye-catching. Precision 3D-printed from ultra-light resin, each pair delivers intricate geometric detail you won't find anywhere else — without the weight. Designed for the woman who moves fast and still wants to look great doing it.",
  bullets: [
    "Feather-light feel — forget you're wearing them by noon",
    "Precision 3D-printed geometry unavailable in mass-market jewelry",
    "All-day comfort from brunch to a night out",
    "Unique modern aesthetic that sparks conversations",
    "Durable, hypoallergenic resin — safe for sensitive ears",
  ],
};

const FEATURES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    ),
    title: "4 Writing Tones",
    desc: "Professional, Luxury, Casual, or Minimalist — match your brand voice instantly.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
    title: "SEO-Optimized Titles",
    desc: "Every title is crafted to rank — keywords woven in naturally, 50–60 chars.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    title: "Instant Results",
    desc: "Claude Sonnet generates premium copy in under 5 seconds.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: "Generation History",
    desc: "Every output is saved. Revisit and reuse past generations anytime.",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["10 generations / month", "All 4 tones", "Generation history", "Copy to clipboard"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: ["500 generations / month", "All 4 tones", "Full history", "Priority support", "Early access to new features"],
    cta: "Join waitlist",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "per month",
    features: ["Unlimited generations", "Bulk CSV upload", "API access", "Brand voice training", "Multi-language output"],
    cta: "Join waitlist",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="border-b border-slate-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900">PDG AI</span>
        </div>
        <SignInButton mode="modal">
          <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            Sign in free
          </button>
        </SignInButton>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Powered by Claude Sonnet — Anthropic's latest model
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Premium product copy,{" "}
          <span className="text-indigo-600">in seconds</span>
        </h1>
        <p className="mt-6 text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          Turn product name, category, and features into SEO-optimized titles, persuasive descriptions, and bullet points — ready to paste into your store.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <SignInButton mode="modal">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Start for free — 10 generations/month
            </button>
          </SignInButton>
          <a href="#demo" className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors px-4 py-3">
            See an example ↓
          </a>
        </div>
      </section>

      {/* Sample output */}
      <section id="demo" className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 bg-white">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-slate-400 font-medium">Generated output — Luxury tone</span>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">SEO Title</p>
              <p className="text-lg font-bold text-slate-900">{SAMPLE.seoTitle}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-slate-700 leading-relaxed text-sm">{SAMPLE.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Benefits</p>
              <ul className="space-y-1.5">
                {SAMPLE.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">Sample output for "3D Printed Earrings" · Generated in 3.2s</p>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Everything you need to write better copy, faster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-200 px-5 py-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Three steps to ready-to-publish copy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Enter your product details", desc: "Product name, category, and key features. Takes 30 seconds." },
            { step: "2", title: "Choose your tone", desc: "Professional, Luxury, Casual, or Minimalist — whichever fits your brand." },
            { step: "3", title: "Copy and paste", desc: "Get an SEO title, description, and bullet points ready to drop into your store." },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-center text-slate-500 mb-12">Start free. Upgrade when you're ready.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div key={p.name} className={`rounded-2xl border px-6 py-8 ${p.highlight ? "border-indigo-500 bg-indigo-600 text-white shadow-lg" : "border-slate-200 bg-white"}`}>
                <p className={`text-sm font-semibold mb-1 ${p.highlight ? "text-indigo-200" : "text-slate-500"}`}>{p.name}</p>
                <p className={`text-4xl font-extrabold mb-0.5 ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}</p>
                <p className={`text-sm mb-6 ${p.highlight ? "text-indigo-200" : "text-slate-400"}`}>{p.period}</p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? "text-indigo-100" : "text-slate-600"}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${p.highlight ? "text-indigo-300" : "text-indigo-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <SignInButton mode="modal">
                  <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${p.highlight ? "bg-white text-indigo-600 hover:bg-indigo-50" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}>
                    {p.cta}
                  </button>
                </SignInButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to write better product copy?</h2>
        <p className="text-slate-500 mb-8">Free to start. No credit card required.</p>
        <SignInButton mode="modal">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Get started for free
          </button>
        </SignInButton>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        Powered by Claude AI · Built with Next.js · © {new Date().getFullYear()} PDG AI
      </footer>

    </div>
  );
}
