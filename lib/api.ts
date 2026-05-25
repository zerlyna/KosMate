import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface InputUser {
  jarak: number;
  jenis: string;
  wifi: string;
  ac: string;
  dapur: string;
  listrik: string;
  kamar_mandi: string;
}

export interface Kos {
  nama_kos: string;
  jenis: string;
  harga: number;
  jarak: number;
  wifi: string;
  ac: string;
  dapur: string;
  listrik: string;
  kamar_mandi: string;
}

export interface HasilPrediksi {
  prediksi_harga: number;
  cluster: number;
  rekomendasi: Kos[];
}

const ALL_KOS: Kos[] = [
  {"nama_kos":"Kos Muslimah","jenis":"Khusus Perempuan","harga":800000,"jarak":2.8,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kos The Gayam","jenis":"Khusus Perempuan","harga":1600000,"jarak":2.4,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Griya Risny TMB 114","jenis":"Khusus Perempuan","harga":800000,"jarak":1.0,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kos Khoirul Huda","jenis":"Campur","harga":275000,"jarak":6.0,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"kos rabel","jenis":"Khusus Perempuan","harga":1250000,"jarak":0.5,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Jalan TMB No. 47","jenis":"Khusus Perempuan","harga":700000,"jarak":2.1,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Gebang Lor 38","jenis":"Khusus Perempuan","harga":800000,"jarak":1.5,"wifi":"Ada","ac":"Tidak","dapur":"Tidak","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Erland Kos","jenis":"Khusus Laki Laki","harga":650000,"jarak":3.5,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Dalam"},
  {"nama_kos":"Kos Laki","jenis":"Khusus Laki Laki","harga":750000,"jarak":3.5,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kos muslimah Bu Yuni","jenis":"Khusus Perempuan","harga":750000,"jarak":3.3,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Putra Bu Yeni","jenis":"Khusus Laki Laki","harga":700000,"jarak":1.0,"wifi":"Ada","ac":"Tidak","dapur":"Tidak","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kos Pak Rokhim","jenis":"Khusus Laki Laki","harga":650000,"jarak":2.4,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Rabbani Kost Syariah","jenis":"Khusus Perempuan","harga":2500000,"jarak":1.2,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kos Sakinah","jenis":"Khusus Perempuan","harga":1800000,"jarak":2.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Wisper 312","jenis":"Khusus Laki Laki","harga":1300000,"jarak":0.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Pink","jenis":"Campur","harga":1500000,"jarak":2.0,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kos Gebang Muslim","jenis":"Campur","harga":1300000,"jarak":2.0,"wifi":"Ada","ac":"Ada","dapur":"Tidak","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Griya Siswa","jenis":"Khusus Laki Laki","harga":1900000,"jarak":2.5,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Kalisari Damen VIP","jenis":"Khusus Perempuan","harga":1500000,"jarak":1.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost DHR Tipe A","jenis":"Khusus Perempuan","harga":2750000,"jarak":0.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Carica Tipe Double","jenis":"Campur","harga":1500000,"jarak":2.9,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Wisper Residence 37 Tipe B","jenis":"Khusus Perempuan","harga":2700000,"jarak":0.8,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Heryne Executive 1","jenis":"Khusus Perempuan","harga":2500000,"jarak":0.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Armani Tipe plus Two","jenis":"Khusus Perempuan","harga":1800000,"jarak":0.5,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Gebang Lor 81","jenis":"Khusus Laki Laki","harga":750000,"jarak":0.8,"wifi":"Ada","ac":"Tidak","dapur":"Tidak","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Kamboja Ungu Tipe Executive","jenis":"Khusus Laki Laki","harga":1650000,"jarak":0.4,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Adelwin Hilman W Tipe A","jenis":"Khusus Perempuan","harga":1750000,"jarak":1.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Mykost Wisma Permai Tipe D","jenis":"Khusus Perempuan","harga":1400000,"jarak":0.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Rainbow","jenis":"Khusus Perempuan","harga":1600000,"jarak":0.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Gardena Homestay Tipe B","jenis":"Campur","harga":2300000,"jarak":0.6,"wifi":"Ada","ac":"Ada","dapur":"Tidak","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Ayem Tipe 2","jenis":"Khusus Perempuan","harga":2600000,"jarak":0.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Inas Nuri Al Salwa Tipe A","jenis":"Khusus Laki Laki","harga":650000,"jarak":0.2,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Sutorejo Tipe A","jenis":"Khusus Laki Laki","harga":1500000,"jarak":0.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Griya Osma","jenis":"Khusus Perempuan","harga":1600000,"jarak":1.0,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Mulyosari Mas Mulyorejo","jenis":"Khusus Perempuan","harga":1200000,"jarak":1.5,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Putra Mulyosari","jenis":"Khusus Laki Laki","harga":1300000,"jarak":1.2,"wifi":"Ada","ac":"Ada","dapur":"Tidak","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Liana 1 Tipe B","jenis":"Khusus Perempuan","harga":1500000,"jarak":1.5,"wifi":"Ada","ac":"Ada","dapur":"Tidak","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Wisper Residence 37 Tipe A","jenis":"Khusus Perempuan","harga":2000000,"jarak":0.8,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Singgahsini Griya 4S","jenis":"Khusus Laki Laki","harga":1221000,"jarak":1.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Keputih Tegal","jenis":"Khusus Laki Laki","harga":1400000,"jarak":1.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Keputih 74","jenis":"Khusus Perempuan","harga":1800000,"jarak":1.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Aranos Executive","jenis":"Khusus Laki Laki","harga":1700000,"jarak":1.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Goldieast","jenis":"Khusus Laki Laki","harga":1700000,"jarak":1.9,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Sin 3 Tipe A","jenis":"Khusus Perempuan","harga":1600000,"jarak":1.4,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Puspita Tipe B","jenis":"Khusus Perempuan","harga":1600000,"jarak":1.9,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Harvest Tipe Atas","jenis":"Khusus Perempuan","harga":1750000,"jarak":1.2,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Azamarsy","jenis":"Khusus Laki Laki","harga":1255000,"jarak":1.8,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Wilfrid Tipe A","jenis":"Khusus Laki Laki","harga":1200000,"jarak":1.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Nadiya Keputih Tipe A","jenis":"Khusus Perempuan","harga":1200000,"jarak":1.2,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Kampus ITS AC","jenis":"Khusus Laki Laki","harga":1200000,"jarak":0.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Koshie Pu Reguler","jenis":"Khusus Laki Laki","harga":2000000,"jarak":1.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Graha KTT 1 Tipe VIP","jenis":"Khusus Laki Laki","harga":1500000,"jarak":1.3,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Industrial Tipe A","jenis":"Khusus Perempuan","harga":1550000,"jarak":1.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost La ana Tipe A","jenis":"Khusus Laki Laki","harga":1300000,"jarak":1.8,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Ratna Cempaka","jenis":"Khusus Perempuan","harga":1075000,"jarak":1.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Ayska Executive","jenis":"Khusus Perempuan","harga":1650000,"jarak":1.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Include","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Budi Keputih","jenis":"Khusus Laki Laki","harga":1350000,"jarak":1.2,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Mafaza House Tipe Modern","jenis":"Khusus Laki Laki","harga":1300000,"jarak":2.2,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Dhomey","jenis":"Khusus Laki Laki","harga":1500000,"jarak":1.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Domin Tipe A","jenis":"Khusus Perempuan","harga":1600000,"jarak":1.9,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Griya Maharani Superior","jenis":"Khusus Perempuan","harga":2400000,"jarak":0.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Azalia Wisper Mulyorejo","jenis":"Khusus Laki Laki","harga":1500000,"jarak":0.6,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Ibu Rini II Tipe A","jenis":"Khusus Perempuan","harga":900000,"jarak":0.6,"wifi":"Ada","ac":"Tidak","dapur":"Ada","listrik":"Include","kamar_mandi":"Luar"},
  {"nama_kos":"Kost Rensi Kejawan Gebang Tipe A","jenis":"Khusus Perempuan","harga":1495000,"jarak":0.7,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Dalam"},
  {"nama_kos":"Kost Berkah Keputih","jenis":"Khusus Laki Laki","harga":1300000,"jarak":2.1,"wifi":"Ada","ac":"Ada","dapur":"Ada","listrik":"Exclude","kamar_mandi":"Luar"},
];

function hitungPrediksiHarga(input: InputUser): number {
  const base = 800000;
  let harga = base;
  if (input.ac === "Ada") harga += 400000;
  if (input.wifi === "Ada") harga += 100000;
  if (input.dapur === "Ada") harga += 100000;
  if (input.kamar_mandi === "Dalam") harga += 150000;
  if (input.listrik === "Include") harga -= 50000;
  harga += (2 - input.jarak) * 50000;
  return Math.max(300000, Math.round(harga / 1000) * 1000);
}

function filterRekomendasi(input: InputUser, prediksiHarga: number): Kos[] {
  const toleransi = prediksiHarga * 0.4;

  let hasil = ALL_KOS.filter((k) => {
    const cocokJenis = input.jenis === "Campur" || k.jenis === input.jenis || k.jenis === "Campur";
    const cocokHarga = Math.abs(k.harga - prediksiHarga) <= toleransi;
    return cocokJenis && cocokHarga;
  });

  if (hasil.length < 5) {
    const tambahan = ALL_KOS.filter((k) => !hasil.includes(k))
      .sort((a, b) => Math.abs(a.harga - prediksiHarga) - Math.abs(b.harga - prediksiHarga));
    hasil = [...hasil, ...tambahan].slice(0, 5);
  }

  return hasil
    .sort((a, b) => Math.abs(a.harga - prediksiHarga) - Math.abs(b.harga - prediksiHarga))
    .slice(0, 8);
}

export async function getRekomendasi(input: InputUser): Promise<HasilPrediksi> {
  const USE_DUMMY = false;

  if (USE_DUMMY) {
    await new Promise((res) => setTimeout(res, 800));
    const prediksiHarga = hitungPrediksiHarga(input);
    const rekomendasi = filterRekomendasi(input, prediksiHarga);
    return {
      prediksi_harga: prediksiHarga,
      cluster: Math.floor(Math.random() * 15),
      rekomendasi,
    };
  }

  const response = await axios.post(`${API_URL}/predict`, input);
  return response.data;
}