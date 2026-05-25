import pandas as pd

from src.database import engine

# =========================
# LOAD CSV
# =========================

df = pd.read_csv(
    "data/Kos_Clean.csv"
)

# =========================
# IMPORT TO POSTGRES
# =========================

df.to_sql(
    "kos_data",
    engine,
    if_exists="replace",
    index=False
)

print("Data berhasil masuk PostgreSQL")