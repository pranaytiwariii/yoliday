# Yoliday Project

A full-stack application for managing projects and cart functionality.

## Project Structure

- `frontend/`: React TypeScript frontend
- `backend/`: Node.js Express TypeScript backend

## Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create the database and tables:

   ```
   mysql -u root -p < src/database/schema.sql
   ```

   When prompted, enter your MySQL password (root).

4. Seed the database with sample data:

   ```
   mysql -u root -p < src/database/seed.sql
   ```

5. Start the development server:
   ```
   npm run dev
   ```

The backend server will run on http://localhost:3001.

## Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend application will run on http://localhost:3000.

## API Endpoints

### Projects

- `GET /api/projects?page=1&limit=10`: Get paginated projects

### Cart

- `POST /api/cart`: Add a project to cart
  - Request body: `{ "project_id": 1, "user_id": 1 }`
- `GET /api/cart/:user_id`: Get cart items for a user

## Technologies Used

### Frontend

- React
- TypeScript
- Axios for API requests
- Tailwind CSS for styling

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- Express Validator for data validation
