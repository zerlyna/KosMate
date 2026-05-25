"use client";

import { HasilPrediksi, Kos } from "@/lib/api";

const KosCard = ({ kos, rank }: { kos: Kos; rank: number }) => (
  <div style={{
    backgroundColor: "white",
    border: rank === 1 ? "2px solid #F59E0B" : "1px solid #E2E8F0",
    borderRadius: "14px",
    padding: "18px 20px",
    position: "relative",
    transition: "box-shadow 0.2s",
  }}>
    {rank === 1 && (
      <div style={{
        position: "absolute",
        top: "-12px",
        left: "20px",
        backgroundColor: "#F59E0B",
        color: "#0F172A",
        fontSize: "11px",
        fontWeight: 700,
        padding: "2px 12px",
        borderRadius: "20px",
      }}>⭐ Terbaik</div>
    )}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: rank === 1 ? "#F59E0B" : "#F1F5F9",
          color: rank === 1 ? "#0F172A" : "#64748B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "14px",
        }}>{rank}</div>
        <div>
          <p style={{ fontWeight: 600, fontSize: "14px", color: "#0F172A" }}>{kos.nama_kos}</p>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>📍 {kos.jarak} km dari PENS</p>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: 700, fontSize: "15px", color: "#0F172A" }}>Rp {kos.harga.toLocaleString("id-ID")}</p>
        <p style={{ fontSize: "11px", color: "#94A3B8" }}>per bulan</p>
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {[
        { label: "WiFi", active: kos.wifi === "Ada", emoji: "📶" },
        { label: "AC", active: kos.ac === "Ada", emoji: "❄️" },
        { label: "Dapur", active: kos.dapur === "Ada", emoji: "🍳" },
        { label: "Listrik Inc.", active: kos.listrik === "Include", emoji: "⚡" },
        { label: "KM Dalam", active: kos.kamar_mandi === "Dalam", emoji: "🚿" },
      ].map((b) => (
        <span key={b.label} style={{
          backgroundColor: b.active ? "#EFF6FF" : "#F8FAFC",
          color: b.active ? "#1E40AF" : "#94A3B8",
          fontSize: "11px",
          fontWeight: 500,
          padding: "3px 10px",
          borderRadius: "20px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}>{b.emoji} {b.label}</span>
      ))}
    </div>
  </div>
);

export default function HasilRekomendasi({ hasil }: { hasil: HasilPrediksi }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{
        backgroundColor: "#0F172A",
        borderRadius: "20px",
        padding: "24px 28px",
        color: "white",
      }}>
        <p style={{ color: "#F59E0B", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>📈 Estimasi Harga Kos</p>
        <p style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px" }}>
          Rp {hasil.prediksi_harga.toLocaleString("id-ID")}
        </p>
        <p style={{ color: "#475569", fontSize: "12px", marginTop: "4px" }}>per bulan · Cluster {hasil.cluster}</p>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <p style={{ fontWeight: 700, fontSize: "15px", color: "#0F172A" }}>🏠 Rekomendasi Kos</p>
          <span style={{
            backgroundColor: "#F1F5F9",
            color: "#64748B",
            fontSize: "12px",
            fontWeight: 500,
            padding: "3px 12px",
            borderRadius: "20px",
          }}>{hasil.rekomendasi.length} kos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {hasil.rekomendasi.map((kos, i) => (
            <KosCard key={i} kos={kos} rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}