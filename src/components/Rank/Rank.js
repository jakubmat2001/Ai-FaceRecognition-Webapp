import React, { useEffect, useState } from "react";
import './Rank.css'

const Rank = ({name, entries, error}) => {
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
            <div className="error-box">
                {`${error}`}
            </div>
        </div>
    );
}

export default Rank;