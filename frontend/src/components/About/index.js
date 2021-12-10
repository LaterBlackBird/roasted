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
                    <img className='about-pic' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1639161384/Seth_the_photographer_otencm.png" alt="" />
                    <div>
                        words
                    </div>
                </div>
            </div>
            <div className={`about-tag ${!showAbout ? 'show' : 'hidden'}`} onClick={() => setShowAbout(!showAbout)}>
                <p id='about-tag-text'>About</p>
            </div>
        </>
    )
}

export default AboutPage
