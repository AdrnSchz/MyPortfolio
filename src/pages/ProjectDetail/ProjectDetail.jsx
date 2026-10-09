import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaFileAlt, FaGithub } from "react-icons/fa";
import projects from "../../data/projects.json";
import { FLAGSHIPS } from "../../data/flagships";
import { DetailView } from "../../components/DetailView/DetailView";
import { PartsList } from "../../components/PartsList/PartsList";
import "./ProjectDetail.css";

const sheetNo = (i) => String(i + 1).padStart(2, "0");

function Media({ media, title }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [failed, setFailed] = useState(false);

    const isVideo = media?.type === "video" && media.url;
    const images = media?.type === "images" ? media.urls ?? [] : [];
    if (failed || (!isVideo && images.length === 0)) return null;

    const prevImage = () => setCurrentImage((p) => (p - 1 + images.length) % images.length);
    const nextImage = () => setCurrentImage((p) => (p + 1) % images.length);

    return (
        <figure className="pd-media">
            <figcaption className="pd-media__caption mono">
                <span>View · {isVideo ? "Demo recording" : "Screenshots"}</span>
                {!isVideo && images.length > 1 && (
                    <span>{currentImage + 1} / {images.length}</span>
                )}
            </figcaption>
            <div className="pd-media__frame">
                {isVideo ? (
                    <video className="pd-media__video" controls preload="metadata" onError={() => setFailed(true)}>
                        <source src={media.url} type="video/mp4" onError={() => setFailed(true)} />
                    </video>
                ) : (
                    <img
                        src={images[currentImage]}
                        alt={`${title} screenshot ${currentImage + 1}`}
                        className="pd-media__image"
                        onError={() => setFailed(true)}
                    />
                )}
            </div>
            {!isVideo && images.length > 1 && (
                <div className="pd-media__controls">
                    <button className="btn" onClick={prevImage} aria-label="Previous image"><FaChevronLeft aria-hidden="true" /></button>
                    <button className="btn" onClick={nextImage} aria-label="Next image"><FaChevronRight aria-hidden="true" /></button>
                </div>
            )}
        </figure>
    );
}

export function ProjectDetail() {
    const { id } = useParams();
    const index = parseInt(id, 10);
    const project = projects[index];

    if (!project) {
        return (
            <div className="project-detail project-detail--not-found">
                <h1 className="project-detail__title">Project not found.</h1>
                <p className="project-detail__tagline">There is no project with this number in the register.</p>
                <Link to="/projects" className="btn">
                    <FaArrowLeft aria-hidden="true" /> Back to all projects
                </Link>
            </div>
        );
    }

    const {
        title, tagline, description, year, type, role, teamSize, status,
        github, liveUrl, report, media, skills = [],
    } = project;

    const flagship = FLAGSHIPS.find((f) => f.projectIndex === index);
    const prev = index > 0 ? index - 1 : null;
    const next = index < projects.length - 1 ? index + 1 : null;

    return (
        <article className="project-detail">
            <Link to="/projects" className="project-detail__back">
                <FaArrowLeft aria-hidden="true" /> All projects
            </Link>

            {/* ── Header: title + title block ── */}
            <header className="project-detail__header">
                <div className="project-detail__heading">
                    <h1 className="project-detail__title">{title}</h1>
                    {tagline && <p className="project-detail__tagline">{tagline}</p>}

                    {(github || liveUrl || report) && (
                        <div className="project-detail__actions">
                            {liveUrl && (
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                                    <FaExternalLinkAlt aria-hidden="true" /> Live site
                                </a>
                            )}
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="btn">
                                    <FaGithub aria-hidden="true" /> GitHub
                                </a>
                            )}
                            {report && (
                                <a href={report} download className="btn">
                                    <FaFileAlt aria-hidden="true" /> Download Report
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <dl className="pd-facts">
                    <div>
                        <dt>Project</dt>
                        <dd className="mono">No. {sheetNo(index)} of {String(projects.length).padStart(2, "0")}</dd>
                    </div>
                    {year && (
                        <div>
                            <dt>Year</dt>
                            <dd className="mono">{year}</dd>
                        </div>
                    )}
                    {type && (
                        <div>
                            <dt>Type</dt>
                            <dd>{type}</dd>
                        </div>
                    )}
                    {status && (
                        <div>
                            <dt>Status</dt>
                            <dd>{status === "Completed" ? status : <span className="rev-mark">{status}</span>}</dd>
                        </div>
                    )}
                    {teamSize != null && (
                        <div>
                            <dt>Team</dt>
                            <dd>{teamSize === 1 ? "Solo project" : `${teamSize} people`}</dd>
                        </div>
                    )}
                    {role && (
                        <div className="pd-facts__wide">
                            <dt>Role</dt>
                            <dd>{role}</dd>
                        </div>
                    )}
                </dl>
            </header>

            {/* ── Flagship systems carry their drawn view ── */}
            {flagship && (
                <section className="project-detail__view" aria-label="Architecture">
                    <DetailView flagship={flagship} layout="left" standalone />
                </section>
            )}

            {/* ── Description, media and parts ── */}
            <section className="project-detail__body">
                <div className="project-detail__description">
                    <h2 className="project-detail__section-title mono">Description</h2>
                    <p>{description}</p>
                </div>

                <div className="project-detail__side">
                    <Media key={index} media={media} title={title} />
                    {!flagship && skills.length > 0 && (
                        <PartsList parts={skills} caption="Technologies" />
                    )}
                </div>
            </section>

            {/* ── Sheet navigation ── */}
            <nav className="pd-pager" aria-label="Other projects">
                {prev != null ? (
                    <Link to={`/projects/${prev}`} className="pd-pager__link">
                        <span className="pd-pager__dir mono"><FaArrowLeft aria-hidden="true" /> Previous · No. {sheetNo(prev)}</span>
                        <span className="pd-pager__title">{projects[prev].title}</span>
                    </Link>
                ) : <span />}
                {next != null && (
                    <Link to={`/projects/${next}`} className="pd-pager__link pd-pager__link--next">
                        <span className="pd-pager__dir mono">Next · No. {sheetNo(next)} <FaArrowRight aria-hidden="true" /></span>
                        <span className="pd-pager__title">{projects[next].title}</span>
                    </Link>
                )}
            </nav>
        </article>
    );
}
