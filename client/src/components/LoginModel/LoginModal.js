import React, { useState } from 'react';

const LoginModal = ({ open, onClose, onGoogleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    if (!username || !password || !confirm) return setError('All fields required');
    if (password !== confirm) return setError('Passwords do not match');
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt_token', data.token);
        window.location.reload();
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (e) {
      setError('Signup failed');
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt_token', data.token);
        window.location.reload();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (e) {
      setError('Login failed');
    }
  };

  if (!open) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 rounded" style={{ minWidth: 320 }}>
          <h2>{signup ? 'Sign Up' : 'Login'}</h2>
          <div className="mb-2">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="form-control mb-2" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-2" />
            {signup && (
              <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} className="form-control mt-2" />
            )}
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          {signup ? (
            <>
              <button className="btn btn-primary w-100 mb-2" onClick={handleSignup}>Sign Up</button>
              <button className="btn btn-secondary w-100" onClick={() => setSignup(false)}>Back to Login</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>Login</button>
              <button className="btn btn-danger w-100 mb-2" style={{ background: '#4285F4', color: 'white' }} onClick={onGoogleLogin}>
                Sign in with Google
              </button>
              <button className="btn btn-secondary w-100 mt-2" onClick={() => setSignup(true)}>Sign Up</button>
            </>
          )}
          <button className="btn btn-light w-100 mt-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 