import React from "react";
import { useEffect, useState } from "react";
import "./scoreBoard.css"

const ScoreBoard = () => {
    const [userData, setUserData] = useState([]);

    // Get all the users from our db, put them in unsorted array
    // check each of their score against each other, and then remove highest scored user from unsorted array
    // add the highest scored user to userData state array
    // then repeat that 5 more times to fill up top 5 rows in the table
    useEffect(() => {
        const token = window.sessionStorage.getItem('token');
        fetch("http//:localhost:3001", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then(data => data.json())
    }, [])


    return (
        <div className="score-board-container">
            <div className="score-board-text">
                <h2>Top 5 Score Board</h2>
                <p>Gain higher score by detecing more faces</p>
            </div>
            <div className="score-board-table">
                <table>
                    <tr>
                        <th>Top</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>jack</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>laurel</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>matthew</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default ScoreBoard