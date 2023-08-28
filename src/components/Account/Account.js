import React from "react";
import './Account.css'

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSigned: this.props.isSigned,
        }
    }

    signinVerifier = () => {
        if (this.state.isSigned) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <article className="outter-container">
                <legend className="user-options">Options</legend>
                <div className="form-account-button-container">
                    <button className="form-account-button" onClick={() => this.props.onRouteChange("password")}><span>Change Password</span></button>
                </div>
                <div className="form-account-button-container">
                    <button className="form-account-button" onClick={() => this.props.onRouteChange("delete")}><span>Delete Account</span></button>
                </div>
            </article>
        )
    }
}

export default Account;