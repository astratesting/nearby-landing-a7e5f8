'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password.');
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
            Trade with neighbors you can trust. Your block has more than you think.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-ivory flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="heading-serif text-2xl text-charcoal block mb-8 lg:hidden">NearBy</Link>
          <h1 className="heading-serif text-3xl text-charcoal mb-2">Welcome back.</h1>
          <p className="text-stone text-sm mb-8">Sign in to your NearBy account.</p>
          {error && (
            <div className="mb-4 px-4 py-3 border border-burgundy/30 bg-burgundy/5 text-burgundy text-sm rounded-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 bg-cream border border-mist rounded-sm text-charcoal text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold text-white text-sm font-medium rounded-sm transition-colors duration-150 hover:bg-gold/90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-stone">
            New here?{' '}
            <Link href="/signup" className="text-gold hover:text-gold/80 transition-colors">
              Create an account
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-stone/60">
            Demo: demo@demo.app / demo123
          </p>
        </div>
      </div>
    </div>
  );
}
