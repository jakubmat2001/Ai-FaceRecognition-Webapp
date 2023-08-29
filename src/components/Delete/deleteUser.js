import React from "react";
import './deleteUser.css'

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm: "",
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onPasswordConfirmChange = (event) => {
        this.setState({ confirm: event.target.value })
    }

    onConfirmDelete = () => {
        // Check if user clicked on yes when prompted to deleted account
    }

    onSubmitDeleteAccount = () => {
        fetch("https://rocky-mountain-27857-bc14d0ed0a0a.herokuapp.com/password", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
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
                            <input className="delete-input-form" onChange={this.onEmailChange} placeholder="email" />
                        </div>

                        <div className="delete-account-container">
                            <input className="delete-input-form" onChange={this.onPasswordChange} placeholder="password" />
                        </div>

                        <div className="delete-account-container">
                            <input className="delete-input-form" onChange={this.onPasswordConfirmChange} placeholder="confirm password" />
                        </div>

                        <div className="delete-account-button-container">
                            <button className="delete-account-button" onClick={this.onConfirmDelete}>Delete Account</button>
                        </div>
                    </fieldset>
                </form>

                <div className="disclaimer-container">
                    <div className="disclaimer-label-container">
                        <p className="disclaimer-account-label">Disclaimer</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </article>
        );
    }
}

export default Delete;