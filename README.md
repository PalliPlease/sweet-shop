# Sweet Shop Management System

## Overview

The Sweet Shop Management System is a full-stack web application designed to manage sweets inventory, user purchases, and administrative operations. The project demonstrates REST API design, authentication using JWT, role-based access control, database management, frontend integration, and automated testing using Test-Driven Development principles.

The system supports normal users for browsing and purchasing sweets, and admin users for managing inventory.

## Tech Stack

Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pytest

Frontend
- React
- Vite
- JavaScript
- HTML and CSS

## Core Features

User Authentication
- User registration
- User login using JWT tokens
- Role-based access control (USER, ADMIN)

Sweets Management
- View all available sweets
- Search sweets by name, category, or price range
- Purchase sweets (stock decreases)
- Prevent purchase if stock is zero

Admin Features
- Add new sweets
- Update sweet details
- Delete sweets
- Restock sweets

Inventory Management
- Stock automatically updates on purchase
- Restock endpoint restricted to admin users

## API Endpoints

Authentication
- POST /api/auth/register
- POST /api/auth/login

Sweets
- GET /api/sweets
- GET /api/sweets/search
- POST /api/sweets (admin only)
- PUT /api/sweets/{id} (admin only)
- DELETE /api/sweets/{id} (admin only)

Inventory
- POST /api/sweets/{id}/purchase
- POST /api/sweets/{id}/restock (admin only)

## Database Design

The application uses PostgreSQL with the following main tables:
- users
- sweets
- orders

## Testing

The backend is built using Test-Driven Development.
- Pytest is used for testing
- Tests cover authentication, protected routes, sweets management, and purchasing logic
- Tests ensure authorization and role restrictions work correctly

To run tests:
```bash
pytest
```

## Running the Project Locally

Backend Setup

Clone the repository
Create and activate a virtual environment
Install dependencies
Set environment variables
Run the server

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend Setup
```bash
cd sweet-shop-frontend
npm install
npm run dev
```

Default admin user
admin@sweetshop.com
admin123

## My AI Usage

I used ChatGPT as a development assistant throughout this project.

How I used AI:

To brainstorm API endpoint structure and REST design

To generate initial boilerplate for FastAPI routes and schemas

To debug SQLAlchemy relationship and foreign key issues

To understand JWT payload design and role-based authorization

To improve frontend integration with authentication tokens

To clarify pytest failures and improve test structure

How I worked with AI:

AI suggestions were used as a starting point

All generated code was reviewed, modified, and integrated manually

I debugged runtime and logic errors independently and verified fixes through tests

Impact on my workflow:

AI significantly reduced time spent on boilerplate and syntax lookup

Allowed me to focus more on architecture, debugging, and correctness

