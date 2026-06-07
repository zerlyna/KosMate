"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const kos = [
  { name: "Kos Wisper 312", jarak: "0.3 km", harga: "Rp 1.300.000", fasilitas: "AC · WiFi · Dapur" },
  { name: "Kos Kamboja Ungu", jarak: "0.4 km", harga: "Rp 1.650.000", fasilitas: "AC · WiFi · Dapur" },
  { name: "Kos Rabel", jarak: "0.5 km", harga: "Rp 1.250.000", fasilitas: "AC · WiFi · Dapur" },
  { name: "Kost DHR Tipe A", jarak: "0.6 km", harga: "Rp 2.750.000", fasilitas: "AC · WiFi · Dapur" },
  { name: "Kost Griya Siswa", jarak: "2.5 km", harga: "Rp 1.900.000", fasilitas: "AC · WiFi · Dapur" },
  { name: "Kost Ayem Tipe 2", jarak: "0.3 km", harga: "Rp 2.600.000", fasilitas: "AC · WiFi · Dapur" },
];

export default function LandingPage() {
  const navy = "#1B2A4A";
  const blue = "#2D6BE4";
  const gray = "#6B7280";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % kos.length;
      const itemHeight = el.scrollHeight / kos.length;
      el.scrollTo({ top: i * itemHeight, behavior: "smooth" });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "white", fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            backgroundColor: navy,
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: navy, letterSpacing: "-0.3px" }}>KosMate</span>
        </div>
        <Link href="/cari" style={{
          backgroundColor: blue,
          color: "white",
          padding: "8px 22px",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "14px",
          textDecoration: "none",
        }}>Cari Kos</Link>
      </nav>

      {/* Hero */}
      <div style={{ backgroundColor: navy }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 60px 80px",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: "60px",
          alignItems: "center",
        }}>
          <div>
            <p style={{
              color: "#7EB3FF",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>Khusus Mahasiswa PENS</p>
            <h1 style={{
              color: "white",
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}>
              Kos yang Tepat,<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px #7EB3FF" }}>Harga yang Pas.</span>
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "16px",
              lineHeight: 1.9,
              marginBottom: "40px",
              maxWidth: "400px",
            }}>
              Temukan rekomendasi kos terbaik di sekitar PENS berdasarkan preferensi dan budget kamu.
            </p>
            <Link href="/cari" style={{
              backgroundColor: blue,
              color: "white",
              padding: "15px 36px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "-0.2px",
            }}>Cari Kos Sekarang</Link>

            <div style={{ display: "flex", gap: "40px", marginTop: "48px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { angka: "160+", label: "Data Kos" },
                { angka: "< 3km", label: "Dari PENS" },
                { angka: "Gratis", label: "Tanpa Biaya" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ color: "white", fontSize: "22px", fontWeight: 800, marginBottom: "2px" }}>{s.angka}</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-scroll kos list */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Rekomendasi Untukmu</p>
            </div>
            <div
              ref={scrollRef}
              style={{
                height: "240px",
                overflowY: "hidden",
              }}
            >
              {kos.map((k, i) => (
                <div key={i} style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: i === 0 ? "rgba(45,107,228,0.15)" : "transparent",
                }}>
                  <div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{k.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{k.jarak} · {k.fasilitas}</p>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "13px", whiteSpace: "nowrap" }}>{k.harga}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cara Kerja */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 60px" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ color: blue, fontSize: "13px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Cara Kerja</p>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: navy, letterSpacing: "-1px", maxWidth: "400px", lineHeight: 1.2 }}>
            Tiga langkah, kos ditemukan.
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            right: "20px",
            height: "1px",
            backgroundColor: "#E5E7EB",
            zIndex: 0,
          }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", position: "relative", zIndex: 1 }}>
            {[
              { step: "1", title: "Isi Preferensi", desc: "Pilih jarak, fasilitas, dan tipe kos yang sesuai dengan kebutuhanmu." },
              { step: "2", title: "Prediksi Harga", desc: "Dapatkan kisaran harga kos berdasarkan preferensi yang kamu pilih." },
              { step: "3", title: "Lihat Rekomendasi", desc: "Lihat rekomendasi kos yang paling cocok dan relevan untukmu." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? navy : "white",
                  border: `2px solid ${i === 0 ? navy : "#E5E7EB"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: i === 0 ? "white" : gray,
                  marginBottom: "28px",
                }}>{item.step}</div>
                <p style={{ fontWeight: 700, fontSize: "17px", color: navy, marginBottom: "10px" }}>{item.title}</p>
                <p style={{ fontSize: "14px", color: gray, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: navy, padding: "80px 60px", textAlign: "center" }}>
        <p style={{ color: "#7EB3FF", fontSize: "13px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Mulai Sekarang</p>
        <h2 style={{ color: "white", fontSize: "36px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-1px" }}>
          Sudah tahu kos yang kamu mau?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", marginBottom: "36px" }}>
          Temukan rekomendasi kos yang sesuai dengan kebutuhanmu!
        </p>
        <Link href="/cari" style={{
          backgroundColor: blue,
          color: "white",
          padding: "15px 40px",
          borderRadius: "10px",
          fontWeight: 700,
          fontSize: "15px",
          textDecoration: "none",
          display: "inline-block",
        }}>Cari Kos</Link>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #E5E7EB",
        padding: "24px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ backgroundColor: navy, width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: navy }}>KosMate</span>
        </div>
        <p style={{ fontSize: "13px", color: gray }}>© 2026 KosMate · Your Kos Buddy</p>
      </div>

    </main>
  );
}