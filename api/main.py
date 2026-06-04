from fastapi import FastAPI

from src.preprocessing import preprocess_input
from src.predict import (
    predict_price,
    predict_cluster)

from src.recommendation import (
    get_recommendation
    )
from src.database import engine
print(engine)

from src.save_history import save_history

# =========================
# FASTAPI
# =========================

app = FastAPI()

# =========================
# ROOT
# =========================

@app.get("/")
def home():

    return {
        "message": "KosMate Backend Running"
    }

# =========================
# PREDICT
# =========================

@app.post("/predict")
def predict(data: dict):

    # preprocessing
    input_user = preprocess_input(data)

    # predict harga
    prediksi_harga = predict_price(
        input_user
    )

    # predict cluster
    cluster = predict_cluster(
    input_user,
    prediksi_harga)

    save_history(
    data, prediksi_harga,
    cluster)

    rekomendasi = get_recommendation(
    cluster,
    prediksi_harga)

    return {
        "prediksi_harga": int(prediksi_harga),
        "cluster": cluster,
        "rekomendasi": rekomendasi
    }