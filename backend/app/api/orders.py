from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.deps import get_current_user
from app.models.order import Order
from app.models.sweet import Sweet
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderOut)
def purchase_sweet(
    order: OrderCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    sweet = db.query(Sweet).filter(Sweet.id == order.sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.stock < order.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    sweet.stock -= order.quantity

    new_order = Order(
        user_id=user.id,
        sweet_id=sweet.id,
        quantity=order.quantity
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order
