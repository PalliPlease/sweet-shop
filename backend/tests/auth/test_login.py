from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_user_can_login():
    # First register the user
    client.post(
        "/api/auth/register",
        json={
            "email": "login@test.com",
            "password": "secret123"
        }
    )

    # Now try to login
    response = client.post(
        "/api/auth/login",
        data={
            "username": "login@test.com",
            "password": "secret123"
        }
    )

    assert response.status_code == 200
    assert "access_token" in response.json()
