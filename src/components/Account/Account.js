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
            <article className="article-html">
                <main className="main-html">
                    <form className="form-contents">
                        <fieldset className="form-grouping">
                            <legend className="options">Account Options</legend>
                            <div className="form-div">
                                <p onClick={() => this.props.onRouteChange("password")} className="buttons">Change Password</p>
                            </div>
                            <div className="form-div">
                                <p onClick={() => this.props.onRouteChange("delete")} className="buttons">Delete Account</p>
                            </div>
                        </fieldset>
                    </form>
                </main>
            </article>
        )
    }
}

export default Account;