import joblib

# =========================
# LOAD MODEL
# =========================

rf_model = joblib.load(
    "models/model_rf.pkl"
)

kmeans_model = joblib.load(
    "models/model_kmeans.pkl"
)

scaler = joblib.load(
    "models/model_scaler.pkl"
)

# =========================
# PREDICT HARGA
# =========================

def predict_price(input_user):

    prediksi_harga = rf_model.predict(
        input_user
    )[0]

    return prediksi_harga

# =========================
# PREDICT CLUSTER
# =========================

def predict_cluster(
    input_user,
    prediksi_harga
):

    fitur_cluster = [
        "Harga",
        "Jarak dari PENS",
        "WiFi",
        "AC",
        "Dapur",
        "Listrik",
        "Kamar mandi",
        "Jenis_Campur",
        "Jenis_Khusus Laki Laki",
        "Jenis_Khusus Perempuan"
    ]

    input_cluster = input_user.copy()

    input_cluster["Harga"] = prediksi_harga

    input_cluster = input_cluster.reindex(
        columns=fitur_cluster,
        fill_value=0
    )

    input_scaled = scaler.transform(
        input_cluster
    )

    cluster = kmeans_model.predict(
        input_scaled
    )[0]

    return int(cluster)