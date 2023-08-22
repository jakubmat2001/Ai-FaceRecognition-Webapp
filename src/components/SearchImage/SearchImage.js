import React from "react";
import "./SearchImage.css";


const SearchImage = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div className="component">
            <p className="info-text">
                {"Insert URL of an image into input box below."}
            </p>
            <div className="form">
                <input className='form-input' type="text" placeholder="https://www.images.com/coupleOnAScooter.jpeg" onChange={onInputChange}/>
                <button className="form-button" onClick={onButtonSubmit}><span>Detect</span></button>
            </div>
        </div>
    );
}

export default SearchImage;