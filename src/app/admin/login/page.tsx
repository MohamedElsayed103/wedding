"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error — is the dev server running?");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2ede2", fontFamily: "system-ui, sans-serif" }}>
      <form
        onSubmit={submit}
        style={{ width: 320, background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 20px 50px -20px rgba(0,0,0,0.25)" }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#2a241c" }}>Studio Admin</h1>
        <p style={{ marginTop: 4, marginBottom: 20, fontSize: 13, color: "#6b6150" }}>
          Sign in to manage sites, templates and characters.
        </p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd4c2",
            fontSize: 14,
            marginBottom: 12,
          }}
        />
        {error && <p style={{ color: "#b5654a", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            background: "#c9a24b",
            color: "#241a10",
            fontWeight: 600,
            fontSize: 14,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
