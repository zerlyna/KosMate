"use client";

import { useState } from "react";
import Link from "next/link";
import InputForm from "../components/InputForm";
import HasilRekomendasi from "../components/HasilRekomendasi";
import { InputUser, HasilPrediksi, getRekomendasi } from "@/lib/api";

const navy = "#1B2A4A";
const blue = "#2D6BE4";
const gray = "#6B7280";

export default function CariPage() {
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<HasilPrediksi | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: InputUser) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRekomendasi(input);
      setHasil(data);
    } catch {
      setError("Gagal mengambil rekomendasi. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F5F6FA", fontFamily: "'Inter', sans-serif" }}>

      <nav style={{
        backgroundColor: "white",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 60px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ backgroundColor: navy, width: "34px", height: "34px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: navy, letterSpacing: "-0.3px" }}>KosMate</span>
        </Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ fontSize: "14px", color: gray, textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
          <span style={{ fontSize: "14px", color: navy, fontWeight: 600 }}>Cari Kos</span>
        </div>
      </nav>

      <div style={{ backgroundColor: navy }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 60px" }}>
          <p style={{ color: "#7EB3FF", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Rekomendasi Personal</p>
          <h1 style={{ color: "white", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "8px" }}>Temukan Kos yang Sesuai</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>Isi preferensi kamu di bawah ini</p>
        </div>
      </div>

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 60px",
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        gap: "32px",
        alignItems: "start",
      }}>
        <InputForm onSubmit={handleSubmit} loading={loading} />

        <div>
          {error && (
            <div style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              padding: "14px 18px",
              borderRadius: "12px",
              fontSize: "14px",
              marginBottom: "16px",
            }}>{error}</div>
          )}

          {!hasil && !loading && !error && (
            <div style={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "16px",
              padding: "80px 24px",
              textAlign: "center",
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#F5F6FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p style={{ fontWeight: 700, fontSize: "15px", color: navy, marginBottom: "6px" }}>Belum ada hasil</p>
              <p style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: 1.6 }}>Isi preferensi di sebelah kiri<br />dan klik cari rekomendasi</p>
            </div>
          )}

          {loading && (
            <div style={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "16px",
              padding: "80px 24px",
              textAlign: "center",
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                border: `3px solid #E5E7EB`,
                borderTop: `3px solid ${blue}`,
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ fontSize: "14px", color: "#9CA3AF" }}>Mencari rekomendasi...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {hasil && !loading && <HasilRekomendasi hasil={hasil} />}
        </div>
      </div>
    </main>
  );
}