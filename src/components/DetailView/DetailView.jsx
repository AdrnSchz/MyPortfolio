import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import projects from "../../data/projects.json";
import experience from "../../data/experience.json";
import { Schematic } from "../Schematic/Schematic";
import { PartsList } from "../PartsList/PartsList";
import { dateRange } from "../../utils/dates";
import "./DetailView.css";

function bulletsFor(flagship) {
    const job = experience.find((j) => j.id === flagship.experience.job);
    const source = flagship.experience.project
        ? job.projects.find((p) => p.id === flagship.experience.project)
        : job;
    return flagship.bulletIdx.map((i) => source.bullets[i]);
}

// One flagship system drawn as a detail view: schematic + parts list + facts.
// `layout` alternates per view so no two views share a composition.
export function DetailView({ flagship, layout = "left", headingLevel = 3, standalone = false }) {
    const [activeItem, setActiveItem] = useState(null);
    const project = projects[flagship.projectIndex];
    const bullets = bulletsFor(flagship);
    const period = dateRange(flagship.period.start, flagship.period.end, !flagship.period.end);
    const Heading = `h${headingLevel}`;

    return (
        <article className={`detail-view detail-view--${layout}`} aria-labelledby={`dv-${flagship.key}`}>
            <div className="detail-view__body">
                <div className="detail-view__drawing">
                    <div className="detail-view__pan">
                    <Schematic
                        schematic={flagship.schematic}
                        title={flagship.name}
                        activeItem={activeItem}
                        onItem={setActiveItem}
                    />
                    </div>
                    <p className="detail-view__caption mono">
                        <span>Detail {flagship.key}</span>
                        <span>{flagship.caption}</span>
                        <span>Not to scale</span>
                    </p>
                    <PartsList parts={flagship.parts} activeItem={activeItem} onItem={setActiveItem} />
                </div>

                <div className="detail-view__text">
                    {!standalone && (
                        <Heading id={`dv-${flagship.key}`} className="detail-view__name">
                            <Link to={`/projects/${flagship.projectIndex}`}>{flagship.name}</Link>
                        </Heading>
                    )}
                    {standalone && <span id={`dv-${flagship.key}`} className="visually-hidden">{flagship.name}</span>}

                    <dl className="detail-view__meta mono">
                        <div>
                            <dt>Client</dt>
                            <dd>{flagship.client}</dd>
                        </div>
                        {flagship.employer && (
                            <div>
                                <dt>Employer</dt>
                                <dd>{flagship.employer}</dd>
                            </div>
                        )}
                        {!standalone && (
                            <div>
                                <dt>Role</dt>
                                <dd>{project.role}</dd>
                            </div>
                        )}
                        <div>
                            <dt>Period</dt>
                            <dd>
                                {period}
                                {!flagship.period.end && <span className="rev-mark">Current</span>}
                            </dd>
                        </div>
                    </dl>

                    {!standalone && <p className="detail-view__tagline">{project.tagline}</p>}

                    <ul className="detail-view__bullets">
                        {bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>

                    {!standalone && (
                        <div className="detail-view__links">
                            <Link to={`/projects/${flagship.projectIndex}`} className="btn">
                                Open project sheet <FaArrowRight aria-hidden="true" />
                            </Link>
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--plain">
                                    <FaExternalLinkAlt aria-hidden="true" /> Live site
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--plain">
                                    <FaGithub aria-hidden="true" /> Code
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
