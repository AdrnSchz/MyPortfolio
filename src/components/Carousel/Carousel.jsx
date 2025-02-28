import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import "./Carousel.css";

export function Carousel({ projects }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    let autoScrollTimeout;

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
            setIsTransitioning(false);
        }, 500);
        resetAutoScroll()
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
            setIsTransitioning(false);
        }, 500);
        resetAutoScroll();
    };

    const resetAutoScroll = () => {
        clearTimeout(autoScrollTimeout);
        autoScrollTimeout = setTimeout(nextSlide, 5000);
    };

    useEffect(() => {
        autoScrollTimeout = setTimeout(nextSlide, 5000);
        return () => clearTimeout(autoScrollTimeout);
    }, [currentIndex]);

    return (
        <div className="carousel">
            <button className="arrow left" onClick={prevSlide}>◀</button>
            <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * (100 / projects.length)}%)`, transition: "transform 0.5s ease-in-out" }}>
                {projects.map((project, index) => {
                    let position = "side";
                    if (index === currentIndex) {
                        position = "center";
                    } else if (index === (currentIndex - 1 + projects.length) % projects.length || 
                               index === (currentIndex + 1) % projects.length) {
                        position = "adjacent";
                    }
                    return (
                        <div key={project.title} className={`carousel-item ${position}`}>
                            <ProjectCard {...project} />
                        </div>
                    );
                })}
            </div>
            <button className="arrow right" onClick={nextSlide}>▶</button>
        </div>
    );
}

Carousel.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
