import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt, FaPlus, FaMinus } from "react-icons/fa";
import experience from "../../data/experience.json";
import profile from "../../data/profile.json";
import { dateRange, duration } from "../../utils/dates";
import "./Experience.css";

const REV_LETTERS = "ABCDEFGHIJ";

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
                    From EU research platforms to enterprise banking systems, newest first.
                </p>
            </header>

            <ol className="exp-revs">
                {experience.map((job, i) => (
                    <Revision key={job.id} job={job} rev={REV_LETTERS[experience.length - 1 - i]} />
                ))}
            </ol>

            {/* Skills, education, certifications, languages */}
            <section className="exp-notes" aria-label="Skills, education, certifications and languages">
                <div className="exp-notes__grid">
                    <div className="exp-note exp-note--wide">
                        <h2 className="exp-note__label mono">Technical skills</h2>
                        <dl className="exp-skills">
                            {profile.skills.map(({ group, items }) => (
                                <div key={group} className="exp-skills__row">
                                    <dt>{group}</dt>
                                    <dd>
                                        <ul className="stack">
                                            {items.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="exp-note exp-note--wide">
                        <h2 className="exp-note__label mono">Education</h2>
                        <h3 className="exp-note__title">{profile.education.degree}</h3>
                        <p className="exp-note__meta mono">
                            <span>{profile.education.school}</span>
                            <span>{profile.education.location}</span>
                            <span>{profile.education.period}</span>
                        </p>
                        <p className="exp-note__text">{profile.education.description}</p>
                    </div>

                    <div className="exp-note">
                        <h2 className="exp-note__label mono">Certifications</h2>
                        {profile.certifications.map((c) => (
                            <div key={c.name}>
                                <h3 className="exp-note__title">{c.name}</h3>
                                <p className="exp-note__meta mono"><span>{c.issuer}</span></p>
                            </div>
                        ))}
                    </div>

                    <div className="exp-note">
                        <h2 className="exp-note__label mono">Languages</h2>
                        <table className="exp-langs">
                            <tbody>
                                {profile.languages.map(({ lang, level }) => (
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
