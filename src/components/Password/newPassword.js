import React from "react";
import './newPassword.css'

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            password: '',
            newPassword: ''
        }
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
    }


    onSubmitChangePassword = () => {
        fetch("https://rocky-mountain-27857-bc14d0ed0a0a.herokuapp.com/password", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
        })
            .then(res => res.json())
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
                    </fieldset>
                </form>
                <div className="submit-password-container">
                    <button className="submit-password" onClick={this.onSubmitChangePassword}>Change Password</button>
                </div>
                <div className="signin-tag-container">
                    <p className="signin-tag">Signined as: {`${this.props.email}`}</p>
                </div>
            </article>
        );
    }
}

export default Password;