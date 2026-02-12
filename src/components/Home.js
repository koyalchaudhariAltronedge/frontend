import React from "react";
import "./Home.css";
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to AltronEdge College Portal</h1>
        <p>Your Future Starts Here</p>
        <button className="hero-btn">Get Started</button>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <Link to="/students" className="feature-card">📘 Manage Students</Link>
        <Link to="/teachers" className="feature-card">👨‍🏫 Manage Teachers</Link>
        <Link to="/courses" className="feature-card">📚 Manage Courses</Link>
        <Link to="/reports" className="feature-card">📊 View Reports</Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 AltronEdge Pvt. Ltd. | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;