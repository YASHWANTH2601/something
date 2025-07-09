# Node.js/Express Server

This is the backend server for the application, built with Node.js and Express.

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

- Database configuration is located in `config/db.js`.
- Update the MongoDB connection string as needed.

### Running the Server

To start the server:

```bash
npm start
```

The server will run on [http://localhost:5000](http://localhost:5000) by default.

### Available Scripts

- `npm start` - Starts the server.
- `npm run dev` - Starts the server with nodemon for development (if configured).

## Project Structure

```
server/
├─ config/
│  └─ db.js              # MongoDB connection logic
├─ controller/
│  └─ authController.js  # Authintication Logic
├─ middleware/
│  └─ authenticate.js    # Middleware logic
├─ model/
│  └─ user.js            # Mongoose user model
├─ router/
│  └─ authRouter.js      # API router
├─ .env
├─ .gitignore
├─ index.js              # Main server file
├─ package-lock.json     # Dependency lock file
├─ package.json          # Project metadata and scripts
└─ README.md             # This file
```

### Directory Descriptions

- `config/` - Configuration files (e.g., database connection)
- `controller/` - authontication Logi (e.g., Login Signup)
- `middleware/` - Middleware logic
- `router/` - API router endpoints
- `model/` - Mongoose models (e.g., User)
- `index.js` - Main Express server and API endpoints

## API Documentation

### Authentication & User Endpoints

#### 1. Google OAuth

- **GET `/auth/google`**
  - Redirects to Google for authentication.
- **GET `/auth/google/callback`**
  - Handles Google OAuth callback.
  - **Success:** Redirects to frontend with JWT token in URL.
  - **Failure:** Redirects to `/start` page on frontend.

#### 2. Get Authenticated User

- **GET `/api/user`**
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Success Response:**
    ```json
    {
      "user": {
        /* user info from JWT */
      }
    }
    ```
  - **Failure Response:**
    - `401 Unauthorized` if no token
    - `403 Forbidden` if invalid token
    ```json
    { "error": "No token" }
    { "error": "Invalid token" }
    ```

#### 3. User Signup

- **POST `/signup`**
  - **Body:**
    ```json
    { "username": "string", "password": "string" }
    ```
  - **Success Response:**
    ```json
    { "token": "<JWT>" }
    ```
  - **Failure Responses:**
    - `400 Bad Request` if missing fields
      ```json
      { "error": "Username and password required" }
      ```
    - `409 Conflict` if user exists
      ```json
      { "error": "User already exists" }
      ```
    - `500 Internal Server Error` for server/database issues
      ```json
      { "error": "Server error" }
      ```

#### 4. User Login

- **POST `/login`**
  - **Body:**
    ```json
    { "username": "string", "password": "string" }
    ```
  - **Success Response:**
    ```json
    { "token": "<JWT>" }
    ```
  - **Failure Responses:**
    - `400 Bad Request` if missing fields
      ```json
      { "error": "Username and password required" }
      ```
    - `401 Unauthorized` if credentials are invalid
      ```json
      { "error": "Invalid credentials" }
      ```
    - `500 Internal Server Error` for server/database issues
      ```json
      { "error": "Server error" }
      ```

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following structure:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000 # Optional, defaults to 5000
```

- `MONGO_URI`: MongoDB connection string (local or cloud)
- `JWT_SECRET`: Secret key for signing JWT tokens
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Credentials for Google OAuth
- `PORT`: (Optional) Port for the server to run on

---
