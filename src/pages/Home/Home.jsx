import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import projects from "../../data/projects.json";
import "./Home.css";


export function Home() {
    const navigate = useNavigate();

    const handleCardClick = (section) => {
        navigate(`/${section}`);
    };

    
    const totalProjects = projects.length;
    const extendedProjects = [...projects, ...projects, ...projects];

    const [currentIndex, setCurrentIndex] = useState(totalProjects);
    
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex >= totalProjects * 2) {
            setTimeout(() => {
                setCurrentIndex(totalProjects);
            }, 500);
        } else if (currentIndex <= 0) {
            setTimeout(() => {
                setCurrentIndex(totalProjects);
            }, 500);
        }
    }, [currentIndex, totalProjects]);

    return (
        <>
            <section className="about-me">
                <h1>Adrian Sanchez</h1>
                <h1>Software Engineer</h1>

                <p className="about-me-intro">
                    Based in Barcelona, Spain — Currently working at Fujitsu as a Backend Developer in the banking sector.
                </p>

                <div className="about-me-container">
                    <div className="about-me-left">
                        <p>
                            I am a passionate software engineer with professional experience in backend development, with working experience in Java within the banking sector.
                        </p>
                    </div>
                    <div className="about-me-right">
                        <p>
                            My main goal is to excel as a backend developer, creating innovative solutions that solve complex problems. 
                            With hands-on experience in backend systems, I bring strong problem-solving skills and a deep understanding of software architecture.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="featured-project">
                <h1>Featured Projects</h1>
                <p className="featured-projects-description">Discover my latest and most impactful project.</p>
                <div className="carousel-container">
                    <button className="carousel-arrow left" onClick={prevSlide}>◀</button>
                    <div className="carousel-track" style={{ transform: `translateX(-${(currentIndex / totalProjects) * 100}%)` }}>
                        {extendedProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                    <button className="carousel-arrow right" onClick={nextSlide}>▶</button>
                </div>
                <button onClick={() => handleCardClick("projects")} className="explore-btn">
                    Explore Projects
                </button>
            </section>
        </>
    );


}

