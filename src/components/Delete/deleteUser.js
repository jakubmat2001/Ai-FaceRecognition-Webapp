import React from "react";
import './deleteUser.css'

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            confirm: "",
        }
    }

    render() {
        return (
            <div>
                <p>Delete Page</p>
            </div>
        );
    }
}

export default Delete;