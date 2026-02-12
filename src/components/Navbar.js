import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">Altronedge Technologies Pvt. Ltd.</div>

      <ul className="nav-menu">

        <li><Link to="/">Home</Link></li>

        {/* STUDENTS DROPDOWN */}
        <li className="dropdown">
          <span className="dropbtn">Students</span>
          <ul className="dropdown-menu">
            <li><Link to="/students">Student List</Link></li>
            <li><Link to="/add-student">Add Student</Link></li>
          </ul>
        </li>

        {/* TEACHERS DROPDOWN */}
        <li className="dropdown">
          <span className="dropbtn">Teachers</span>
          <ul className="dropdown-menu">
            <li><Link to="/teachers">Teacher List</Link></li>
            <li><Link to="/add-teacher">Add Teacher</Link></li>
          </ul>
        </li>

        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;