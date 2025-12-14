from pydantic import BaseModel

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    stock: int


class SweetOut(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int

    class Config:
        from_attributes = True
