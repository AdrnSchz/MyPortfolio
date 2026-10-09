import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt, FaPlus, FaMinus } from "react-icons/fa";
import experience from "../../data/experience.json";
import { dateRange, duration } from "../../utils/dates";
import "./Experience.css";

const REV_LETTERS = "ABCDEFGHIJ";

const LANGUAGES = [
    { lang: "Spanish", level: "Native" },
    { lang: "Catalan", level: "Native" },
    { lang: "English", level: "C1 Advanced" },
    { lang: "French", level: "A2 Elementary" },
];

function SubProject({ project }) {
    const [open, setOpen] = useState(false);
    const bodyId = `sub-${project.id}`;
    return (
        <div className={`exp-sub${open ? " exp-sub--open" : ""}`}>
            <button
                className="exp-sub__toggle"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={bodyId}
            >
                <span className="exp-sub__icon" aria-hidden="true">{open ? <FaMinus /> : <FaPlus />}</span>
                <span className="exp-sub__name">{project.name}</span>
            </button>
            {open && (
                <div className="exp-sub__body" id={bodyId}>
                    <p className="exp-sub__desc">{project.description}</p>
                    <ul className="exp-bullets">
                        {project.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                    <ul className="stack">
                        {project.skills.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

function Revision({ job, rev }) {
    const range = dateRange(job.startDate, job.endDate, job.current);
    const dur = duration(job.startDate, job.endDate, job.current);

    return (
        <li className={`exp-rev${job.current ? " exp-rev--current" : ""}`}>
            <div className="exp-rev__date mono">
                <span className="exp-rev__range">{range}</span>
                <span className="exp-rev__dur">{dur}</span>
            </div>

            <span className="exp-rev__marker mono" aria-hidden="true">{rev}</span>

            <div className="exp-rev__body">
                <header className="exp-rev__header">
                    <h2 className="exp-rev__role">
                        {job.role}
                        {job.current && <span className="rev-mark">Current</span>}
                    </h2>
                    <p className="exp-rev__company">{job.company}</p>
                    <p className="exp-rev__info mono">
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                    </p>
                </header>

                <p className="exp-rev__desc">{job.description}</p>

                {job.bullets?.length > 0 && (
                    <ul className="exp-bullets">
                        {job.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                )}

                {job.projects?.length > 0 && (
                    <div className="exp-subs">
                        <h3 className="exp-subs__heading mono">Project Groups</h3>
                        {job.projects.map((p) => (
                            <SubProject key={p.id} project={p} />
                        ))}
                    </div>
                )}

                <div className="exp-rev__footer">
                    <ul className="stack">
                        {job.skills.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                    {job.projectRef != null && (
                        <Link to={`/projects/${job.projectRef}`} className="btn">
                            View Project <FaArrowRight aria-hidden="true" />
                        </Link>
                    )}
                    {job.liveUrl && job.projectRef == null && (
                        <a href={job.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">
                            Live Demo <FaExternalLinkAlt aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>
        </li>
    );
}

export function Experience() {
    return (
        <div className="experience-page">
            <header className="experience-page__hero">
                <h1 className="experience-page__title">Work Experience</h1>
                <p className="experience-page__subtitle">
                    My professional journey — from research projects to enterprise banking systems.
                </p>
            </header>

            <ol className="exp-revs">
                {experience.map((job, i) => (
                    <Revision key={job.id} job={job} rev={REV_LETTERS[experience.length - 1 - i]} />
                ))}
            </ol>

            {/* Education, certifications, languages */}
            <section className="exp-notes" aria-label="Education, certifications and languages">

                <div className="exp-notes__grid">
                    <div className="exp-note exp-note--wide">
                        <h2 id="edu-heading" className="exp-note__label mono">Education</h2>
                        <h3 className="exp-note__title">Bachelor in International Computer Engineering</h3>
                        <p className="exp-note__meta mono">
                            <span>La Salle Ramon Llull · Barcelona, Spain</span>
                            <span>Bachelor&apos;s Degree</span>
                            <span>Sep 2021 – Jul 2025</span>
                        </p>
                        <p className="exp-note__text">
                            Four-year engineering degree with a focus on software engineering, computer architecture,
                            and systems programming. Developed strong foundations in algorithms, data structures,
                            operating systems, compilers, networks, databases, and software design.
                        </p>
                    </div>

                    <div className="exp-note">
                        <h2 className="exp-note__label mono">Certifications</h2>
                        <h3 className="exp-note__title">Microsoft Azure Fundamentals</h3>
                        <p className="exp-note__meta mono"><span>Microsoft · AZ-900</span></p>
                    </div>

                    <div className="exp-note">
                        <h2 className="exp-note__label mono">Languages</h2>
                        <table className="exp-langs">
                            <tbody>
                                {LANGUAGES.map(({ lang, level }) => (
                                    <tr key={lang}>
                                        <th scope="row">{lang}</th>
                                        <td className="mono">{level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
