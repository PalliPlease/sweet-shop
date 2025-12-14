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

origins = [
    "https://fastapi-nmzj.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        init_db(db)
        seed_sweets(db)
    finally:
        db.close()

app.include_router(auth_router, prefix="/api")
app.include_router(sweets_router, prefix="/api")
# app.include_router(orders_router, prefix="/api") # We will remove orders router as we are moving logic to sweets

@app.get("/")
def health():
    return {"status": "ok"}
