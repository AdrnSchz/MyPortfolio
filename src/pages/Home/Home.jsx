import { useNavigate } from "react-router-dom";
import { Carousel } from "../../components/Carousel/Carousel";
import { ExperienceTeaser } from "../../components/ExperienceTeaser/ExperienceTeaser";
import projects from "../../data/projects.json";
import "./Home.css";


export function Home() {
    const navigate = useNavigate();

    const handleCardClick = (section) => {
        navigate(`/${section}`);
    };

    return (
        <>
            <section className="about-me">
                <h1>Adrian Sanchez</h1>
                <h1>Software Engineer</h1>

                <p className="about-me-intro">
                    Based in Barcelona, Spain — Currently working at Fujitsu as an Application Developer in the banking sector.
                </p>

                <div className="about-me-container">
                    <div className="about-me-left">
                        <p>
                            Software engineer with professional experience across banking-grade systems,
                            full-stack web platforms, and low-level embedded software. Currently developing
                            ATM middleware (C/C++) and financial monitoring applications (Java/Spring Boot)
                            for two major Spanish banks at Fujitsu.
                        </p>
                    </div>
                    <div className="about-me-right">
                        <p>
                            My goal is to keep growing as an engineer across the backend —
                            from low-level system internals to modern distributed web services.
                            I enjoy tackling complex problems with clean, well-structured code
                            and a focus on reliability and performance.
                        </p>
                    </div>
                </div>
            </section>

            <ExperienceTeaser />

            <section className="featured-project">
                <h1>Featured Projects</h1>
                <p className="featured-projects-description">Discover my latest and most impactful projects.</p>
                <Carousel projects={projects} />
                <button onClick={() => handleCardClick("projects")} className="explore-btn">
                    Explore All Projects
                </button>
            </section>
        </>
    );


}

