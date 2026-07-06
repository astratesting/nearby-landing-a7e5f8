"use client";

import { useState, FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      // If Supabase is not configured, use local storage fallback for demo
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
        // Store in localStorage as fallback
        const existing = JSON.parse(localStorage.getItem("nearby_waitlist") || "[]");
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem("nearby_waitlist", JSON.stringify(existing));
        }
        setStatus("success");
        setEmail("");
        return;
      }

      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        if (data.code === "23505") {
          setStatus("success");
          setEmail("");
        } else {
          setErrorMsg(data.message || "Something went wrong. Please try again.");
          setStatus("error");
        }
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="py-24 px-6 bg-charcoal text-ivory relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5F0E8' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Section header */}
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4 block">
          Join the Waitlist
        </span>
        <h2 className="heading-serif text-section-title text-ivory text-balance mb-4">
          Be First in Your Neighborhood
        </h2>
        <p className="text-sm leading-relaxed text-ivory/60 mb-10 max-w-md mx-auto font-light">
          Sign up to get notified the moment NearBy launches in your area. Early
          members get priority access and help shape the platform.
        </p>

        {/* Form */}
        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-charcoalLight border border-gold/20">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A572" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="heading-serif text-xl text-ivory mb-2">
              You're on the list
            </h3>
            <p className="text-sm text-ivory/50 font-light">
              We'll notify you as soon as NearBy is ready. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-3.5 rounded-full bg-charcoalLight border border-ivory/10 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                disabled={status === "submitting"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-7 py-3.5 rounded-full gold-gradient text-charcoal text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "submitting" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join the Waitlist"
              )}
            </button>
          </form>
        )}

        {/* Error message */}
        {status === "error" && errorMsg && (
          <p className="mt-4 text-sm text-burgundy font-light">{errorMsg}</p>
        )}

        {/* Privacy note */}
        <p className="mt-6 text-[11px] text-ivory/30 font-light">
          We respect your inbox. No spam — just a single email when we launch.
        </p>
      </div>
    </section>
  );
}
