import React from "react";
import "./ImageLoad.css"

const ImageLoad = ({imageURL, box}) => {
    return (
            <div className="container">
                <div className="img-facebox-container">
                    <img id="inputImage" className="url-img" alt="face" src={imageURL}/>
                    <div className="face-box" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
                </div>
            </div>
    );
}

export default ImageLoad;