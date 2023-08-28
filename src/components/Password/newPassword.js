import React from "react";

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
            <div>
                <form>
                    <input onChange={this.onPasswordChange} />
                    <input onChange={this.onNewPasswordChange} />
                </form>
                <div className="">
                    <input className="submit-password" onClick={this.onSubmitChangePassword} type="button" value="Change Password" />
                </div>
            </div>
        );
    }
}

export default Password;