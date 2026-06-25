'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('return') || '/dashboard';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        neighborhood: formData.get('neighborhood'),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Something went wrong.');
      setLoading(false);
      return;
    }

    const signInRes = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    setLoading(false);
    if (signInRes?.error) {
      setError('Account created but sign-in failed. Please try logging in.');
    } else {
      router.push(returnTo);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal items-center justify-center p-12">
        <div className="max-w-sm text-center">
          <Link href="/" className="heading-serif text-4xl text-ivory block mb-6">NearBy</Link>
          <p className="text-ivory/60 text-sm leading-relaxed">
            Join your neighbors. List what you have. Find what you need. All within walking distance.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-ivory flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="heading-serif text-2xl text-charcoal block mb-8 lg:hidden">NearBy</Link>
          <h1 className="heading-serif text-3xl text-charcoal mb-2">Join NearBy.</h1>
          <p className="text-stone text-sm mb-8">Create your account and start trading with your neighbors.</p>
          {error && (
            <div className="mb-4 px-4 py-3 border border-burgundy/30 bg-burgundy/5 text-burgundy text-sm rounded-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-1.5">Full name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-cream border border-mist rounded-sm text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-cream border border-mist rounded-sm text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-cream border border-mist rounded-sm text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-1.5">Neighborhood</label>
              <input
                name="neighborhood"
                type="text"
                required
                className="w-full px-4 py-3 bg-cream border border-mist rounded-sm text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
                placeholder="e.g. Bushwick, Park Slope"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold text-white text-sm font-medium rounded-sm transition-colors duration-150 hover:bg-gold/90 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="mt-4 text-xs text-stone/50 text-center">
            Skip the email step — we never sell your address.
          </p>
          <p className="mt-6 text-center text-sm text-stone">
            Already a member?{' '}
            <Link href="/login" className="text-gold hover:text-gold/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
