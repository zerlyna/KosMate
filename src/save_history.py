from src.database import SessionLocal

from src.models_db import (
    UserInput,
    PredictionResult,
    RecommendationHistory
)

# =========================
# SAVE HISTORY
# =========================

def save_history(
    data,
    prediksi_harga,
    cluster,
    rekomendasi
):

    db = SessionLocal()
    try:

        # =========================
        # SIMPAN USER INPUT
        # =========================

        user = UserInput(
            jarak=data["jarak"],
            jenis=data["jenis"],
            wifi=data["wifi"],
            ac=data["ac"],
            dapur=data["dapur"],
            listrik=data["listrik"],
            kamar_mandi=data["kamar_mandi"])

        db.add(user)
        db.commit()
        db.refresh(user)

        # SIMPAN HASIL PREDIKSI

        prediction = PredictionResult(
            user_input_id=user.id,
            prediksi_harga=prediksi_harga,
            cluster=cluster)

        db.add(prediction)
        db.commit()
        db.refresh(prediction)

        # SIMPAN REKOMENDASI
        for kos in rekomendasi:
            rec = RecommendationHistory(
                prediction_result_id=prediction.id,
                kos_id=kos["id"])
            db.add(rec)

        db.commit()
        print("History berhasil disimpan")
    except Exception as e:

        db.rollback()
        print("Error:", e)
    finally:
        db.close()