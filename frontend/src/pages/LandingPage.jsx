import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <div className="container">
        <header className="jumbotron mt-4 text-center">
          <h1 className="display-4">Welcome to Our TODO List App</h1>
          <p className="lead">Organize your tasks efficiently and stay productive!</p>
          {user ? (
            <Link to="/todo" className="btn btn-primary btn-lg">Get Started</Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
          )}
        </header>
        <section className="row mt-4">
          <div className="col-md-6">
            <img src={`${process.env.PUBLIC_URL}/1_DaM1d3N05VwjZmk-xFJy4w.jpg`} alt="TODO List" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>What is a TODO List?</h2>
            <p>A TODO list is a simple tool that helps you keep track of tasks you need to complete. It allows you to prioritize your tasks, set deadlines, and check off items as you complete them.</p>
            <h2>Features</h2>
            <ul>
              <li>Simple and intuitive interface</li>
              <li>Task prioritization</li>
              <li>Progress tracking</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Increased productivity</li>
              <li>Better task management</li>
              <li>Reduced stress</li>
              <li>Improved focus</li>
              <li>Enhanced time management</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
