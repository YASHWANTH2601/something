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
├── config/
│   └── db.js           # MongoDB connection logic
├── model/
│   └── user.js         # Mongoose user model
├── index.js            # Main server file (API routes)
├── package.json        # Project metadata and scripts
├── package-lock.json   # Dependency lock file
└── README.md           # This file
```

### Directory Descriptions
- `config/` - Configuration files (e.g., database connection)
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
    { "user": { /* user info from JWT */ } }
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

For any issues, please contact the maintainer. 