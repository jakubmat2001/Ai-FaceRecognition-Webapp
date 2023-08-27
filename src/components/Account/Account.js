import React from "react";

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSigned: this.props.isSigned,
        }
    }

    signinVerifier = () => {
        if (this.state.isSigned){
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.onRouteChange("password")}>Change Password</button>
            </div>
        )
    }


}

export default Account;