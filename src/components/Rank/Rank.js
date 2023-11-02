import React, { Component } from "react";
import './Rank.css'

const Rank = ({name, entries, error}) => {

    //Note for future development: use hooks to create useEffect so that
    // if there error msg is empty the padding used for error-box will removed

    return(
        <div>
            <div className="rank-txt">
                {`${name} your rank is... `}
            </div>
            <div className="rank-Position">
                {`${entries}`}
            </div>
            <div className="error-box">
                {`${error}`}
            </div>
        </div>
    );
}

export default Rank;