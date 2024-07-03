import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setLocalUser(JSON.parse(savedUser));
        }
    }, [user]); // Re-run the effect if the user context changes

    const handleLogout = () => {
        logout();
        setLocalUser(null);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{localUser ? localUser.username : 'Hello!'}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/todo">TODO List</a>
                        </li>
                    </ul>
                    {!localUser ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login" className="btn btn-outline-success">LOGIN</Link>
                            </li>
                        </ul>
                    ) : (
                        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
