import { useState } from "react";
import { Link } from "react-router-dom";
import experience from "../../data/experience.json";
import { SkillLabel } from "../../components/SkillLabel/SkillLabel";
import "./Experience.css";

const TYPE_COLORS = {
    "Full-time": { bg: "#22c55e22", color: "#22c55e", border: "#22c55e55" },
    "EU Research Project": { bg: "#4a9eff22", color: "#4a9eff", border: "#4a9eff55" },
    "Part-time": { bg: "#a855f722", color: "#a855f7", border: "#a855f755" },
    "Contract": { bg: "#ff660022", color: "#ff6600", border: "#ff660055" },
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function dateRange(startDate, endDate, current) {
    const start = formatDate(startDate);
    const end = current ? "Present" : formatDate(endDate);
    return `${start} – ${end}`;
}

function duration(startDate, endDate, current) {
    const [sy, sm] = startDate.split("-").map(Number);
    const now = new Date();
    const [ey, em] = current
        ? [now.getFullYear(), now.getMonth() + 1]
        : endDate.split("-").map(Number);
    const months = (ey - sy) * 12 + (em - sm);
    if (months < 1) return "< 1 month";
    if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years} yr ${rem} mo` : `${years} yr${years > 1 ? "s" : ""}`;
}

function SubProject({ project }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`exp-subproject${open ? " exp-subproject--open" : ""}`}>
            <button
                className="exp-subproject__toggle"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className="exp-subproject__toggle-icon">{open ? "▾" : "▸"}</span>
                <span className="exp-subproject__name">{project.name}</span>
            </button>
            {open && (
                <div className="exp-subproject__body">
                    <p className="exp-subproject__desc">{project.description}</p>
                    <ul className="exp-bullets">
                        {project.bullets.map((b, i) => (
                            <li key={i} className="exp-bullet">{b}</li>
                        ))}
                    </ul>
                    <div className="exp-skills">
                        {project.skills.map((s, i) => (
                            <SkillLabel key={i} text={s} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ExperienceCard({ job, isLast }) {
    const typeStyle = TYPE_COLORS[job.type] ?? TYPE_COLORS["Contract"];
    const range = dateRange(job.startDate, job.endDate, job.current);
    const dur = duration(job.startDate, job.endDate, job.current);

    return (
        <div className={`exp-item${isLast ? " exp-item--last" : ""}`}>
            {/* Timeline dot */}
            <div className="exp-timeline">
                <div className={`exp-dot${job.current ? " exp-dot--active" : ""}`} />
                {!isLast && <div className="exp-line" />}
            </div>

            {/* Card */}
            <div className="exp-card">
                {/* Card header */}
                <div className="exp-card__header">
                    <div className="exp-card__meta">
                        <div className="exp-card__title-row">
                            <h3 className="exp-card__role">{job.role}</h3>
                            {job.current && (
                                <span className="exp-card__current-badge">Current</span>
                            )}
                        </div>
                        <span className="exp-card__company">{job.company}</span>
                        <div className="exp-card__info-row">
                            <span
                                className="exp-card__type-pill"
                                style={{
                                    background: typeStyle.bg,
                                    color: typeStyle.color,
                                    borderColor: typeStyle.border,
                                }}
                            >
                                {job.type}
                            </span>
                            <span className="exp-card__dates">{range}</span>
                            <span className="exp-card__duration">({dur})</span>
                            <span className="exp-card__location">📍 {job.location}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="exp-card__desc">{job.description}</p>

                {/* Top-level bullets */}
                {job.bullets && job.bullets.length > 0 && (
                    <ul className="exp-bullets">
                        {job.bullets.map((b, i) => (
                            <li key={i} className="exp-bullet">{b}</li>
                        ))}
                    </ul>
                )}

                {/* Sub-projects accordion (Fujitsu) */}
                {job.projects && job.projects.length > 0 && (
                    <div className="exp-subprojects">
                        <h4 className="exp-subprojects__heading">Project Groups</h4>
                        {job.projects.map((p) => (
                            <SubProject key={p.id} project={p} />
                        ))}
                    </div>
                )}

                {/* Top-level skills */}
                <div className="exp-card__footer">
                    <div className="exp-skills">
                        {job.skills.map((s, i) => (
                            <SkillLabel key={i} text={s} />
                        ))}
                    </div>
                    {/* Link to project detail if applicable */}
                    {job.projectRef != null && (
                        <Link
                            to={`/projects/${job.projectRef}`}
                            className="exp-card__project-link"
                        >
                            View Project →
                        </Link>
                    )}
                    {job.liveUrl && !job.projectRef && (
                        <a
                            href={job.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exp-card__project-link"
                        >
                            Live Demo ↗
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Experience() {
    return (
        <div className="experience-page">
            <div className="experience-page__hero">
                <h1 className="experience-page__title">Work Experience</h1>
                <p className="experience-page__subtitle">
                    My professional journey — from research projects to enterprise banking systems.
                </p>
            </div>

            <div className="experience-page__timeline">
                {experience.map((job, i) => (
                    <ExperienceCard
                        key={job.id}
                        job={job}
                        isLast={i === experience.length - 1}
                    />
                ))}
            </div>

            {/* Education callout */}
            <div className="experience-page__education">
                <h2 className="experience-page__section-title">Education</h2>
                <div className="exp-card exp-card--education">
                    <div className="exp-card__header">
                        <div className="exp-card__meta">
                            <div className="exp-card__title-row">
                                <h3 className="exp-card__role">Bachelor in International Computer Engineering</h3>
                            </div>
                            <span className="exp-card__company">La Salle Ramon Llull · Barcelona, Spain</span>
                            <div className="exp-card__info-row">
                                <span
                                    className="exp-card__type-pill"
                                    style={{ background: "#4a9eff22", color: "#4a9eff", borderColor: "#4a9eff55" }}
                                >
                                    Bachelor's Degree
                                </span>
                                <span className="exp-card__dates">Sep 2021 – Jul 2025</span>
                            </div>
                        </div>
                    </div>
                    <p className="exp-card__desc">
                        Four-year engineering degree with a focus on software engineering, computer architecture,
                        and systems programming. Developed strong foundations in algorithms, data structures,
                        operating systems, compilers, networks, databases, and software design.
                    </p>
                </div>
            </div>

            {/* Certifications & Languages */}
            <div className="experience-page__extra">
                <div className="exp-extra-card">
                    <h3 className="exp-extra-card__title">Certifications</h3>
                    <div className="exp-extra-card__items">
                        <div className="exp-cert-item">
                            <span className="exp-cert-item__icon">🏆</span>
                            <div>
                                <span className="exp-cert-item__name">Microsoft Azure Fundamentals</span>
                                <span className="exp-cert-item__issuer">Microsoft · AZ-900</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="exp-extra-card">
                    <h3 className="exp-extra-card__title">Languages</h3>
                    <div className="exp-extra-card__items">
                        {[
                            { lang: "Spanish", level: "Native", flag: "ES" },
                            { lang: "Catalan", level: "Native", flag: "CA" },
                            { lang: "English", level: "C1 Advanced", flag: "EN" },
                            { lang: "French", level: "A2 Elementary", flag: "FR" },
                        ].map(({ lang, level, flag }) => (
                            <div key={lang} className="exp-lang-item">
                                <span className="exp-lang-item__flag">{flag}</span>
                                <span className="exp-lang-item__name">{lang}</span>
                                <span className="exp-lang-item__level">{level}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
