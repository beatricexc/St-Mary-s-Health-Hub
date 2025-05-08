// src/components/SignupForm/api.js

const STORAGE_KEY = 'health_db';

/**
 * mockUserRegistration
 * Saves { username, password } into localStorage under STORAGE_KEY,
 * and returns the newly registered user object.
 *
 * @param {string} username
 * @param {string} password
 * @returns {{ username: string, password: string }}
 */
export const mockUserRegistration = (username, password) => {
    // Build the new user record
    const newUser = { username, password };

    // Read existing DB (if any)
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        // First registration → create new array
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newUser]));
    } else {
        // Append to existing array
        const oldDb = JSON.parse(raw);
        const newDb = [...oldDb, newUser];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newDb));
    }

    // Return the new user so callers can inspect/log it
    return newUser;
};
