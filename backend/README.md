# Yoliday Backend

This is the backend for the Yoliday project, built with Node.js, Express, TypeScript, and MySQL.

## Database Setup

### Prerequisites

- MySQL server installed and running
- Node.js and npm installed

### Configuration

1. Make sure your MySQL server is running
2. Update the `.env` file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=yoliday_db
PORT=3001
```

### Initialize Database

Run the following command to create the database and tables:

```
npm run init-db
```

This will:

- Create the database if it doesn't exist
- Create the necessary tables
- Insert sample data

## Running the Server

### Development Mode

```
npm run dev
```

### Production Mode

```
npm run build
npm start
```

## API Endpoints

### Projects

- `GET /api/projects?page=1&limit=10`: Get paginated projects

### Cart

- `POST /api/cart`: Add a project to cart
  - Request body: `{ "project_id": 1, "user_id": 1 }`
- `GET /api/cart/:user_id`: Get cart items for a user

## Troubleshooting

If you encounter database connection issues:

1. Check that your MySQL server is running
2. Verify your credentials in the `.env` file
3. Make sure the database exists by running `npm run init-db`
4. Check the MySQL logs for any errors
