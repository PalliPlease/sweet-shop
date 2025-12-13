from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.db.base import Base
from app.db.session import engine

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router)

@app.get("/")
def health_check():
    return {"status": "ok"}
