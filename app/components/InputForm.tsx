"use client";

import { useState } from "react";
import { InputUser } from "@/lib/api";

interface Props {
  onSubmit: (input: InputUser) => void;
  loading: boolean;
}

const Field = ({
  label,
  emoji,
  value,
  onChange,
  options,
}: {
  label: string;
  emoji: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label style={{ fontSize: "13px", fontWeight: 500, color: "#64748B", display: "flex", alignItems: "center", gap: "6px" }}>
      <span>{emoji}</span>{label}
    </label>
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
            border: value === opt.value ? "2px solid #0F172A" : "2px solid #E2E8F0",
            backgroundColor: value === opt.value ? "#0F172A" : "white",
            color: value === opt.value ? "white" : "#0F172A",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default function InputForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<InputUser>({
    jarak: 1,
    jenis: "Campur",
    wifi: "Ada",
    ac: "Ada",
    dapur: "Tidak",
    listrik: "Include",
    kamar_mandi: "Dalam",
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      style={{
        backgroundColor: "white",
        border: "1px solid #E2E8F0",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "16px", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ backgroundColor: "#0F172A", width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏠</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: "16px", color: "#0F172A" }}>Preferensi Kos</p>
          <p style={{ fontSize: "13px", color: "#94A3B8" }}>Isi sesuai kebutuhan kamu</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontSize: "13px", fontWeight: 500, color: "#64748B", display: "flex", alignItems: "center", gap: "6px" }}>
          📍 Jarak dari PENS (km)
        </label>
        <input
          type="number"
          min={0}
          step={0.1}
          value={form.jarak}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setForm({ ...form, jarak: isNaN(val) ? 0 : val });
          }}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "2px solid #E2E8F0",
            fontSize: "14px",
            color: "#0F172A",
            outline: "none",
            backgroundColor: "white",
          }}
        />
      </div>

      <Field label="Jenis Kos" emoji="🏘️" value={form.jenis} onChange={(v) => setForm({ ...form, jenis: v })}
        options={[{ label: "Campur", value: "Campur" }, { label: "Laki-laki", value: "Khusus Laki Laki" }, { label: "Perempuan", value: "Khusus Perempuan" }]} />
      <Field label="WiFi" emoji="📶" value={form.wifi} onChange={(v) => setForm({ ...form, wifi: v })}
        options={[{ label: "Ada", value: "Ada" }, { label: "Tidak", value: "Tidak" }]} />
      <Field label="AC" emoji="❄️" value={form.ac} onChange={(v) => setForm({ ...form, ac: v })}
        options={[{ label: "Ada", value: "Ada" }, { label: "Tidak", value: "Tidak" }]} />
      <Field label="Dapur" emoji="🍳" value={form.dapur} onChange={(v) => setForm({ ...form, dapur: v })}
        options={[{ label: "Ada", value: "Ada" }, { label: "Tidak", value: "Tidak" }]} />
      <Field label="Listrik" emoji="⚡" value={form.listrik} onChange={(v) => setForm({ ...form, listrik: v })}
        options={[{ label: "Include", value: "Include" }, { label: "Exclude", value: "Exclude" }]} />
      <Field label="Kamar Mandi" emoji="🚿" value={form.kamar_mandi} onChange={(v) => setForm({ ...form, kamar_mandi: v })}
        options={[{ label: "Dalam", value: "Dalam" }, { label: "Luar", value: "Luar" }]} />

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? "#94A3B8" : "#0F172A",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: "14px",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        {loading ? "⏳ Mencari Rekomendasi..." : "🔍 Cari Rekomendasi Kos"}
      </button>
    </form>
  );
}