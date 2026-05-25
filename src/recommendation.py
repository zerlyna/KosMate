import pandas as pd

# =========================
# LOAD DATA
# =========================

df = pd.read_csv(
    "data/Kos_Clean.csv"
)

# =========================
# RECOMMENDATION
# =========================

def get_recommendation(
    cluster,
    prediksi_harga
):

    hasil = df[
        df["Cluster_KMeans"] == cluster
    ][[
        "Nama Kos",
        "Jenis",
        "Harga",
        "Jarak dari PENS",
        "WiFi",
        "AC",
        "Dapur",
        "Listrik",
        "Kamar mandi"
    ]]

    # =========================
    # HITUNG SELISIH HARGA
    # =========================

    hasil["Selisih_Harga"] = abs(
        hasil["Harga"] - prediksi_harga
    )

    # =========================
    # SORT REKOMENDASI
    # =========================

    hasil = hasil.sort_values(
        by="Selisih_Harga"
    )

    # =========================
    # DROP KOLOM BANTUAN
    # =========================

    hasil = hasil.drop(
        columns=["Selisih_Harga"]
    )

    return hasil.to_dict(
        orient="records"
    )