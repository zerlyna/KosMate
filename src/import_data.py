import pandas as pd
from sqlalchemy.orm import Session
from src.database import (SessionLocal)
from src.models_db import (KosData)

# LOAD CSV

df = pd.read_csv(
    "data/Kos_Clean.csv")

# DATABASE SESSION

db: Session = SessionLocal()

# IMPORT DATA

for _, row in df.iterrows():
    kos = KosData(

        nama_kos=row["Nama Kos"],

        jenis=row["Jenis"],

        harga=row["Harga"],

        jarak=row["Jarak dari PENS"],

        wifi=row["WiFi"],

        ac=row["AC"],

        dapur=row["Dapur"],

        listrik=row["Listrik"],

        kamar_mandi=row["Kamar mandi"],

        cluster=row["Cluster_KMeans"]
    )

    db.add(kos)

# COMMIT

db.commit()
db.close()

print("Data berhasil diimport")