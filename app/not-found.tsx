import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] text-[#F9FAFB] px-6">
      <span
        className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#EC4899] mb-6"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        404
      </span>
      <h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Page Not Found
      </h1>
      <p className="text-[#9CA3AF] mb-8 text-center max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        This page doesn't exist. Maybe it moved, or maybe it was never here.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00C8A0] to-[#EC4899] text-[#030712] text-sm font-semibold hover:shadow-lg hover:shadow-[#00C8A0]/20 transition-all"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Go Home
      </Link>
    </div>
  );
}