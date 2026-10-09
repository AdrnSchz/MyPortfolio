import { Link, NavLink, useLocation } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import "./Navbar.css";

const CV_URL = "/assets/cv/CV.pdf";

const SHEETS = [
  { to: "/", label: "Overview", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
];

function sheetNumber(pathname) {
  if (pathname.startsWith("/projects")) return 2;
  if (pathname.startsWith("/experience")) return 3;
  return 1;
}

const Navbar = () => {
  const { pathname } = useLocation();
  const sheet = sheetNumber(pathname);

  return (
    <header className="navbar">
      <Link to="/" className="navbar__name">
        Adrian Sanchez
      </Link>

      <nav className="navbar__sheets" aria-label="Main">
        {SHEETS.map((s) => (
          <NavLink key={s.to} to={s.to} end={s.end} className="navbar__link">
            {s.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__end">
        <span className="navbar__sheet mono" aria-label={`Sheet ${sheet} of ${SHEETS.length}`}>
          SHEET {sheet}/{SHEETS.length}
        </span>
        <a href={CV_URL} download className="btn navbar__cv">
          <FaDownload aria-hidden="true" />
          CV
        </a>
      </div>
    </header>
  );
};

export default Navbar;
