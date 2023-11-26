import React from "react";
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            submissionStatus: '',
            defaultProfileImg: this.props.defaultProfileImg,
            isLinkDisabled: false
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
            case "Empty Form Fields":
                return this.setState({ submissionStatus: "Please fill out all the form fields" })
            case "User Not Found":
                return this.setState({ submissionStatus: "User with this email doesn't exist on our website" })
            case "Password Not Matching":
                return this.setState({ submissionStatus: "Password you provided doesn't match" })
            case "User not verified":
                return this.setState({ submissionStatus: (
                    <div>
                        Please verify your email <br />
                        {this.verificationLink()}
                    </div>
                )
            });
            case "Verification sent":
                return this.setState({ submissionStatus: "Verification email was sent check your email" })
            default:
                return this.setState({ submissionStatus: "Something went wrong, plese try again later" })
        }
    }

    verificationLink = () => {
        let linkClass = this.state.isLinkDisabled ? "validation-link-disabled" : "validation-link";
        return (
            <p className={linkClass} onClick={this.resendVerificationLink}>
                {this.state.isLinkDisabled ? "Please wait..." : "Resend link"}
            </p>
        );
    }

    resendVerificationLink = () => {
        if (this.state.isLinkDisabled) {
            return; 
        }

        this.setState({ isLinkDisabled: true }); 

        // Re-enable the link after 60 seconds
        setTimeout(() => {
            this.setState({ isLinkDisabled: false }); 
        }, 60000);

        fetch("https://13.41.66.124:3001/resend-verification", {
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
            })
        }).then(res => res.json())
          .then(data => {
            if (data == "Verification sent"){
                this.onSubmitStatus(data)
            }
          })
    }

    saveSessionInWindowStorage = (token) => {
        window.sessionStorage.setItem("token", token)
    }

    // Send a post request to server to check if credentials match
    // If they do, sign in the user to their account
    onSubmitSignIn = () => {
        fetch("https://13.41.66.124:3001/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.userID && data.success === "true") {
                    this.saveSessionInWindowStorage(data.token)
                    fetch(`https://13.41.66.124:3001/${data.userID}`, {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": data.token
                        }
                    })
                        .then(res => res.json())
                        .then(user => {
                            if (user && user.email) {
                                if (user.profile_img) {
                                    // We are converting the bytea to base64 to display it on frontend
                                    user.profileImg = `data:image/jpeg;base64,${user.profile_img}`; 
                                }else {
                                    user.profileImg = this.state.profileImg
                                }
                                this.props.loadUser(user);
                                this.props.onRouteChange("home");
                            }
                        }).catch(err => console.log("Failed to signin user" + err))
                } else {
                    this.onSubmitStatus(data);
                }
            })
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
