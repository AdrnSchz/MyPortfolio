import PropTypes from "prop-types";
import "./ProjectCard.css";
import { SkillLabel } from "../SkillLabel/SkillLabel";
import { VideoThumbnail } from "../VideoThumbnail/VideoThumbnail";

const TYPE_COLORS = {
    Academic: { bg: "rgba(74,158,255,0.12)", color: "#4a9eff", border: "rgba(74,158,255,0.3)" },
    Personal: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.3)" },
    Professional: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", border: "rgba(34,197,94,0.3)" },
    "Academic/Professional": { bg: "rgba(255,102,0,0.12)", color: "#ff6600", border: "rgba(255,102,0,0.3)" },
};

function MediaArea({ media, title }) {
    const isVideo  = media?.type === "video";
    const hasImages = media?.type === "images" && media?.urls?.length > 0;

    if (isVideo) {
        return <VideoThumbnail src={media.url} alt={`${title} video demo`} />;
    }
    if (hasImages) {
        return (
            <img
                src={media.urls[0]}
                alt={`${title} screenshot`}
                className="project-card__thumbnail"
            />
        );
    }
    return <div className="project-card__no-media" />;
}

MediaArea.propTypes = {
    media: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

// ─── Carousel variant (compact, center/side scaling) ───────────────────────

function CarouselCard({ title, tagline, description, media, skills, isCenter, onClick }) {
    const cardText = tagline || description;
    return (
        <div
            className={`project-card${isCenter ? " project-card--center" : " project-card--side"}`}
            onClick={onClick}
        >
            <div className="project-card__media">
                <MediaArea media={media} title={title} />
            </div>
            <div className="project-card__body">
                <h3 className="project-card__title">{title}</h3>
                <p className="project-card__description">{cardText}</p>
                <div className="project-card__skills">
                    {skills.slice(0, 4).map((skill, i) => <SkillLabel key={i} text={skill} />)}
                    {skills.length > 4 && (
                        <span className="project-card__skills-more">+{skills.length - 4}</span>
                    )}
                </div>
                {isCenter && <span className="project-card__cta">View Details →</span>}
            </div>
        </div>
    );
}

// ─── Grid variant (full info, for the /projects page) ──────────────────────

function GridCard({ title, tagline, media, year, type, role, teamSize, skills, onClick }) {
    const typeStyle = TYPE_COLORS[type] ?? { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.15)" };

    return (
        <div className="project-card project-card--grid" onClick={onClick}>
            <div className="project-card__media">
                <MediaArea media={media} title={title} />
            </div>
            <div className="project-card__body">
                <div className="project-card__meta-row">
                    {type && (
                        <span
                            className="project-card__type-badge"
                            style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
                        >
                            {type}
                        </span>
                    )}
                    {year && <span className="project-card__year">{year}</span>}
                </div>

                <h3 className="project-card__title project-card__title--grid">{title}</h3>

                {tagline && (
                    <p className="project-card__tagline">{tagline}</p>
                )}

                {(role || teamSize != null) && (
                    <div className="project-card__info-row">
                        {role && <span className="project-card__info-item">⚙ {role}</span>}
                        {teamSize != null && (
                            <span className="project-card__info-item">
                                {teamSize === 1 ? "👤 Solo" : `👥 ${teamSize} people`}
                            </span>
                        )}
                    </div>
                )}

                <div className="project-card__skills project-card__skills--grid">
                    {skills.map((skill, i) => <SkillLabel key={i} text={skill} />)}
                </div>
            </div>
        </div>
    );
}

// ─── Public export ─────────────────────────────────────────────────────────

export function ProjectCard({ variant = "carousel", ...props }) {
    if (variant === "grid") return <GridCard {...props} />;
    return <CarouselCard {...props} />;
}

const projectShape = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    description: PropTypes.string,
    media: PropTypes.shape({
        type: PropTypes.string.isRequired,
        urls: PropTypes.arrayOf(PropTypes.string),
        url: PropTypes.string,
    }).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number,
    type: PropTypes.string,
    role: PropTypes.string,
    teamSize: PropTypes.number,
    isCenter: PropTypes.bool,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["carousel", "grid"]),
};

ProjectCard.propTypes = projectShape;
CarouselCard.propTypes = projectShape;
GridCard.propTypes = projectShape;