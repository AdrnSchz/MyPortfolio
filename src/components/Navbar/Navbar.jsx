import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Section: Title */}
      <Link to="/" className="navbar-title">
          Adrian Sanchez
        </Link>
      {/* Right Section: Navigation Links */}
      <div className="navbar-links">
        <Link to="/projects" className="navbar-link">Projects</Link>    
      </div>
    </nav>
  );
};

export default Navbar;