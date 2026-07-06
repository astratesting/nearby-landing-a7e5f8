'use client';

import { useState, FormEvent } from 'react';

export default function LandingWaitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        const existing = JSON.parse(localStorage.getItem('nearby_waitlist') || '[]');
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem('nearby_waitlist', JSON.stringify(existing));
        }
        setStatus('success');
        setEmail('');
        return;
      }

      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json();
        if (data.code === '23505') {
          setStatus('success');
          setEmail('');
        } else {
          setErrorMsg(data.message || 'Something went wrong. Please try again.');
          setStatus('error');
        }
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section id="waitlist" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/3 blur-[100px]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-violet mb-4 block"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Get Early Access
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold text-product-charcoal text-balance mb-4"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Be First in Your Neighborhood
        </h2>
        <p
          className="text-sm leading-relaxed text-product-charcoal/50 mb-10 max-w-md mx-auto"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Join the waitlist and we&apos;ll notify you the moment NearBy launches in
          your area. Early members get priority access and help shape the platform.
        </p>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl bg-warm-white border border-stone-100">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet/10 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-product-charcoal mb-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              You&apos;re on the list
            </h3>
            <p
              className="text-sm text-product-charcoal/50"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              We&apos;ll notify you as soon as NearBy is ready. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-warm-white border border-stone-200 text-product-charcoal text-sm placeholder:text-product-charcoal/25 focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 transition-all"
              disabled={status === 'submitting'}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-7 py-3.5 rounded-full bg-violet text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-violet/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {status === 'submitting' ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join the Waitlist'
              )}
            </button>
          </form>
        )}

        {status === 'error' && errorMsg && (
          <p
            className="mt-4 text-sm text-coral"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {errorMsg}
          </p>
        )}

        <p
          className="mt-6 text-[11px] text-product-charcoal/30"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          No spam — just a single email when we launch in your neighborhood.
        </p>
      </div>
    </section>
  );
}