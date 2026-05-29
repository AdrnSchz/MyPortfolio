import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import "./Carousel.css";

export function Carousel({ projects, visibleCount = 3 }) {
    const [centerIndex, setCenterIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const trackRef = useRef(null);
    const clipRef = useRef(null);
    const navigate = useNavigate();

    const n = projects.length;
    const sideCount = Math.floor(visibleCount / 2);
    const totalSlots = visibleCount + 2;

    // Returns project at a given offset from center, with its real index
    const getProject = (offset) => {
        const idx = ((centerIndex + offset) % n + n) % n;
        return { ...projects[idx], realIndex: idx };
    };

    const getSlotWidth = useCallback(() => {
        return clipRef.current ? clipRef.current.offsetWidth / visibleCount : 0;
    }, [visibleCount]);

    const resetTrack = useCallback(() => {
        if (trackRef.current) {
            const sw = getSlotWidth();
            trackRef.current.style.transition = "none";
            trackRef.current.style.transform = `translateX(${-sw}px)`;
        }
    }, [getSlotWidth]);

    useEffect(() => {
        resetTrack();
        window.addEventListener("resize", resetTrack);
        return () => window.removeEventListener("resize", resetTrack);
    }, [resetTrack]);

    const slide = (direction) => {
        if (isAnimating || !trackRef.current) return;
        setIsAnimating(true);

        const sw = getSlotWidth();
        const target = direction === "next" ? -sw * 2 : 0;

        trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
        trackRef.current.style.transform = `translateX(${target}px)`;

        setTimeout(() => {
            setCenterIndex((prev) =>
                direction === "next" ? (prev + 1) % n : (prev - 1 + n) % n
            );
            requestAnimationFrame(() => {
                if (trackRef.current) {
                    trackRef.current.style.transition = "none";
                    trackRef.current.style.transform = `translateX(${-sw}px)`;
                }
                setTimeout(() => setIsAnimating(false), 20);
            });
        }, 450);
    };

    // Slots: buffer-left, ...visible..., buffer-right
    const slots = Array.from({ length: totalSlots }, (_, i) => i - sideCount - 1);

    return (
        <div className="carousel">
            <button
                className="carousel-arrow carousel-arrow--left"
                onClick={() => slide("prev")}
                aria-label="Previous project"
            >
                &#8249;
            </button>

            {/* clip-path allows vertical overflow for scale/glow but clips horizontal */}
            <div className="carousel-clip" ref={clipRef}>
                <div
                    className="carousel-track"
                    ref={trackRef}
                    style={{ width: `${(totalSlots / visibleCount) * 100}%` }}
                >
                    {slots.map((offset) => {
                        const { realIndex, ...project } = getProject(offset);
                        const isCenter = offset === 0;
                        return (
                            <div
                                key={offset}
                                className={`carousel-slot${isCenter ? " carousel-slot--center" : " carousel-slot--side"}`}
                                style={{ width: `${100 / totalSlots}%` }}
                            >
                                <ProjectCard
                                    {...project}
                                    isCenter={isCenter}
                                    onClick={() => navigate(`/projects/${realIndex}`)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className="carousel-arrow carousel-arrow--right"
                onClick={() => slide("next")}
                aria-label="Next project"
            >
                &#8250;
            </button>
        </div>
    );
}

Carousel.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    visibleCount: PropTypes.number,
};
