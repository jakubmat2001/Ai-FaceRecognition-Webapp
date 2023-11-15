import React from "react";
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            submissionStatus: '',
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    onSubmitStatus = (data) => {
        switch (data) {
            case "Unfilled From Fields":
                return this.setState({ submissionStatus: "Please fill out all the fields in form " })
            case "Existing Email":
                return this.setState({ submissionStatus: "Entered email already exists on our website " })
            case "Failed":
                return this.setState({ submissionStatus: "Failed to register a user, try again later" })
            case "Password Length":
                return this.setState({ submissionStatus: "Password must be at least 6 characters in length" })
            case "Uppercase Letter":
                return this.setState({submissionStatus: "Password must start with an uppercase letter"})
            case "Same Password Entered":
                return this.setState({submissionStatus: "Password's do not match"})
            case "success":
                return this.setState({submissionStatus: "Check your email for email verification link"})
            default:
                return this.setState({ submissionStatus: "Something went wrong" })
        }
    }

    clearFormInputs = () => {
        document.getElementById("Name").value = "";
        document.getElementById("email-address").value = "";
        document.getElementById("password").value = "";
        document.getElementById("conf-password").value = "";

    }

    // Send a request to server and pass parameters in body to it
    onSubmitRegister = () => {
        fetch("http://localhost:3001/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.onSubmitStatus("success")
                    this.clearFormInputs();
                } else {
                    this.onSubmitStatus(user)
                }
            })
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <div>
                <article className="register-article-html">
                    <main className="register-main-html">
                        <form className="register-form-contents">
                            <fieldset id="register" className="register-form-grouping">
                                <legend className="register-label">Register</legend>
                                <div className="register-form-div">
                                    <label className="register-form-label" htmlFor="name">Name</label>
                                    <input className="register-input-properties" type="text" name="Name" id="Name" onChange={this.onNameChange} />
                                </div>
                                <div className="register-form-div">
                                    <label className="register-form-label" htmlFor="email-address">Email</label>
                                    <input className="register-input-properties" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                                </div>
                                <div className="register-form-div">
                                    <label className="register-form-label" htmlFor="password">Password</label>
                                    <input className="register-input-properties" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                                </div>
                                <div className="register-form-div">
                                    <label className="register-form-label" htmlFor="conf-password">Confirm Password</label>
                                    <input className="register-input-properties" type="password" name="confirm-password" id="conf-password" onChange={this.onConfirmPasswordChange} />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="register-button" onClick={this.onSubmitRegister} type="button" value="Register" />
                            </div>
                            <div className="signin-instead-container">
                                <p onClick={() => onRouteChange("signin")} className="signin-instead-button">Signin instead.</p>
                            </div>
                            <div className="register-error-msg-container">
                                <p className="register-error-msg">{this.state.submissionStatus}</p>
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;