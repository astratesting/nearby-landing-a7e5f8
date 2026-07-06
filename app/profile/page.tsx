"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function OwnProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?return=/profile");
      return;
    }
    if (session?.user?.id) {
      fetch("/api/users/me")
        .then((r) => r.json())
        .then((data) => {
          setName(data.name || "");
          setNeighborhood(data.neighborhood || "");
          setBio(data.bio || "");
        });
    }
  }, [session, status, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/users/${session!.user!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, neighborhood, bio }),
    });

    setSaving(false);
    if (res.ok) {
      setMessage("Profile updated!");
    } else {
      setMessage("Failed to update profile.");
    }
  }

  if (status === "loading") {
    return <div className="min-h-screen bg-warm-white flex items-center justify-center"><p className="text-product-charcoal/40 font-source-sans">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link href={`/profile/${session?.user?.id}`} className="inline-flex items-center gap-1 text-sm text-product-charcoal/40 hover:text-violet transition-colors mb-6 font-source-sans">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 12L6 8l4-4"/></svg>
          View public profile
        </Link>

        <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-8">Edit Profile</h1>

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-source-sans ${message.includes("updated") ? "bg-green-50 text-green-700 border border-green-200" : "bg-coral/10 text-coral border border-coral/20"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-product-charcoal/5 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Neighborhood</label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
              placeholder="e.g. Bushwick, Williamsburg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all resize-none"
              rows={3}
              placeholder="Tell your neighbors a bit about yourself..."
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}