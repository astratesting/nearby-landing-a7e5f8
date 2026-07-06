"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

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
  const returnTo = searchParams.get("return") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(returnTo);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex bg-warm-white">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-violet/5 to-coral/5">
        <div className="relative z-10 max-w-sm text-center">
          <Link href="/" className="font-manrope text-4xl font-bold text-product-charcoal block mb-6">
            Near<span className="text-violet">By</span>
          </Link>
          <p className="text-product-charcoal/50 text-sm leading-relaxed font-source-sans">
            Trade with neighbors you can trust. Your block has more than you think.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-manrope text-2xl font-bold text-product-charcoal block mb-8 lg:hidden">
            Near<span className="text-violet">By</span>
          </Link>
          <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-2">Welcome back</h1>
          <p className="text-product-charcoal/50 font-source-sans text-sm mb-8">Sign in to your NearBy account.</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-coral/10 border border-coral/20 text-coral text-sm rounded-xl font-source-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all placeholder:text-product-charcoal/25"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all placeholder:text-product-charcoal/25"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet text-white text-sm font-semibold font-manrope rounded-xl transition-colors hover:bg-violet/90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-product-charcoal/50 font-source-sans">
            New here?{" "}
            <Link href="/signup" className="text-violet font-medium hover:text-violet/80 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}