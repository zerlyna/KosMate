"use client";

import { useState } from "react";
import { InputUser } from "@/lib/api";

const navy = "#1B2A4A";
const blue = "#2D6BE4";
const gray = "#6B7280";

interface Props {
  onSubmit: (input: InputUser) => void;
  loading: boolean;
}

const ToggleField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) => (
  <div>
    <p style={{ fontSize: "12px", fontWeight: 600, color: gray, marginBottom: "8px" }}>{label}</p>
    <div style={{ display: "flex", gap: "6px" }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: "9px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            border: value === opt.value ? `1.5px solid ${navy}` : "1.5px solid #E5E7EB",
            backgroundColor: value === opt.value ? navy : "white",
            color: value === opt.value ? "white" : "#374151",
            transition: "all 0.15s",
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
    jarak: 0,
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
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ padding: "24px 28px", borderBottom: "1px solid #F3F4F6" }}>
        <p style={{ fontWeight: 700, fontSize: "16px", color: navy }}>Preferensi Kos</p>
        <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "2px" }}>Sesuaikan dengan kebutuhan kamu</p>
      </div>

      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: gray, marginBottom: "8px" }}>Jarak dari PENS (km)</p>
          <input
            type="text"
            placeholder="Contoh: 1.5"
            value={form.jarak === 0 ? "" : form.jarak}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, jarak: val === "" ? 0 : parseFloat(val) });
            }}
            style={{
              width: "100%",
              padding: "9px 14px",
              borderRadius: "8px",
              border: "1.5px solid #E5E7EB",
              fontSize: "14px",
              color: navy,
              outline: "none",
              backgroundColor: "white",
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        <ToggleField label="Jenis Kos" value={form.jenis} onChange={(v) => setForm({ ...form, jenis: v })}
          options={[{ label: "Campur", value: "Campur" }, { label: "Laki-laki", value: "Khusus Laki Laki" }, { label: "Perempuan", value: "Khusus Perempuan" }]} />

        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: gray, marginBottom: "12px" }}>Fasilitas</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "WiFi", key: "wifi" as keyof InputUser },
              { label: "AC", key: "ac" as keyof InputUser },
              { label: "Dapur", key: "dapur" as keyof InputUser },
              { label: "Kamar Mandi", key: "kamar_mandi" as keyof InputUser, opts: [{ label: "Dalam", value: "Dalam" }, { label: "Luar", value: "Luar" }] },
            ].map((f) => {
              const opts = f.opts || [{ label: "Ada", value: "Ada" }, { label: "Tidak", value: "Tidak" }];
              return (
                <div key={f.key}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", marginBottom: "6px" }}>{f.label}</p>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {opts.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, [f.key]: opt.value })}
                        style={{
                          flex: 1,
                          padding: "7px",
                          borderRadius: "7px",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          border: form[f.key] === opt.value ? `1.5px solid ${navy}` : "1.5px solid #E5E7EB",
                          backgroundColor: form[f.key] === opt.value ? navy : "white",
                          color: form[f.key] === opt.value ? "white" : "#374151",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ToggleField label="Listrik" value={form.listrik} onChange={(v) => setForm({ ...form, listrik: v })}
          options={[{ label: "Include", value: "Include" }, { label: "Exclude", value: "Exclude" }]} />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#9CA3AF" : blue,
            color: "white",
            border: "none",
            padding: "13px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.2px",
          }}
        >
          {loading ? "Mencari..." : "Cari Rekomendasi"}
        </button>
      </div>
    </form>
  );
}