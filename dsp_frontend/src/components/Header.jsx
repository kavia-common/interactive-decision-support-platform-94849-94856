import React, { useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/auth';

/**
 * PUBLIC_INTERFACE
 * Header displays brand and auth actions (login/signup or logout).
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthed = useMemo(() => !!localStorage.getItem('auth_token'), [location.key]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="Header">
      <div className="HeaderInner">
        <Link to="/" className="Brand" aria-label="Home">
          <div className="BrandLogo" />
          <div className="BrandTitle">DSP Interface</div>
        </Link>
        <div className="NavSpacer" />
        <nav className="NavActions" aria-label="User actions">
          {!isAuthed ? (
            <>
              <Link className="Button" to="/login">Log in</Link>
              <Link className="Button ButtonPrimary" to="/signup">Sign up</Link>
            </>
          ) : (
            <button className="Button ButtonWarn" onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
