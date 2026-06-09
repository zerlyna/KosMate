"use client";

import { HasilPrediksi, Kos } from "@/lib/api";

const navy = "#1B2A4A";
const blue = "#2D6BE4";
const gray = "#6B7280";

const KosCard = ({ kos, rank }: { kos: Kos; rank: number }) => (
  <div style={{
    backgroundColor: "white",
    border: rank === 1 ? `2px solid ${blue}` : "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "20px 24px",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{
          fontSize: "12px",
          fontWeight: 700,
          color: rank === 1 ? blue : "#9CA3AF",
          minWidth: "20px",
        }}>#{rank}</span>
        <div>
          <p style={{ fontWeight: 600, fontSize: "14px", color: navy, marginBottom: "4px" }}>{kos.nama_kos}</p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <p style={{ fontSize: "12px", color: gray }}>{kos.jarak} km dari PENS</p>
            <span style={{ color: "#E5E7EB" }}>·</span>
            <span style={{
              backgroundColor: "#F3F4F6",
              color: gray,
              fontSize: "11px",
              fontWeight: 500,
              padding: "1px 8px",
              borderRadius: "4px",
            }}>{kos.jenis}</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: 700, fontSize: "15px", color: navy }}>Rp {kos.harga.toLocaleString("id-ID")}</p>
        <p style={{ fontSize: "11px", color: "#9CA3AF" }}>/ bulan</p>
      </div>
    </div>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "12px", borderTop: "1px solid #F3F4F6" }}>
      {[
        { label: "WiFi", active: kos.wifi === "Ada" },
        { label: "AC", active: kos.ac === "Ada" },
        { label: "Dapur", active: kos.dapur === "Ada" },
        { label: "Listrik Include", active: kos.listrik === "Include" },
        { label: "KM Dalam", active: kos.kamar_mandi === "Dalam" },
      ].map((b) => (
        <span key={b.label} style={{
          backgroundColor: b.active ? "#EFF6FF" : "#F9FAFB",
          color: b.active ? "#1D4ED8" : "#9CA3AF",
          fontSize: "11px",
          fontWeight: 500,
          padding: "3px 10px",
          borderRadius: "5px",
          border: b.active ? "1px solid #BFDBFE" : "1px solid #F3F4F6",
        }}>{b.label}</span>
      ))}
    </div>
  </div>
);

export default function HasilRekomendasi({ hasil }: { hasil: HasilPrediksi }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "'Inter', sans-serif" }}>

      <div style={{
        backgroundColor: navy,
        borderRadius: "12px",
        padding: "24px 28px",
      }}>
        <p style={{ color: "#7EB3FF", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Estimasi Harga</p>
        <p style={{ color: "white", fontSize: "30px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "4px" }}>
          Rp {hasil.prediksi_harga.toLocaleString("id-ID")}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>per bulan</p>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <p style={{ fontWeight: 700, fontSize: "14px", color: navy }}>Rekomendasi Kos</p>
          <span style={{
            backgroundColor: "#F3F4F6",
            color: gray,
            fontSize: "12px",
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "5px",
          }}>{hasil.rekomendasi.length} kos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {hasil.rekomendasi.map((kos, i) => (
            <KosCard key={i} kos={kos} rank={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
