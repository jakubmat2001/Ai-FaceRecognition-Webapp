import React from "react";
import './Rank.css'

const Rank = ({name, entries}) => {
    return(
        <div>
            <div className="rank-txt">
                {`${name} your rank is... `}
            </div>
            <div className="rank-Position">
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;