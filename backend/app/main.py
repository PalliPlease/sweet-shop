from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.models.sweet import Sweet

from app.api.auth import router as auth_router
from app.api.sweets import router as sweets_router
from app.api.orders import router as orders_router

from app.db.base import Base
from app.db.session import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚠️ ONLY CREATE TABLES WHEN RUNNING SERVER
from app.db.session import SessionLocal
from app.db.init_db import init_db

def seed_sweets(db: Session):
    if db.query(Sweet).count() == 0:
        sweets = [
            Sweet(name="Rasgulla", category="Indian", price=25, stock=50),
            Sweet(name="Gulab Jamun", category="Indian", price=30, stock=40),
            Sweet(name="Brownie", category="Bakery", price=60, stock=20),
            Sweet(name="Donut", category="Bakery", price=45, stock=0),
        ]
        db.add_all(sweets)
        db.commit()

from app.db.session import SessionLocal

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    seed_sweets(db)
    db.close()


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    init_db(db)
    db.close()

app.include_router(auth_router, prefix="/api")
app.include_router(sweets_router, prefix="/api")
app.include_router(orders_router, prefix="/api")

@app.get("/")
def health():
    return {"status": "ok"}
