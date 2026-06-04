from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:OzDdqcoWupOReYfVHLaNVGPcpfaFNWaY@zephyr.proxy.rlwy.net:20205/railway"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine)