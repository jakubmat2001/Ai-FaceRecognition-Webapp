import React, { useEffect, useState } from "react";
import './Rank.css'

const Rank = ({name, entries, error, onRouteChange}) => {
    const [emoji, setEmoji] = useState('')

    useEffect(() => {
        getRankEmoji(entries);
    }, [entries])

    const getRankEmoji = (entries) => {
        fetch(`https://0ddgor4wpf.execute-api.eu-west-2.amazonaws.com/prod/rank?rank=${entries}`, {
            
        }).then(response => response.json())
        .then(data => {
            setEmoji(data.input);
        }).catch(console.log)
    }

    return(
        <div className="rank-container">
            <div className="rank-txt">
                {`${name} your rank is... `}
            </div>
            <div className="rank-Position">
                {`${entries} ${emoji}`}
            </div>
            <div className="rank-scoreboard">
                <p>View how your score matches against others</p>
                <a id="rank-scoreboard-navigate" onClick={() => onRouteChange("score")}><p>Score Board</p></a>
            </div>
            <div className="error-box">
                {`${error}`}
            </div>
        </div>
    );
}

export default Rank;