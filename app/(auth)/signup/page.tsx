"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, neighborhood }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but sign-in failed. Please try logging in.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex bg-warm-white">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-honey/5 to-violet/5">
        <div className="relative z-10 max-w-sm text-center">
          <Link href="/" className="font-manrope text-4xl font-bold text-product-charcoal block mb-6">
            Near<span className="text-violet">By</span>
          </Link>
          <p className="text-product-charcoal/50 text-sm leading-relaxed font-source-sans">
            Join your neighborhood marketplace. Verified, local, safe.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-manrope text-2xl font-bold text-product-charcoal block mb-8 lg:hidden">
            Near<span className="text-violet">By</span>
          </Link>
          <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-2">Create your account</h1>
          <p className="text-product-charcoal/50 font-source-sans text-sm mb-8">Join the neighborhood marketplace.</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-coral/10 border border-coral/20 text-coral text-sm rounded-xl font-source-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all placeholder:text-product-charcoal/25"
                placeholder="Jordan Rivera"
              />
            </div>
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
                placeholder="Min. 6 characters"
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Neighborhood (optional)</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all placeholder:text-product-charcoal/25"
                placeholder="e.g. Bushwick, Williamsburg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet text-white text-sm font-semibold font-manrope rounded-xl transition-colors hover:bg-violet/90 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-product-charcoal/50 font-source-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-violet font-medium hover:text-violet/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}