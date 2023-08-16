import React from "react";

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
        fetch("https://boiling-shelf-42050-35ffdcb53fa2.herokuapp.com/register", {
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
                <article className="br2 ba dark-gray b--black-10 mv4 w-150 w-50-m w-25-l mw5 center">
                    <main className="pa4 black-80">
                        <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name" id="Name" onChange={this.onNameChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" for="email-address">Password</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitRegister} type="button" value="Register" />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange("signin")} className="f6 link dim black db underline-hover pointer">Signin instead.</p>
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;