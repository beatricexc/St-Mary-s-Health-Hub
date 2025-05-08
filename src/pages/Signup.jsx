// src/pages/Signup.jsx
import React, { useContext } from 'react';
import loginBackground from '../assets/login_page.png';
import darkLoginBackground from '../assets/dark_login.png';
import { ThemeContext } from '../context/ThemeProvider';
import SignupForm from '../components/SignupForm/SignupForm';

export default function SignupPage() {
    // Consume dark/light mode for background image swap
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // Pick the correct background based on theme
                backgroundImage: `url(${isDarkMode ? darkLoginBackground : loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
            }}
        >
            {/* The form handles its own redirect to /dashboard */}
            <SignupForm />
        </div>
    );
}
