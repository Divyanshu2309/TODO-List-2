import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { LandingPage } from './pages/LandingPage';
import Todo from './pages/Todo';
import Navbar from './components/Navbar';

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/signup'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

export default App;
