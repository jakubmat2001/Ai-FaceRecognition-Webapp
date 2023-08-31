import React from "react";
import './Signin.css'

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            submissionStatus: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitStatus = (data) => {
        switch (data) {
            
            case "Form":
                return this.setState({ submissionStatus: "Please fill out all the form fields" })
            case "Not Found":
                return this.setState({ submissionStatus: "Failed to find a user" })
            case "Password Not Matching":
                return this.setState({ submissionStatus: "Password you provided is incorrect" })
            case "Not Existing":
                return this.setState({ submissionStatus: "This user doen't exist on our website" })
            default:
                return this.setState({ submissionStatus: "Something went wrong" })
        }
    }
    

    // Send a post request to server to check if credentials match
    // If they do, sign in the user to their account
    onSubmitSignIn = () => {
        fetch("https://ai-face-recogn-a1ba577e879b.herokuapp.com/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(userProfile => {
                if (userProfile.id) {
                    this.props.loadUser(userProfile);
                    this.props.onRouteChange('home');
                } else {
                    this.onSubmitStatus(userProfile);
                }
            }
            )
    }

    render() {
        return (
            <article className="signin-article-html">
                <main className="signin-main-html">
                    <form className="signin-form-contents">
                        <fieldset id="sign_up" className="signin-form-grouping">
                            <legend className="signin-label">Sign In</legend>
                            <div className="signin-form-div">
                                <label className="signin-form-label" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                    className="signin-input-properties"
                                    type="email"
                                    name="email-address" id="email-address"
                                />
                            </div>
                            <div className="signin-form-div">
                                <label className="signin-form-label" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                    className="signin-input-properties"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>

                        <div className="">
                            <input className="signin-button" onClick={this.onSubmitSignIn} type="button" value="Sign in" />
                        </div>

                        <div className="register-instead-container">
                            <p onClick={() => this.props.onRouteChange("register")} className="register-instead-button ">Register instead</p>
                        </div>

                        <div className="signin-error-msg-container">
                            <p className="signin-error-msg">{this.state.submissionStatus}</p>
                        </div>
                    </form>
                </main>
            </article>)

    }
}

export default Signin;
