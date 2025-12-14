from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def get_admin_token():
    # Register admin
    client.post(
        "/api/auth/register",
        json={
            "email": "admin@test.com",
            "password": "admin123"
        }
    )

    # Manually promote to admin (DB shortcut for tests)
    from app.db.session import SessionLocal
    from app.models.user import User

    db = SessionLocal()
    user = db.query(User).filter(User.email == "admin@test.com").first()
    user.role = "ADMIN"
    db.commit()
    db.close()

    # Login
    res = client.post(
        "/api/auth/login",
        data={
            "username": "admin@test.com",
            "password": "admin123"
        }
    )

    return res.json()["access_token"]


def test_create_sweet():
    token = get_admin_token()

    response = client.post(
        "/api/sweets/",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "name": "Rasgulla",
            "category": "Indian",
            "price": 25.0,
            "stock": 50
        }
    )

    assert response.status_code == 200

    data = response.json()
    assert data["name"] == "Rasgulla"
    assert data["category"] == "Indian"
    assert data["price"] == 25.0
    assert data["stock"] == 50


def test_list_sweets():
    response = client.get("/api/sweets/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
