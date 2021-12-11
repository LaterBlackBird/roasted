import { useState, useEffect } from "react"
import "./About.css"


const AboutPage = () => {
    const [showAbout, setShowAbout] = useState(false)

    useEffect(() => {
        if (!showAbout) return;

        const closeMenu = () => {
            setShowAbout(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showAbout]);

    return (
        <>
            <div className={`about-card ${!showAbout ? 'move-out' : ''}`}>
                <div className="about-info">
                    <img className='about-pic' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1639161384/Roasted/Seth_the_photographer_otencm.png" alt="me holding a coffee" />
                    <p>Seth Holland</p>
                    <span>
                        <a href='https://github.com/LaterBlackBird' target="_blank" rel="noopener noreferrer" ><i className="fab fa-github-square" ></i></a>
                        <a href='https://www.linkedin.com/in/seth-holland/' target="_blank" rel="noopener noreferrer" ><i className="fab fa-linkedin"></i></a>
                    </span>
                    <p>Tech Stack</p>
                    <img className='tech-badge' src={`https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white`} alt="Node.js" />
                    <img className='tech-badge' src={`https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`} alt="React" />
                    <img className='tech-badge' src={`https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white`} alt="redux" />
                    <img className='tech-badge' src={`https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white`} alt="Postgresql" />
                    <img className='tech-badge' src={`https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB`} alt="Express" />
                    <img className='tech-badge' src={`https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white`} alt="Postgresql" />

                </div>
            </div>
            <div className={`about-tag ${!showAbout ? 'show' : 'hidden'}`} onClick={() => setShowAbout(!showAbout)}>
                <p id='about-tag-text'>DEVELOPER</p>
            </div>
        </>
    )
}

export default AboutPage
