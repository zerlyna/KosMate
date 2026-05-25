"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import HasilRekomendasi from "./components/HasilRekomendasi";
import { InputUser, HasilPrediksi, getRekomendasi } from "@/lib/api";

export default function Home() {
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
    <main style={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ backgroundColor: "#0F172A", padding: "48px 40px", textAlign: "center" }}>
        <span style={{
          backgroundColor: "rgba(245,158,11,0.15)",
          color: "#F59E0B",
          border: "1px solid rgba(245,158,11,0.3)",
          fontSize: "12px",
          fontWeight: 600,
          padding: "4px 14px",
          borderRadius: "20px",
          display: "inline-block",
          marginBottom: "16px",
        }}>✨ Powered by Machine Learning</span>
        <h1 style={{ color: "white", fontSize: "36px", fontWeight: 800, lineHeight: 1.2, marginBottom: "12px" }}>
          Temukan Kos Terbaik<br />
          <span style={{ color: "#F59E0B" }}>di Sekitar PENS</span>
        </h1>
        <p style={{ color: "#475569", fontSize: "14px", maxWidth: "460px", margin: "0 auto" }}>
          Masukkan preferensi kamu, KosMate akan memprediksi harga dan merekomendasikan kos yang paling sesuai.
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
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
            }}>{error}</div>
          )}

          {!hasil && !loading && !error && (
            <div style={{
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "60px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <p style={{ fontWeight: 600, fontSize: "15px", color: "#0F172A", marginBottom: "6px" }}>Belum ada hasil</p>
              <p style={{ fontSize: "13px", color: "#94A3B8" }}>Isi preferensi di sebelah kiri dan klik cari rekomendasi</p>
            </div>
          )}

          {hasil && !loading && <HasilRekomendasi hasil={hasil} />}
        </div>
      </div>
    </main>
  );
}