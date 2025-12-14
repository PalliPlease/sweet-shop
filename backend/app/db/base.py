from app.db.base_class import Base

# Import all models so SQLAlchemy registers them
from app.models.user import User
from app.models.sweet import Sweet
from app.models.order import Order