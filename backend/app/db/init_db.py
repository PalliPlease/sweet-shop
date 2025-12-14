from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password

ADMIN_EMAIL = "admin@sweetshop.com"
ADMIN_PASSWORD = "admin123"

def init_db(db: Session):
    admin = db.query(User).filter(User.email == ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=ADMIN_EMAIL,
            password_hash=hash_password(ADMIN_PASSWORD),
            role="ADMIN",
        )
        db.add(admin)
        db.commit()
