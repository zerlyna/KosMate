"use client";

import Link from "next/link";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

const navy = "#1B2A4A";
const blue = "#2D6BE4";
const gray = "#6B7280";

const metrik = [
  { label: "R² Score", value: "0.74", desc: "Akurasi model regresi" },
  { label: "MAPE", value: "16.88%", desc: "Rata-rata error prediksi" },
  { label: "RMSE", value: "245.231", desc: "Root mean squared error" },
  { label: "Silhouette Score", value: "0.554", desc: "Kualitas clustering" },
];

const sebaranHarga = [
  { range: "< 500rb", jumlah: 7 },
  { range: "500-800rb", jumlah: 48 },
  { range: "800rb-1jt", jumlah: 24 },
  { range: "1-1.5jt", jumlah: 43 },
  { range: "1.5-2jt", jumlah: 29 },
  { range: "> 2jt", jumlah: 9 },
];

const jenisKos = [
  { name: "Khusus Laki-laki", value: 80, color: "#1B2A4A" },
  { name: "Khusus Perempuan", value: 73, color: "#2D6BE4" },
  { name: "Campur", value: 7, color: "#93C5FD" },
];

const fasilitas = [
  { name: "WiFi", jumlah: 149 },
  { name: "Dapur", jumlah: 126 },
  { name: "AC", jumlah: 76 },
  { name: "Listrik Inc.", jumlah: 73 },
  { name: "KM Dalam", jumlah: 51 },
];

const aktualVsPrediksi = [
  { aktual: 500000, prediksi: 650000 },
  { aktual: 650000, prediksi: 620000 },
  { aktual: 700000, prediksi: 730000 },
  { aktual: 750000, prediksi: 760000 },
  { aktual: 800000, prediksi: 780000 },
  { aktual: 900000, prediksi: 870000 },
  { aktual: 1100000, prediksi: 1050000 },
  { aktual: 1200000, prediksi: 1180000 },
  { aktual: 1250000, prediksi: 1300000 },
  { aktual: 1300000, prediksi: 1280000 },
  { aktual: 1400000, prediksi: 1350000 },
  { aktual: 1500000, prediksi: 1480000 },
  { aktual: 1550000, prediksi: 1520000 },
  { aktual: 1600000, prediksi: 1650000 },
  { aktual: 1650000, prediksi: 1600000 },
  { aktual: 1700000, prediksi: 1720000 },
  { aktual: 1750000, prediksi: 1800000 },
  { aktual: 1800000, prediksi: 1750000 },
  { aktual: 1900000, prediksi: 1850000 },
  { aktual: 2000000, prediksi: 1950000 },
  { aktual: 2300000, prediksi: 2100000 },
  { aktual: 2500000, prediksi: 2200000 },
  { aktual: 2600000, prediksi: 2300000 },
  { aktual: 2750000, prediksi: 2400000 },
];

const formatRupiah = (val: number) => `Rp ${(val / 1000000).toFixed(1)}jt`;

export default function DashboardPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F5F6FA", fontFamily: "'Inter', sans-serif" }}>

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
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ backgroundColor: navy, width: "34px", height: "34px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: navy }}>KosMate</span>
        </Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link href="/cari" style={{ fontSize: "14px", color: gray, textDecoration: "none" }}>Cari Kos</Link>
          <Link href="/dashboard" style={{ fontSize: "14px", color: navy, fontWeight: 600, textDecoration: "none" }}>Dashboard</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ backgroundColor: navy }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 60px" }}>
          <p style={{ color: "#7EB3FF", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>Analisis Data</p>
          <h1 style={{ color: "white", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "8px" }}>Dashboard KosMate</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>Visualisasi data dan performa model machine learning</p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 60px" }}>

        {/* Metrik Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {metrik.map((m) => (
            <div key={m.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px 24px" }}>
              <p style={{ fontSize: "12px", color: gray, marginBottom: "8px", fontWeight: 500 }}>{m.label}</p>
              <p style={{ fontSize: "28px", fontWeight: 800, color: navy, marginBottom: "4px", letterSpacing: "-0.5px" }}>{m.value}</p>
              <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Aktual vs Prediksi */}
        <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
          <p style={{ fontWeight: 700, fontSize: "15px", color: navy, marginBottom: "4px" }}>Aktual vs Prediksi Harga</p>
          <p style={{ fontSize: "13px", color: gray, marginBottom: "24px" }}>Perbandingan harga aktual dengan hasil prediksi model Random Forest</p>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="aktual" name="Aktual" tickFormatter={formatRupiah} tick={{ fontSize: 11, fill: gray }} />
              <YAxis dataKey="prediksi" name="Prediksi" tickFormatter={formatRupiah} tick={{ fontSize: 11, fill: gray }} />
              <Tooltip formatter={(val: number) => `Rp ${val.toLocaleString("id-ID")}`} labelFormatter={() => ""} />
              <Scatter data={aktualVsPrediksi} fill={blue} opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Sebaran Harga & Fasilitas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>

          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "28px" }}>
            <p style={{ fontWeight: 700, fontSize: "15px", color: navy, marginBottom: "4px" }}>Sebaran Harga Kos</p>
            <p style={{ fontSize: "13px", color: gray, marginBottom: "24px" }}>Distribusi harga per bulan</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sebaranHarga} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: gray }} />
                <YAxis tick={{ fontSize: 11, fill: gray }} />
                <Tooltip />
                <Bar dataKey="jumlah" fill={blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "28px" }}>
            <p style={{ fontWeight: 700, fontSize: "15px", color: navy, marginBottom: "4px" }}>Ketersediaan Fasilitas</p>
            <p style={{ fontSize: "13px", color: gray, marginBottom: "24px" }}>Jumlah kos dengan fasilitas tertentu (dari 160 data)</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={fasilitas} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" tick={{ fontSize: 11, fill: gray }} domain={[0, 160]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: gray }} width={90} />
                <Tooltip />
                <Bar dataKey="jumlah" fill={navy} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Jenis Kos */}
        <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "28px" }}>
          <p style={{ fontWeight: 700, fontSize: "15px", color: navy, marginBottom: "4px" }}>Distribusi Jenis Kos</p>
          <p style={{ fontSize: "13px", color: gray, marginBottom: "24px" }}>Proporsi jenis kos dalam 160 data</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={jenisKos}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                dataKey="value"
                paddingAngle={3}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={true}
              >
                {jenisKos.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend formatter={(val) => <span style={{ fontSize: "13px", color: gray }}>{val}</span>} />
              <Tooltip formatter={(val: number) => `${val} kos`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </main>
  );
}