# React Client

This is the frontend client for the application, built with React.

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm (comes with Node.js)

### Installation

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm start` - Runs the app in development mode.
- `npm test` - Launches the test runner.
- `npm run build` - Builds the app for production.
- `npm run eject` - Ejects the app configuration (not reversible).

## Project Structure

```
├─src/
├─ components/
│  ├─ LoginModel/
│  │  └─ LoginModal.js     # Login modal component
│  └─ Navbar/
│     └─ Navbar.js         # Navigation bar component
├─ protectedRoute/
│  └─ ProtectedRoute.js    # Route protection logic
├─ App.css                 # Main app styles
├─ App.js                  # Main app component
├─ App.test.js
├─ index.css               # Global styles
├─ index.js                # Entry point

```

### Directory Descriptions

- `components/` - Contains reusable UI components (e.g., Navbar, LoginModal)
- `protectedRoute/` - Logic for protecting routes (authentication)
- `App.js` - Main application logic
- `index.js` - Entry point for React app

### Notes

- Make sure the backend server is running for API requests.
- Update API endpoints as needed in your code.

---
