from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_user_can_register():
    response = client.post(
        '/api/auth/register',
        json={
            "email": "test@sweet.com",
            "password": "secret123"
        }
    )

    assert response.status_code == 201
    assert "access_token" in response.json()