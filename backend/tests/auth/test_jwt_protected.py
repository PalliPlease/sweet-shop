from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_protected_route_requires_token():
    response = client.get("/api/auth/me")
    assert response.status_code == 401


def test_protected_route_with_valid_token():
    # Register user
    client.post(
        "/api/auth/register",
        json={"email": "jwt@test.com", "password": "secret123"}
    )

    # Login user
    login_response = client.post(
        "/api/auth/login",
        data={"username": "jwt@test.com", "password": "secret123"}
    )

    token = login_response.json()["access_token"]

    # Access protected route
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    assert response.json()["email"] == "jwt@test.com"
