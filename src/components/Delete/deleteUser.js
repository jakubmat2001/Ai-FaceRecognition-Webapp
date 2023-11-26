import React from "react";
import './deleteUser.css'

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            password: "",
            confirmPassword: "",
            submissionStatus: "",
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onPasswordConfirmChange = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    onSubmitStatus = (data) => {
        switch (data) {
            case "Failed":
                return this.setState({ submissionStatus: "Failed" })
            case "Password":
                return this.setState({ submissionStatus: "Please enter correct credentials" })
            case "Submission":
                return this.setState({ submissionStatus: "Please fill out all fields" })
            case "Error":
                this.setState({ submissionStatus: "Error when handling request" })
            case "Success":
                return this.setState({ submissionStatus: "Account delete sucessfully" })
            default:
                return this.setState({ submissionStatus: "Something went wrong" })
        }
    }

    onConfirmDelete = () => {
        // Check if user clicked on yes when prompted to deleted account
    }

    onSubmitDeleteAccount = (event) => {
        event.preventDefault();
        fetch("https://13.41.66.124:3001/delete", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                this.onSubmitStatus(data)
                if (data === "Success") {
                    this.props.onRouteChange("signout")
                }
            })
    }

    render() {
        return (
            <article className="delete-account-outter-container">
                <form className="delete-account-form">
                    <div className="delete-account-label-container">
                        <legend className="delete-account-label">Delete Account</legend>
                    </div>
                    <fieldset className="delete-account-fieldset">
                        <div className="delete-account-container">
                            <input className="delete-input-form" onChange={this.onEmailChange} placeholder="email" value={this.state.email} />
                        </div>

                        <div className="delete-account-container">
                            <input className="delete-input-form" onChange={this.onPasswordChange} placeholder="password" type="password" />
                        </div>

                        <div className="delete-account-container">
                            <input className="delete-input-form" onChange={this.onPasswordConfirmChange} placeholder="confirm password" type="password" />
                        </div>

                        <div className="delete-account-button-container">
                            <button className="delete-account-button" onClick={this.onSubmitDeleteAccount}>Delete Account</button>
                        </div>
                    </fieldset>
                    <div className="delete-error-msg-container"><p className="delete-error-msg">{this.state.submissionStatus}</p></div>
                </form>

                <div className="disclaimer-container">
                    <div className="disclaimer-label-container">
                        <p className="disclaimer-account-label">Disclaimer</p>
                    </div>
                    <p className="delete-disclaimer-text">By deleting your account, you will erase all your data from our database including any past entry streaks you had. This is <b>permanent</b> and you will be able to create a new account with the same e-mail you're using for this account in the future. </p>
                </div>
            </article>
        );
    }
}

export default Delete;