import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/LoginModel/LoginModal";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

const Profile = ({ user }) => (
  <div className="p-4">
    <h2>Profile</h2>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>
);

function useAuthToken() {
  const [token, setToken] = useState(() => localStorage.getItem("jwt_token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem("jwt_token", urlToken);
      // Remove token from URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt_token");
    navigate("/start");
  };

  return [token, setToken, logout];
}

function AppRoutes() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, , logout] = useAuthToken();
  const navigate = useNavigate();
  // Fetch user info when token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [token]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    navigate("/home");
  };

  return (
    <>
      <Navbar
        user={user}
        onLoginClick={() => setLoginOpen(true)}
        onLogoutClick={logout}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onGoogleLogin={handleGoogleLogin}
      />
      <Routes>
        <Route
          path="/start"
          element={
            <div className="p-4">
              <h2>Login to get the details</h2>
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <div className="p-4">
                <h2>Home</h2>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
