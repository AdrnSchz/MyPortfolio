import { useState } from "react";
import PropTypes from "prop-types";
import "./ProjectCard.css";
import { SkillLabel } from "../SkillLabel/SkillLabel";


export function ProjectCard({ title, media, description, skills = [] }) {
    const [currentImage, setCurrentImage] = useState(0);

    const isVideo = media && media.type === "video";
    const isImageSet = media && media.type === "images";

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % media.urls.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + media.urls.length) % media.urls.length);
    };

    return(
        <div className="project-card">
            <h3>{title}</h3>
            <div className="media-container">
                {isVideo ? (
                    <video controls>
                        <source src={media.urls} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : isImageSet ? (
                    <div className="image-slider">
                        <button onClick={prevImage} className="arrow left">◀</button>
                        <img src={media.urls[currentImage]} alt={`${title} screenshot`} />
                        <button onClick={nextImage} className="arrow right">▶</button>
                    </div>
                ) : null}
            </div>
            <p>{description}</p>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <SkillLabel key={index} text={skill} />
                ))}
            </div>
        </div>
    );
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    media: PropTypes.shape({
        type: PropTypes.string.isRequired,
        urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};