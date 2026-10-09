import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "../../data/contact";
import "./Contact.css";

export function Contact() {
    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch {
            // Clipboard unavailable: the mailto link next to it still works
        }
    };

    return (
        <section className="contact" id="contact" aria-labelledby="contact-heading">
            <div className="contact__inner">
                <h2 id="contact-heading" className="contact__heading">Get in Touch</h2>

                <ul className="contact__rows">
                    <li className="contact__row">
                        <span className="contact__icon" aria-hidden="true"><FaEnvelope /></span>
                        <span className="contact__label">Email</span>
                        <a className="contact__value" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        <button
                            type="button"
                            className="contact__action"
                            onClick={copyEmail}
                            aria-label={emailCopied ? "Email copied" : "Copy email to clipboard"}
                        >
                            {emailCopied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
                            <span>{emailCopied ? "Copied" : "Copy"}</span>
                        </button>
                    </li>
                    <li className="contact__row">
                        <span className="contact__icon" aria-hidden="true"><FaLinkedin /></span>
                        <span className="contact__label">LinkedIn</span>
                        <a className="contact__value" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                            adrianjorgesanchez
                        </a>
                        <FaExternalLinkAlt className="contact__ext" aria-hidden="true" />
                    </li>
                    <li className="contact__row">
                        <span className="contact__icon" aria-hidden="true"><FaGithub /></span>
                        <span className="contact__label">GitHub</span>
                        <a className="contact__value" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                            AdrnSchz
                        </a>
                        <FaExternalLinkAlt className="contact__ext" aria-hidden="true" />
                    </li>
                </ul>
            </div>
        </section>
    );
}
