from pydantic import BaseModel

class OrderCreate(BaseModel):
    sweet_id: str
    quantity: int

class OrderOut(BaseModel):
    id: str
    sweet_id: str
    quantity: int

    class Config:
        from_attributes = True
