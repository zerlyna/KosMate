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

// mapping response backend ke format frontend
function mapRekomendasi(raw: Record<string, unknown>[]): Kos[] {
  return raw.map((k) => ({
    nama_kos: (k["Nama Kos"] ?? k["nama_kos"] ?? "") as string,
    jenis: (k["Jenis"] ?? k["jenis"] ?? "") as string,
    harga: (k["Harga"] ?? k["harga"] ?? 0) as number,
    jarak: (k["Jarak dari PENS"] ?? k["jarak"] ?? 0) as number,
    wifi: (k["WiFi"] ?? k["wifi"] ?? "") as string,
    ac: (k["AC"] ?? k["ac"] ?? "") as string,
    dapur: (k["Dapur"] ?? k["dapur"] ?? "") as string,
    listrik: (k["Listrik"] ?? k["listrik"] ?? "") as string,
    kamar_mandi: (k["Kamar mandi"] ?? k["kamar_mandi"] ?? "") as string,
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