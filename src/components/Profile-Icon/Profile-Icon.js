import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import defaultProfileIcon from "./img/defaultProfileIcon.png"
import './Profile-Icon.css'

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            DropDownOpen: false
        }
    }

    // binding our drop-down profile
    toggle() {
        this.setState(prevState => ({
            DropDownOpen: !prevState.DropDownOpen
        }));
    }

    render() {
        return (
            <div className="drop-down-profile">
                <Dropdown isOpen={this.state.DropDownOpen} toggle={this.toggle} className="drop-down-list">
                    <DropdownToggle data-toggle="dropdown" tag="span">
                        <img className="profile-img" src={defaultProfileIcon} alt="profile-Icon" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.props.toggleModal}> View Profile </DropdownItem>
                        <DropdownItem> Change Password </DropdownItem>
                        <DropdownItem> Delete Account </DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("signout")}> Sign-Out </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}


export default ProfileIcon