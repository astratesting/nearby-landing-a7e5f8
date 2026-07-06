import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFF8F0", padding: "24px", fontFamily: "system-ui, sans-serif" }}>
      <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "16px" }}>
        404
      </span>
      <h1 style={{ fontSize: "30px", fontWeight: 700, color: "#1F2937", marginBottom: "12px" }}>
        Page Not Found
      </h1>
      <p style={{ color: "#6B7280", marginBottom: "32px", textAlign: "center", maxWidth: "400px" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        style={{ padding: "12px 24px", borderRadius: "12px", background: "#7C3AED", color: "#FFFFFF", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
      >
        Go Home
      </Link>
    </div>
  );
}