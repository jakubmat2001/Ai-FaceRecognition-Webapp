import React from "react";
import './Navigation.css';


const Navigation = ({ onRouteChange, isSigned }) => {
    if (isSigned) {
        // If user is signed in, show signout buttons and send end-user to Signin route once clicked on
        return (
        <nav className="navigation">
            <p onClick={() => onRouteChange("signout")} className="f3 link dim black underline pa3 pointer">Sing Out</p>
            {console.log("IsSigned is true: " + isSigned)}
        </nav>
        );
    } else {
        // If not user not signed in, show Signin/register buttons and send user to one these routes once clicked on
        return (
        <nav className="navigation">
            <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sing In</p>
            <p onClick={() => onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
            {console.log("IsSigned is false: " + isSigned)}
        </nav>
        );
    }
}

export default Navigation;