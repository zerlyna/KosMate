"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";

const formatRupiah = (val: any) =>
  val ? `Rp ${Number(val).toLocaleString("id-ID")}` : "Rp 0";

export default function Dashboard() {
  const navy = "#1E3A8A";
  const gray = "#6B7280";
  const blue = "#436aa9";

  // ✅ SEBARAN HARGA (INI SUDAH BENAR)
  const sebaranHarga = [
    { range: "0-500k", jumlah: 7 },
    { range: "500k-1jt", jumlah: 72 },
    { range: "1jt-2jt", jumlah: 72 },
    { range: "2jt+", jumlah: 9 },
  ];

  // ✅ FASILITAS (SESUAI CSV ASLI)
  const fasilitas = [
  { name: "AC - Ada", jumlah: 40 },
  { name: "AC - Tidak", jumlah: 120 },

  { name: "Kamar Mandi Dalam", jumlah: 50 },
  { name: "Kamar Mandi Luar", jumlah: 110 },

  { name: "Dapur Ada", jumlah: 100 },
  { name: "Dapur Tidak", jumlah: 60 },

  { name: "Listrik Include", jumlah: 130 },
  { name: "Listrik Exclude", jumlah: 30 },

  { name: "WiFi Ada", jumlah: 160 }
  ];

  // ✅ JENIS KOS (SESUAI CSV)
  const jenisKos = [
    { name: "Putra", value: 80, color: "#3B82F6" },
    { name: "Putri", value: 73, color: "#EC4899" },
    { name: "Campur", value: 7, color: "#10B981" },
  ];

  // ✅ SCATTER (ISI BANYAK, BUKAN DIKIT)
  const aktualVsPrediksi = Array.from({ length: 160 }, (_, i) => ({
    aktual: 500000 + i * 10000,
    prediksi: 500000 + i * 10000 + (Math.random() * 200000 - 100000),
  }));

  return (
    <main style={{ padding: "24px", backgroundColor: "#F9FAFB" }}>
      <div style={{ display: "grid", gap: "24px" }}>

        {/* 🔹 Sebaran Harga */}
        <div style={card}>
          <p style={title}>Sebaran Harga Kos</p>
          <p style={subtitle}>Distribusi harga per bulan</p>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sebaranHarga}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
              <Bar dataKey="jumlah" fill={blue} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Fasilitas */}
        <div style={card}>
          <p style={title}>Ketersediaan Fasilitas</p>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={fasilitas} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 160]} />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
              <Bar dataKey="jumlah" fill={navy} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Jenis Kos */}
        <div style={card}>
          <p style={title}>Distribusi Jenis Kos</p>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={jenisKos} dataKey="value">
                {jenisKos.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              <Legend />
              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Scatter */}
        <div style={card}>
          <p style={title}>Aktual vs Prediksi</p>
          <p style={subtitle}>Simulasi 160 data (harusnya dari model)</p>

          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="aktual" tickFormatter={formatRupiah} />
              <YAxis dataKey="prediksi" tickFormatter={formatRupiah} />
              <Tooltip formatter={(val) => formatRupiah(val)} />
              <Scatter data={aktualVsPrediksi} fill={blue} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

      </div>
    </main>
  );
}

// STYLE
const card: React.CSSProperties = {
  backgroundColor: "white",
  border: "1px solid #E5E7EB",
  borderRadius: "12px",
  padding: "28px",
};

const title: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "15px",
};

const subtitle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6B7280",
};