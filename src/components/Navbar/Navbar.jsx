import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import "./Navbar.css";

const CV_URL = "/assets/cv/CV.pdf";

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
        <Link to="/experience" className="navbar-link">Experience</Link>
        <a
          href={CV_URL}
          download
          className="navbar-cv-btn"
          aria-label="Download CV"
        >
          <FaDownload aria-hidden="true" />
          <span>CV</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
