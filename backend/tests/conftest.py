import sys
import os
import pytest

from app.db.session import SessionLocal
from app.models.user import User
from app.models.order import Order
from app.models.sweet import Sweet

# Add backend root to PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


@pytest.fixture(autouse=True)
def clean_db():
    db = SessionLocal()

    # IMPORTANT: delete child tables FIRST
    db.query(Order).delete()
    db.query(Sweet).delete()

    # Keep the permanent admin user
    db.query(User).filter(User.email != "admin@sweetshop.com").delete()

    db.commit()
    db.close()
