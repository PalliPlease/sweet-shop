from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_sweet():
    response = client.post(
        "/api/sweets/",
        json={
            "name": "Rasgulla",
            "price": 25.0,
            "stock": 50
        }
    )

    assert response.status_code == 200

    data = response.json()
    assert data["name"] == "Rasgulla"
    assert data["price"] == 25.0
    assert data["stock"] == 50
    assert "id" in data


def test_list_sweets():
    response = client.get("/api/sweets/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
