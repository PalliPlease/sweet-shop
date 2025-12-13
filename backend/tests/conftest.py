import sys
import os
import pytest
from app.db.session import SessionLocal
from app.models.user import User

# Add backend root to PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

@pytest.fixture(autouse=True)
def clean_users_table():
    db = SessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()