// src/pages/LoginPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/login_page.png';
import darkLoginBackground from '../assets/dark_login.png';
import LoginForm from '../components/LoginForm/LoginForm';
import { ThemeContext } from '../context/ThemeProvider';
import { AuthContext } from '../context/AuthProvider';

export default function LoginPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Called by the LoginForm once credentials are verified.
   * @param {{ username: string }} user 
   */
  const handleLogin = (user) => {
    login(user);           // set auth state & persist in localStorage
    navigate('/dashboard'); // navigate into the protected area
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${isDarkMode ? darkLoginBackground : loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* Pass down the onLogin callback */}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
