import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projects from "../../data/projects.json";
import { SkillLabel } from "../../components/SkillLabel/SkillLabel";
import "./ProjectDetail.css";

const TYPE_COLORS = {
    Academic: "#4a9eff",
    Personal: "#a855f7",
    Professional: "#22c55e",
};

export function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    const project = projects[parseInt(id, 10)];

    if (!project) {
        return (
            <div className="project-detail project-detail--not-found">
                <p>Project not found.</p>
                <button className="project-detail__back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>
        );
    }

    const {
        title, tagline, description, year, type, role, teamSize, status,
        github, liveUrl, report, media, skills = [],
    } = project;

    const isVideo = media?.type === "video";
    const isImages = media?.type === "images";
    const images = media?.urls ?? [];
    const hasMedia = isVideo || (isImages && images.length > 0);

    const prevImage = () => setCurrentImage((p) => (p - 1 + images.length) % images.length);
    const nextImage = () => setCurrentImage((p) => (p + 1) % images.length);

    const typeColor = TYPE_COLORS[type] ?? "#888";

    return (
        <div className="project-detail">
            {/* ── Header ── */}
            <div className="project-detail__header">
                <button className="project-detail__back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className="project-detail__header-meta">
                    <div className="project-detail__badges">
                        {type && (
                            <span
                                className="project-detail__badge"
                                style={{ background: `${typeColor}22`, color: typeColor, borderColor: `${typeColor}55` }}
                            >
                                {type}
                            </span>
                        )}
                        {status && (
                            <span className={`project-detail__badge project-detail__badge--status${status === "Completed" ? " project-detail__badge--done" : ""}`}>
                                {status === "Completed" ? "✓ " : "⏳ "}{status}
                            </span>
                        )}
                        {year && <span className="project-detail__badge project-detail__badge--year">{year}</span>}
                    </div>
                    <h1 className="project-detail__title">{title}</h1>
                    {tagline && <p className="project-detail__tagline">{tagline}</p>}
                </div>
            </div>

            {/* ── Action links ── */}
            {(github || liveUrl || report) && (
                <div className="project-detail__actions">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--github">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--live">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            Live Demo
                        </a>
                    )}
                    {report && (
                        <a href={report} download className="pd-action-btn pd-action-btn--report">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                            Download Report
                        </a>
                    )}
                </div>
            )}

            {/* ── Main content ── */}
            <div className={`project-detail__content${!hasMedia ? " project-detail__content--no-media" : ""}`}>

                {/* Media column */}
                {hasMedia && (
                    <div className="project-detail__media">
                        {isVideo ? (
                            <video className="project-detail__video" controls>
                                <source src={media.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : isImages && images.length > 0 ? (
                            <div className="project-detail__image-slider">
                                {images.length > 1 && (
                                    <button className="pd-arrow pd-arrow--left" onClick={prevImage}>&#8249;</button>
                                )}
                                <img
                                    src={images[currentImage]}
                                    alt={`${title} screenshot ${currentImage + 1}`}
                                    className="project-detail__image"
                                />
                                {images.length > 1 && (
                                    <button className="pd-arrow pd-arrow--right" onClick={nextImage}>&#8250;</button>
                                )}
                                {images.length > 1 && (
                                    <div className="project-detail__dots">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                className={`pd-dot${i === currentImage ? " pd-dot--active" : ""}`}
                                                onClick={() => setCurrentImage(i)}
                                                aria-label={`Image ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Info column */}
                <div className="project-detail__info">
                    {/* Quick facts */}
                    <div className="project-detail__facts">
                        {role && (
                            <div className="pd-fact">
                                <span className="pd-fact__label">Role</span>
                                <span className="pd-fact__value">{role}</span>
                            </div>
                        )}
                        {teamSize != null && (
                            <div className="pd-fact">
                                <span className="pd-fact__label">Team</span>
                                <span className="pd-fact__value">
                                    {teamSize === 1 ? "Solo project" : `${teamSize} people`}
                                </span>
                            </div>
                        )}
                        {year && (
                            <div className="pd-fact">
                                <span className="pd-fact__label">Year</span>
                                <span className="pd-fact__value">{year}</span>
                            </div>
                        )}
                    </div>

                    <p className="project-detail__description">{description}</p>

                    <div className="project-detail__skills-section">
                        <h3 className="project-detail__skills-heading">Technologies</h3>
                        <div className="project-detail__skills">
                            {skills.map((skill, i) => (
                                <SkillLabel key={i} text={skill} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
