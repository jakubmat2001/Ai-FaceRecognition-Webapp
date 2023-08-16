import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (

        <div className="image">
            <Tilt scale={1.1} tiltMaxAngleY={30} tiltMaxAngleX={30} transitionSpeed={2000}>
            <img
                src="https://www.freeiconspng.com/thumbs/artificial-intelligence-icon-png/artificial-intelligence-png-11.png"
                alt="logo"
                data-tilt
            />
            </Tilt>
        </div>
    );
}

export default Logo;