# Sweet Shop Management System

## Overview

CHECK IT OUT HERE! - https://fastapi-nmzj.vercel.app/

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
admin@sweetshop.com and pass 
admin123

## My AI Usage

I used ChatGPT as a development assistant throughout this project.

How I used AI:

- To brainstorm API endpoint structure and REST design

- To generate initial boilerplate for FastAPI routes and schemas

- To debug SQLAlchemy relationship and foreign key issues

- To understand JWT payload design and role-based authorization

- To improve frontend integration with authentication tokens

- To clarify pytest failures and improve test structure

How I worked with AI:

- AI suggestions were used as a starting point

- All generated code was reviewed, modified, and integrated manually

- I debugged runtime and logic errors independently and verified fixes through tests

Impact on my workflow:

-A I significantly reduced time spent on boilerplate and syntax lookup

- Allowed me to focus more on architecture, debugging, and correctness

## Screenshots
- Login Page
<img width="943" height="671" alt="image" src="https://github.com/user-attachments/assets/c2a0577a-0bcf-49da-ba62-b0baee4df3a6" />

- Admin Panel
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/54f40553-49e9-43c1-9fae-9281c08aeea6" />

- User Panel
<img width="1918" height="843" alt="image" src="https://github.com/user-attachments/assets/99a707f1-6a87-4772-9eb7-876e2990da43" />

## Test Report
<img width="1280" height="555" alt="image" src="https://github.com/user-attachments/assets/d7741102-0fa8-4f28-a729-b87e889f814d" />


