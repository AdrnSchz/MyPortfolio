import { useNavigate } from "react-router-dom";
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
                    Based in Barcelona, Spain — Currently working at Fujitsu as a Backend Developer in the banking sector.
                </p>

                <div className="about-me-container">
                    <div className="about-me-left">
                        <p>
                            I am a passionate software engineer with professional experience in backend development, with working experience in Java within the banking sector. 
                            My fascination with technology's ability to reshape our world has driven me to continuously learn and adapt to new challenges.
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
                <h2>Featured Project</h2>
                <p>Discover my latest and most impactful project.</p>
                <button onClick={() => handleCardClick("projects")} className="explore-btn">
                    Explore Projects
                </button>
            </section>
        </>
    );


}

