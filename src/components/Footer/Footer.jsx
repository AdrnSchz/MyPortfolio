import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export function Footer() {
    return(
        <footer>
            <p>&copy; {new Date().getFullYear()} Adrian Sanchez. All rights reserved.</p>
            <div className="footer-icons">
                <a href="https://github.com/AdrnSchz" target="_blank" rel="noopener noreferrer">
                <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/adrianjorgesanchez" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
                </a>
                <a href="mailto:adrisanlop03@gmail.com">
                <FaEnvelope />
                </a>
            </div>
        </footer>
    );
}