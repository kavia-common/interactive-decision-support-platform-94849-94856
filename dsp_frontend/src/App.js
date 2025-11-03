import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';

/**
 * PUBLIC_INTERFACE
 * App is the root component configuring routes and global layout.
 * Routes:
 * - /login (public)
 * - /signup (public)
 * - / (protected home)
 */
function App() {
  return (
    <div className="AppShell">
      <Router>
        <Header />
        <main className="MainContent">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
