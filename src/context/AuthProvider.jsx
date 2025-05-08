import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * AuthProvider
 * -Reads/writes `current_user` in localStorage
 * -Exposes isAuthenticated, login(user), logout()
 */
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // On mount, see if there’s a current_user saved
    useEffect(() => {
        const raw = localStorage.getItem('current_user');
        setIsAuthenticated(!!raw);
    }, []);

    // Save user to localStorage & mark as logged in
    const login = (user) => {
        localStorage.setItem('current_user', JSON.stringify(user));
        setIsAuthenticated(true);
    };

    // Remove user & mark as logged out
    const logout = () => {
        localStorage.removeItem('current_user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
