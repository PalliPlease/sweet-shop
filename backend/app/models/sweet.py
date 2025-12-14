from sqlalchemy import Column, Integer, String, Float
from app.db.base_class import Base
import uuid

class Sweet(Base):
    __tablename__ = "sweets"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
