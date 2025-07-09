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

### Project Structure
- `model/` - Mongoose models
- `config/` - Configuration files

### Notes
- Ensure MongoDB is running before starting the server.
- The server exposes RESTful APIs for the client frontend.

---

For any issues, please contact the maintainer. 