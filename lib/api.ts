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
  alamat: string;
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


function normalize(value: unknown): string {
  if (!value) return "";

  const v = String(value).toLowerCase();

  if (v.includes("ada")) return "Ada";
  if (v.includes("tidak")) return "Tidak";
  if (v.includes("include")) return "Include";
  if (v.includes("exclude")) return "Exclude";

  if (v.includes("dalam")) return "Dalam";
  if (v.includes("luar")) return "Luar";

  if (v.includes("putra")) return "Putra";
  if (v.includes("putri")) return "Putri";
  if (v.includes("campur")) return "Campur";

  return String(value);
}


function mapRekomendasi(raw: Record<string, unknown>[]): Kos[] {
  return raw.map((k) => ({
    nama_kos: (k["Nama Kos"] ?? k["nama_kos"] ?? "") as string,

    jenis: normalize(
      k["Jenis Kos"] ??
      k["jenis_kos"] ??
      k["Jenis"] ??
      k["jenis"]
    ),

    harga: Number(k["Harga"] ?? k["harga"] ?? 0),

    jarak: Number(
      k["Jarak dari PENS"] ??
      k["jarak"] ??
      0
    ),

    // ✅ TAMBAHKAN INI
    alamat: (k["Alamat"] ?? k["alamat"] ?? "") as string,

    wifi: normalize(k["WiFi"] ?? k["wifi"]),
    ac: normalize(k["AC"] ?? k["ac"]),
    dapur: normalize(k["Dapur"] ?? k["dapur"]),
    listrik: normalize(k["Listrik"] ?? k["listrik"]),
    kamar_mandi: normalize(
      k["Kamar mandi"] ??
      k["kamar_mandi"]
    ),
  }));
}

export async function getRekomendasi(input: InputUser): Promise<HasilPrediksi> {
  const response = await axios.post(`${API_URL}/predict`, input);
  const data = response.data;

  return {
    prediksi_harga: data.prediksi_harga,
    cluster: data.cluster,
    rekomendasi: mapRekomendasi(data.rekomendasi),
  };
}