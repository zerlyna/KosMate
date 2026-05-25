from src.database import engine
from src.models_db import Base

Base.metadata.create_all(bind=engine)

print("Tabel berhasil dibuat")