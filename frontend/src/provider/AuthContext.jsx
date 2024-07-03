import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // State to store user details
    const [error, setError] = useState(null); // State to store any error messages
    const [message, setMessage] = useState(null);

    const login = async (email, password) => {
        if (!email || !password) {
            setMessage("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch('http://localhost:5005/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                setUser(data.user); // Set user state here
                console.log("User set in login:", data.user);
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };



    return (
        <AuthContext.Provider value={{ user, login, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
