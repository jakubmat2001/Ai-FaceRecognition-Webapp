import React from "react";
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    // Send a request to server and pass parameters in body to it
    onSubmitRegister = () => {
        fetch("https://rocky-mountain-27857-bc14d0ed0a0a.herokuapp.com/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }) 
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('signout');
                }
            })
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
                            </fieldset>
                            <div className="">
                                <input className="register-button" onClick={this.onSubmitRegister} type="button" value="Register" />
                            </div>
                            <div className="signin-instead-container">
                                <p onClick={() => onRouteChange("signin")} className="signin-instead-button">Signin instead.</p>
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;