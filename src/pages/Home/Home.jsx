import { Link } from "react-router-dom";
import { FaDownload, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { DetailView } from "../../components/DetailView/DetailView";
import { Contact } from "../../components/Contact/Contact";
import { FLAGSHIPS } from "../../data/flagships";
import { EMAIL, LINKEDIN_URL, GITHUB_URL, CV_URL } from "../../data/contact";
import projects from "../../data/projects.json";
import experience from "../../data/experience.json";
import { dateRange } from "../../utils/dates";
import "./Home.css";

const LAYOUTS = ["left", "right"];
const FLAGSHIP_INDICES = new Set(FLAGSHIPS.map((f) => f.projectIndex));
// Systems-level work first: HAL 9000, Z compiler, STM32 controller, then the rest
const BACKEND_ORDER = [4, 6, 5, 2, 3, 1];
const rank = (i) => {
    const r = BACKEND_ORDER.indexOf(i);
    return r === -1 ? BACKEND_ORDER.length : r;
};
const OTHER_PROJECTS = projects
    .map((p, i) => ({ ...p, _idx: i }))
    .filter((p) => !FLAGSHIP_INDICES.has(p._idx))
    .sort((a, b) => rank(a._idx) - rank(b._idx));
const REV_LETTERS = "ABCDEFGHIJ";

export function Home() {
    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="home">
            {/* ── Drawing title ── */}
            <section className="home-title" aria-labelledby="home-name">
                <div className="home-title__main">
                    <h1 id="home-name" className="home-title__name">
                        Adrian Sanchez
                        <span className="home-title__role">Software Engineer</span>
                    </h1>

                    <p className="home-title__intro">
                        Based in Barcelona. At Fujitsu since November 2024, building and maintaining
                        banking systems in C/C++ and Java for two major Spanish banks.
                    </p>

                    <div className="home-title__notes">
                        <h2 className="home-title__notes-heading mono">Notes</h2>
                        <ol>
                            <li>
                                Professional experience across banking-grade systems, full-stack web platforms
                                and low-level embedded software: ATM middleware in C/C++ for CaixaBank, financial
                                monitoring in Java/Spring Boot for Banco Sabadell, and an EU research platform
                                built end to end as sole developer.
                            </li>
                            <li>
                                Focused on the backend, from low-level system internals to distributed
                                web services. I like solving complex problems with clean, well-structured
                                code, with reliability and performance as first concerns.
                            </li>
                        </ol>
                    </div>

                    <div className="home-title__ctas">
                        <Link to="/projects" className="btn btn--solid">
                            View Projects <FaArrowRight aria-hidden="true" />
                        </Link>
                        <a href={CV_URL} download className="btn">
                            <FaDownload aria-hidden="true" /> Download CV
                        </a>
                        <button type="button" className="btn btn--plain" onClick={scrollToContact}>
                            <FaEnvelope aria-hidden="true" /> Get in Touch
                        </button>
                    </div>
                </div>

                <aside className="title-block" aria-label="Summary">
                    <dl>
                        <div className="title-block__cell title-block__cell--wide">
                            <dt>Current position</dt>
                            <dd>
                                Software Engineer, Fujitsu
                                <span className="rev-mark">Current</span>
                            </dd>
                        </div>
                        <div className="title-block__cell">
                            <dt>Location</dt>
                            <dd>Barcelona, Spain</dd>
                        </div>
                        <div className="title-block__cell title-block__cell--end">
                            <dt>Core stack</dt>
                            <dd>C/C++ · Java/Spring Boot</dd>
                        </div>
                        <div className="title-block__cell title-block__cell--wide">
                            <dt>Systems on this sheet</dt>
                            <dd>
                                <ul className="title-block__views">
                                    {FLAGSHIPS.map((f) => (
                                        <li key={f.key}>
                                            <a href={`#view-${f.key}`}>
                                                <span className="title-block__view-key mono">{f.key}</span>
                                                {f.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                        <div className="title-block__cell title-block__cell--wide">
                            <dt>Contact</dt>
                            <dd className="title-block__contact">
                                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                                <span>
                                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    {" · "}
                                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
                                </span>
                            </dd>
                        </div>
                        <div className="title-block__cell title-block__cell--sheet mono">
                            <dt>Sheet</dt>
                            <dd>1 of 3</dd>
                        </div>
                        <div className="title-block__cell title-block__cell--sheet title-block__cell--end mono">
                            <dt>Rev</dt>
                            <dd>{new Date().getFullYear()}</dd>
                        </div>
                    </dl>
                </aside>
            </section>

            {/* ── Detail views: flagship systems ── */}
            <section className="home-views" aria-label="Selected systems">
                {FLAGSHIPS.map((f, i) => (
                    <div key={f.key} id={`view-${f.key}`} className="home-views__item">
                        <DetailView flagship={f} layout={LAYOUTS[i % LAYOUTS.length]} headingLevel={2} />
                    </div>
                ))}
            </section>

            {/* ── Revision history: experience ── */}
            <section className="home-revisions" aria-labelledby="rev-heading">
                <div className="home-split">
                    <div className="home-split__head">
                        <h2 id="rev-heading" className="home-split__heading">Experience</h2>
                        <Link to="/experience" className="btn">
                            Full experience <FaArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                    <table className="rev-table">
                        <thead>
                            <tr>
                                <th scope="col">Rev</th>
                                <th scope="col">Period</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experience.map((job, i) => (
                                <tr key={job.id} className={job.current ? "is-current" : undefined}>
                                    <td className="rev-table__rev mono">{REV_LETTERS[experience.length - 1 - i]}</td>
                                    <td className="rev-table__period mono">
                                        {dateRange(job.startDate, job.endDate, job.current)}
                                    </td>
                                    <td>
                                        <span className="rev-table__role">{job.role}</span>
                                        <span className="rev-table__company">
                                            {job.company}
                                            {job.current && <span className="rev-mark">Current</span>}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── Drawing register excerpt: remaining projects ── */}
            <section className="home-register" aria-labelledby="register-heading">
                <div className="home-split">
                    <div className="home-split__head">
                        <h2 id="register-heading" className="home-split__heading">More projects</h2>
                        <Link to="/projects" className="btn">
                            Explore All Projects <FaArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                    <ul className="register-list">
                        {OTHER_PROJECTS.map((p) => (
                            <li key={p._idx}>
                                <Link to={`/projects/${p._idx}`} className="register-list__row">
                                    <span className="register-list__no mono">{String(p._idx + 1).padStart(2, "0")}</span>
                                    <span className="register-list__title">{p.title}</span>
                                    <span className="register-list__tagline">{p.tagline}</span>
                                    <span className="register-list__year mono">{p.year}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Contact />
        </div>
    );
}
