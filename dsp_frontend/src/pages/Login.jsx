import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

/**
 * PUBLIC_INTERFACE
 * Login page with email/password form and error/loading states.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="MainContent">
      <div className="Card">
        <div className="Section">
          <h1 className="PageTitle">Welcome back</h1>
          <p className="PageSubtitle">Log in to continue to your dashboard.</p>
          <form className="Form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="Label">Email</label>
              <input
                id="email"
                type="email"
                className="Input"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="Label">Password</label>
              <input
                id="password"
                type="password"
                className="Input"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error ? <div className="ErrorText" role="alert">{error}</div> : null}
            <div className="Row">
              <button className="Button ButtonPrimary" type="submit" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Log in'}
              </button>
              <Link to="/signup" className="Button">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
