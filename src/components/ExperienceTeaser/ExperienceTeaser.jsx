import { Link } from "react-router-dom";
import experience from "../../data/experience.json";
import "./ExperienceTeaser.css";

const TYPE_COLORS = {
    "Full-time":          { bg: "#22c55e22", color: "#22c55e", border: "#22c55e55" },
    "EU Research Project":{ bg: "#4a9eff22", color: "#4a9eff", border: "#4a9eff55" },
    "Part-time":          { bg: "#a855f722", color: "#a855f7", border: "#a855f755" },
    "Contract":           { bg: "#ff660022", color: "#ff6600", border: "#ff660055" },
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export function ExperienceTeaser() {
    const recent = experience.slice(0, 3);

    return (
        <section className="exp-teaser">
            <h2 className="exp-teaser__heading">Work Experience</h2>
            <p className="exp-teaser__sub">A snapshot of my professional journey.</p>

            <div className="exp-teaser__grid">
                {recent.map((job) => {
                    const typeStyle = TYPE_COLORS[job.type] ?? TYPE_COLORS["Contract"];
                    const end = job.current ? "Present" : formatDate(job.endDate);
                    const start = formatDate(job.startDate);

                    return (
                        <div key={job.id} className={`exp-teaser__card${job.current ? " exp-teaser__card--current" : ""}`}>
                            {job.current && <div className="exp-teaser__active-dot" />}
                            <div className="exp-teaser__card-top">
                                <h3 className="exp-teaser__role">{job.role}</h3>
                                <span className="exp-teaser__company">{job.company}</span>
                                <div className="exp-teaser__meta">
                                    <span
                                        className="exp-teaser__type"
                                        style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
                                    >
                                        {job.type}
                                    </span>
                                    <span className="exp-teaser__dates">{start} – {end}</span>
                                </div>
                            </div>
                            <div className="exp-teaser__skills">
                                {job.skills.slice(0, 5).map((s) => (
                                    <span key={s} className="exp-teaser__skill-tag">{s}</span>
                                ))}
                                {job.skills.length > 5 && (
                                    <span className="exp-teaser__skill-tag exp-teaser__skill-tag--more">
                                        +{job.skills.length - 5}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Link to="/experience" className="exp-teaser__cta">
                View Full Experience →
            </Link>
        </section>
    );
}
