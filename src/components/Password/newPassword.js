import React from "react";
import './newPassword.css'

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            submissionStatus: "",
        }
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
    }

    onConfirmNewPasswordChange = (event) => {
        this.setState({ confirmNewPassword: event.target.value })
    }

    onSubmitStatus = (data) => {
        switch (data){
            case "New":
                return this.setState({ submissionStatus: "Enter your old and new passwords into form"})
            case "Email":
                return this.setState({ submissionStatus: "Failed to find associated email"})
            case "Length":
                return this.setState({ submissionStatus: "Password must be at least 6 characters in length"})
            case "Uppercase":
                return this.setState({ submissionStatus: "Password must start with an uppercase letter"})
            case "Update":
                return this.setState({ submissionStatus: "Failed to update password"})
            case "Same":
                return this.setState({ submissionStatus: "Please enter different password from the old"})
            case "Success":
                return this.setState({ submissionStatus: "Password changed sucessfully"})
            default:
                return this.setState({ submissionStatus: "Something went wrong"})
        }
    }

    onSubmitChangePassword = (event) => {
        event.preventDefault();
        fetch("http://localhost:3001/password", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                newPassword: this.state.newPassword,
                confirmNewPassword: this.state.confirmNewPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                this.onSubmitStatus(data)
                if (data === "Success"){
                    this.props.onRouteChange("signout")
                }
            })
    }

    render() {
        return (
            <article className="password-outter-container">
                <legend className="password-label">Change Password</legend>
                <form className="change-pass-form">
                    <fieldset className="change-pass-fieldset">
                        <div className="pass-container">
                            <input className="password-input-form" onChange={this.onPasswordChange} placeholder="password" type="password" name="password" />
                        </div>

                        <div className="pass-container">
                            <input className="password-input-form" onChange={this.onNewPasswordChange} placeholder="new password" type="password" name="new password" />
                        </div>

                        <div className="pass-container">
                            <input className="password-input-form" onChange={this.onConfirmNewPasswordChange} placeholder="confirm new password" type="password" name="confirm new password" />
                        </div>
                    </fieldset>
                    <div className="submit-password-container">
                        <button className="submit-password" onClick={this.onSubmitChangePassword}>Change Password</button>
                    </div>
                    <div className="pass-error-msg-container">
                        <p className="pass-error-msg">{`${this.state.submissionStatus}`}</p>
                    </div>
                </form>

                <div className="signin-tag-container">
                    <p className="signin-tag">Signined as: {`${this.props.email}`}</p>
                </div>
            </article>
        );
    }
}

export default Password;