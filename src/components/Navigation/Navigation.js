import React from "react";
import Logo from "../Logo/Logo";
import './Navigation.css';


const Navigation = ({ onRouteChange, isSigned }) => {
    if (isSigned) {
        // If user is signed in, show signout buttons and send end-user to Signin route once clicked on
        return (
            <nav className="navigation-signin">
                <div className="logo-container">
                    <Logo />
                </div>
                
                <div className="buttons-container">
                    <p onClick={() => onRouteChange("home")} name="home" className="navigation-buttons">Home</p>
                    <p onClick={() => onRouteChange("account")} name="account" className="navigation-buttons">Account</p>
                    <p onClick={() => onRouteChange("signout")} name="signout" className="navigation-buttons">Sing Out</p>
                </div>

                {console.log("IsSigned is true: " + isSigned)}
            </nav>
        );
    } else {
        // If not user not signed in, show Signin/register buttons and send user to one these routes once clicked on
        return (
            <nav className="navigation">
                <p onClick={() => onRouteChange("signin")} className="navigation-buttons">Sing In</p>
                <p onClick={() => onRouteChange("register")} className="navigation-buttons">Register</p>
                {console.log("IsSigned is false: " + isSigned)}
            </nav>
        );
    }
}

export default Navigation;