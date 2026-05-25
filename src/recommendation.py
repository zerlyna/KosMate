import pandas as pd

from src.database import engine

# =========================
# RECOMMENDATION
# =========================

def get_recommendation(
    cluster,
    prediksi_harga
):

    # =========================
    # QUERY DATA DARI POSTGRES
    # =========================

    query = f"""
    SELECT
        nama_kos AS "Nama Kos",
        jenis AS "Jenis",
        harga AS "Harga",
        jarak AS "Jarak dari PENS",
        wifi AS "WiFi",
        ac AS "AC",
        dapur AS "Dapur",
        listrik AS "Listrik",
        kamar_mandi AS "Kamar mandi"
    FROM kos_data
    WHERE cluster_kmeans = {cluster}
    """

    hasil = pd.read_sql(
        query,
        engine
    )
    # HITUNG SELISIH HARGA

    hasil["selisih_harga"] = abs(hasil["harga"] - prediksi_harga)

    # SORT REKOMENDASI

    hasil = hasil.sort_values(by="selisih_harga")

    # DROP KOLOM BANTUAN

    hasil = hasil.drop(
        columns=["selisih_harga"])

    return hasil.to_dict(
        orient="records")