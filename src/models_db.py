from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

# =========================
# USER INPUT
# =========================

class UserInput(Base):

    __tablename__ = "user_input"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    jarak = Column(Float)
    jenis = Column(String)
    wifi = Column(String)
    ac = Column(String)
    dapur = Column(String)
    listrik = Column(String)
    kamar_mandi = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

# =========================
# PREDICTION RESULT
# =========================

class PredictionResult(Base):

    __tablename__ = "prediction_result"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_input_id = Column(
        Integer,
        ForeignKey("user_input.id")
    )

    prediksi_harga = Column(Float)

    cluster = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

# =========================
# KOS DATA
# =========================

class KosData(Base):
    __tablename__ = "kos_data"

    id = Column(
        Integer,
        primary_key=True,
        index=True)

    nama_kos = Column(String)
    jenis = Column(String)
    harga = Column(Float)
    jarak = Column(Float)
    wifi = Column(String)
    ac = Column(String)
    dapur = Column(String)
    listrik = Column(String)
    kamar_mandi = Column(String)
    cluster = Column(Integer)