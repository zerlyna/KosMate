import pandas as pd

from src.database import engine

# =========================
# SAVE HISTORY
# =========================

def save_history(
    data,
    prediksi_harga,
    cluster):

    history = pd.DataFrame({
        "jarak": [data["jarak"]],
        "jenis": [data["jenis"]],
        "wifi": [data["wifi"]],
        "ac": [data["ac"]],
        "dapur": [data["dapur"]],
        "listrik": [data["listrik"]],
        "kamar_mandi": [data["kamar_mandi"]],
        "prediksi_harga": [prediksi_harga],
        "cluster": [cluster]})

    history.to_sql(
        "history_predict",
        engine,
        if_exists="append",
        index=False)

    print("History berhasil disimpan")