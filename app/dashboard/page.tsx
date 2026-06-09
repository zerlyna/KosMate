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

// 🎯 Helper formatter aman
const formatRupiah = (val: any) =>
  val ? `Rp ${Number(val).toLocaleString("id-ID")}` : "Rp 0";

export default function Dashboard() {
  const navy = "#1E3A8A";
  const gray = "#6B7280";
  const blue = "#3B82F6";

  // Dummy data (contoh)
  const sebaranHarga = [
    { range: "0-500k", jumlah: 20 },
    { range: "500k-1jt", jumlah: 50 },
    { range: "1jt-2jt", jumlah: 60 },
    { range: "2jt+", jumlah: 30 },
  ];

  const fasilitas = [
    { name: "WiFi", jumlah: 120 },
    { name: "AC", jumlah: 90 },
    { name: "Kamar Mandi", jumlah: 140 },
    { name: "Parkir", jumlah: 100 },
  ];

  const jenisKos = [
    { name: "Putra", value: 60, color: "#3B82F6" },
    { name: "Putri", value: 70, color: "#EC4899" },
    { name: "Campur", value: 30, color: "#10B981" },
  ];

  const aktualVsPrediksi = [
    { aktual: 500000, prediksi: 550000 },
    { aktual: 1000000, prediksi: 1100000 },
    { aktual: 1500000, prediksi: 1400000 },
  ];

  return (
    <main style={{ padding: "24px", backgroundColor: "#F9FAFB" }}>
      <div style={{ display: "grid", gap: "24px" }}>
        
        {/* 🔹 Sebaran Harga */}
        <div style={cardStyle}>
          <p style={titleStyle}>Sebaran Harga Kos</p>
          <p style={subtitleStyle}>Distribusi harga per bulan</p>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sebaranHarga} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: gray }} />
              <YAxis tick={{ fontSize: 11, fill: gray }} />
              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
              <Bar dataKey="jumlah" fill={blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Fasilitas */}
        <div style={cardStyle}>
          <p style={titleStyle}>Ketersediaan Fasilitas</p>
          <p style={subtitleStyle}>
            Jumlah kos dengan fasilitas tertentu (dari 160 data)
          </p>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={fasilitas} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                type="number"
                domain={[0, 160]}
                tick={{ fontSize: 11, fill: gray }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={90}
                tick={{ fontSize: 11, fill: gray }}
              />
              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
              <Bar dataKey="jumlah" fill={navy} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Pie Chart */}
        <div style={cardStyle}>
          <p style={titleStyle}>Distribusi Jenis Kos</p>
          <p style={subtitleStyle}>Proporsi jenis kos dalam 160 data</p>

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
              >
                {jenisKos.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              <Legend
                formatter={(val) => (
                  <span style={{ fontSize: "13px", color: gray }}>
                    {val}
                  </span>
                )}
              />

              <Tooltip formatter={(val) => `${val ?? 0} kos`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Scatter Chart */}
        <div style={cardStyle}>
          <p style={titleStyle}>Aktual vs Prediksi</p>
          <p style={subtitleStyle}>Perbandingan harga</p>

          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis
                dataKey="aktual"
                name="Aktual"
                tickFormatter={formatRupiah}
              />
              <YAxis
                dataKey="prediksi"
                name="Prediksi"
                tickFormatter={formatRupiah}
              />
              <Tooltip formatter={(val) => formatRupiah(val)} />
              <Scatter data={aktualVsPrediksi} fill={blue} opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

// 🎨 Styles biar rapi
const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  border: "1px solid #E5E7EB",
  borderRadius: "12px",
  padding: "28px",
};

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "15px",
  color: "#1E3A8A",
  marginBottom: "4px",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6B7280",
  marginBottom: "24px",
};