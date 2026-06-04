import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";
import "./Contact.css";

const EMAIL = "adrisanlop03@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/adrianjorgesanchez";
const GITHUB_URL = "https://github.com/AdrnSchz";

export function Contact() {
    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch {
            // ignore
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="contact__inner">
                <h2 className="contact__heading">Get in Touch</h2>
                <p className="contact__sub">
                    Open to opportunities, collaborations, and conversations. Drop me a line.
                </p>

                <div className="contact__links">
                    <button
                        type="button"
                        className="contact__link contact__link--email"
                        onClick={copyEmail}
                        aria-label={emailCopied ? "Email copied" : "Copy email to clipboard"}
                    >
                        <span className="contact__link-icon">
                            {emailCopied ? <FaCheck /> : <FaEnvelope />}
                        </span>
                        <span className="contact__link-meta">
                            <span className="contact__link-label">Email</span>
                            <span className="contact__link-value">
                                {emailCopied ? "Copied!" : EMAIL}
                            </span>
                        </span>
                        <span className="contact__link-action" aria-hidden="true">
                            {emailCopied ? <FaCheck /> : <FaCopy />}
                        </span>
                    </button>

                    <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact__link"
                    >
                        <span className="contact__link-icon"><FaLinkedin /></span>
                        <span className="contact__link-meta">
                            <span className="contact__link-label">LinkedIn</span>
                            <span className="contact__link-value">adrianjorgesanchez</span>
                        </span>
                        <span className="contact__link-action" aria-hidden="true">↗</span>
                    </a>

                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact__link"
                    >
                        <span className="contact__link-icon"><FaGithub /></span>
                        <span className="contact__link-meta">
                            <span className="contact__link-label">GitHub</span>
                            <span className="contact__link-value">AdrnSchz</span>
                        </span>
                        <span className="contact__link-action" aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
