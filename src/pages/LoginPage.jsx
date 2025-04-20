import React, { useContext } from 'react';
import loginBackground from '../assets/login_page.png';
import darkLoginBackground from '../assets/dark_login.png';
import LoginForm from '../components/LoginForm/LoginForm';
import { ThemeContext } from '../context/ThemeProvider';

function LoginPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const handleLogin = () => {
    console.log()
    window.location.href = '/dashboard'
  }

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${isDarkMode ? darkLoginBackground : loginBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow:'hidden',
    }}>
      <LoginForm onLogin={() => {
        handleLogin()
      }} />
    </div>
  );
}

export default LoginPage;