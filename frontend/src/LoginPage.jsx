import React, { useState } from "react";
import "./App.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("login"); // 'login', 'register', 'forgot'

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // TODO: Call backend to verify email/password
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@email.com" && password === "password123") { // Demo only
        setMessage("Login successful!");
        onLogin && onLogin(email);
      } else {
        setMessage("Invalid email or password.");
      }
    }, 1000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // TODO: Call backend to register
    setTimeout(() => {
      setLoading(false);
      setMessage("Account created! Please log in.");
      setMode("login");
    }, 1000);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // TODO: Call backend to send reset link
    setTimeout(() => {
      setLoading(false);
      setMessage("Password reset link sent to your email.");
    }, 1000);
  };

  return (
    <div className="app-background login-bg-image login-left-layout">
      <div className="login-container">
        <h2 className="login-title">"Write. Reflect. Discover."</h2>
        <p className="login-subtitle">
          {mode === "login" && "Sign in with email"}
          {mode === "register" && "Create your account"}
          {mode === "forgot" && "Reset your password"}
        </p>
        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input password-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="login-links-row">
              <span className="login-link" onClick={() => setMode("forgot")}>Forgot password?</span>
              <span className="login-link" onClick={() => setMode("register")}>Create account</span>
            </div>
            <button type="submit" className="button-primary login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
        {mode === "register" && (
          <form onSubmit={handleRegister}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input password-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="login-links-row">
              <span className="login-link" onClick={() => setMode("login")}>Back to login</span>
            </div>
            <button type="submit" className="button-primary login-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}
        {mode === "forgot" && (
          <form onSubmit={handleForgot}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="login-links-row">
              <span className="login-link" onClick={() => setMode("login")}>Back to login</span>
            </div>
            <button type="submit" className="button-primary login-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
      {message && <div className="toast-message login-message">{message}</div>}
    </div>
  );
}

export default LoginPage;
