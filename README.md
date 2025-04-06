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

3. Configure the database:

   - Make sure your MySQL server is running
   - Update the `.env` file with your MySQL credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=yoliday_db
     PORT=3001
     ```

4. Create the database and tables:

   ```
   npm run init-db
   ```

   This will create the database, tables, and insert sample data.

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

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Check that your MySQL server is running
2. Verify your credentials in the `.env` file
3. Make sure the database exists by running `npm run init-db` in the backend directory
4. Check the MySQL logs for any errors

The frontend will display a notification if the database connection fails and will fall back to using mock data.
