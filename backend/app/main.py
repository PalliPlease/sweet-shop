print("🔥 THIS MAIN.PY IS RUNNING 🔥")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.sweets import router as sweets_router
from app.api.orders import router as orders_router
from app.db.base import Base
from app.db.session import engine

app = FastAPI()

# 🔥 CORS FIX (THIS IS THE IMPORTANT PART)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=False,
    allow_methods=["*"],  # IMPORTANT
    allow_headers=["*"],
)


# Create DB tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth_router, prefix="/api")
app.include_router(sweets_router, prefix="/api")
app.include_router(orders_router, prefix="/api")

@app.get("/")
def health():
    return {"status": "ok"}
