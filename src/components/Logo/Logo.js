import React from "react";
import Tilt from 'react-parallax-tilt';
import LogoImg from "./LogoImg.png"
import './Logo.css';

const Logo = ({onRouteChange}) => {
    return (
        <div className="logo-image-container">
            <Tilt scale={1} tiltMaxAngleY={45} tiltMaxAngleX={45} transitionSpeed={3000}>
                <img className="logo-image"
                src={LogoImg}
                alt="logo"
                data-tilt
                onClick={() => onRouteChange("home")}
            />
            </Tilt>
        </div>
    );
}

export default Logo;