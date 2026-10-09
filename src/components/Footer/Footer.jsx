import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "../../data/contact";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copy">&copy; {new Date().getFullYear()} Adrian Sanchez. All rights reserved.</p>
            <ul className="footer__links">
                <li>
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href={`mailto:${EMAIL}`} aria-label="Email">
                        <FaEnvelope aria-hidden="true" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
