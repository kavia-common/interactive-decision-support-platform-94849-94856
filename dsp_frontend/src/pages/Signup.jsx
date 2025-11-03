import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';

/**
 * PUBLIC_INTERFACE
 * Signup page with email/password form and error/loading states.
 */
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signup(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err?.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="MainContent">
      <div className="Card">
        <div className="Section">
          <h1 className="PageTitle">Create your account</h1>
          <p className="PageSubtitle">Sign up to start using the DSP interface.</p>
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
                placeholder="Choose a strong password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
            {error ? <div className="ErrorText" role="alert">{error}</div> : null}
            <div className="Row">
              <button className="Button ButtonPrimary" type="submit" disabled={submitting}>
                {submitting ? 'Creating account...' : 'Sign up'}
              </button>
              <Link to="/login" className="Button">Back to login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
