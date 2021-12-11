import React from 'react'
import './Splash.css';

const Splash = () => {
    return (
        <div className='homepage-container'>
            <div id='branding-info'>
                <img id='home-logo' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1638735300/Roasted/Logo_eu5sbs.png" alt="logo" />
                <h1 className ='branding' id='home-name'>ROASTED</h1>
                <h4 className ='branding ' id='home-slogan'>COZY UP WITH FRIENDS</h4>
                <h2 className ='branding' id='home-tagline'>DISCOVER AND SHARE <br/> COFFEE YOU LOVE</h2>
            </div>
            <div className='feature-list-container'>
                <p>Roasted Features Include:</p>
                <div className='feature-box'>
                    <p>ADD YOUR FAVORITE COFFEE SO OTHERS CAN FIND THEM TOO</p>
                </div>
                <div className='feature-box'>
                    <p>CHECK-IN SO YOUR FRIENDS KNOW YOUR FAVORITE SPOTS AND DRINKS</p>
                </div>
                <div className='feature-box'>
                    <p>LET OTHERS KNOW YOUR THOUGHTS ON THEIR CHECK-INS WITH COMMENTS</p>
                </div>
            </div>

        </div>
    )
}

export default Splash
