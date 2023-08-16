import React from "react";
import './Rank.css'

const Rank = ({name, entries}) => {
    return(
        <div>
            <div className="Rank-txt">
                {`${name} your rank is... `}
            </div>
            <div className="Rank-Position">
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;