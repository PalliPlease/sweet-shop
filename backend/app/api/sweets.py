from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.deps import get_current_admin, get_current_user

from app.db.deps import get_db
from app.models.sweet import Sweet
from app.schemas.sweet import SweetCreate, SweetOut

router = APIRouter(prefix="/sweets", tags=["sweets"])


@router.post("/", response_model=SweetOut)
def create_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    db_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        stock=sweet.stock
    )
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@router.put("/{sweet_id}")
def update_sweet(
    sweet_id: str,
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    for key, value in sweet.dict().items():
        setattr(db_sweet, key, value)

    db.commit()
    return db_sweet


@router.get("/", response_model=list[SweetOut])
def list_sweets(db: Session = Depends(get_db)):
    return db.query(Sweet).all()

@router.get("/search", response_model=list[SweetOut])
def search_sweets(
    name: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))

    if category:
        query = query.filter(Sweet.category.ilike(f"%{category}%"))

    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)

    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.all()

@router.post("/{sweet_id}/purchase")
def purchase_sweet(
    sweet_id: str,
    quantity: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user),
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.stock < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    sweet.stock -= quantity
    db.commit()

    return {"message": "Purchase successful", "remaining_stock": sweet.stock}

@router.post("/{sweet_id}/restock")
def restock_sweet(
    sweet_id: str,
    quantity: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin),
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.stock += quantity
    db.commit()

    return {"message": "Restocked successfully", "stock": sweet.stock}

@router.delete("/{sweet_id}")
def delete_sweet(
    sweet_id: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted"}

@router.post("/{sweet_id}/restock")
def restock_sweet(
    sweet_id: str,
    quantity: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.stock += quantity
    db.commit()
    return sweet
