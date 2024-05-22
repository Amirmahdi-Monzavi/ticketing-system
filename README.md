# Ticketing System

This application allows users to sign up, log in, and submit tickets. An admin can log in, view a list of all tickets, and see each ticket's details. The system is built using the following technologies:

## Frontend:

- **React**: Used for building the user interface.
- **Tailwind CSS**: Used for styling the application.
- **React Router**: Handles client-side routing.
- **TanStack Query**: Manages HTTP requests and error handling.

## Backend:

- **Node.js**: The runtime environment.
- **Express.js**: Sets up routes and middleware.
- **CORS**: Manages cross-origin requests.
- **bcrypt**: Hashes passwords.
- **JWT (JSON Web Token)**: Provides authentication.
- **MySQL2**: Communicates with the MySQL database.

## Database:

- **MySQL**: The relational database management system.

## Installation Instructions

Before you begin, ensure that you have Node.js installed.

### Database Setup:

1. Open the MySQL Command Line.
2. Create a new user:

```sql
 CREATE USER `admin`@`localhost` IDENTIFIED BY 'admin';
```

3. Create your database:

```sql
 CREATE DATABASE ticketing_system_db;
```

4. Grant all privileges:

```sql
GRANT ALL PRIVILEGES ON ticketing_system_db. * TO 'admin'@'localhost';
```

5. Refresh permissions:

```sql
 FLUSH PRIVILEGES;
```

### Frontend Setup:

1. Navigate to the frontend directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Backend Setup:

1. Navigate to the backend/src directory.
2. Run `npm install` to install dependencies.
3. Ensure that the MySQL server is running and accessible.
4. Create a `.env` file with database credentials and a JWT secret.

```
DB_HOST=localhost
DB_USER= admin
DB_PASSWORD=admin
DB_DATABASE=ticketing_system_db
JWT_SECRET=7b8e2f1a9c4d3e5b0a6f8c7d2e1b4a9e
```

5. Run `node app.js` to start the backend server.

## Usage

- Access the frontend at http://localhost:5173.
- The backend runs on http://localhost:3000.
- Users can sign up, log in, and submit tickets.
- Admins can view tickets and their details.
