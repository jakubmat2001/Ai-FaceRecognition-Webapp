import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Profile-Icon.css'

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            DropDownOpen: false,
            profileImg: this.props.userProfileImg 
        }
    }

    // binding our drop-down profile
    toggle() {
        this.setState(prevState => ({
            DropDownOpen: !prevState.DropDownOpen
        }));
    }

    render() {
        let { profileImg } = this.state
        console.log(`profile img rendered ${profileImg}`)
        if (profileImg === null || profileImg === undefined){
            profileImg = this.props.defaultProfileImg;
        }
        return (
            <div className="drop-down-profile">
                <Dropdown isOpen={this.state.DropDownOpen} toggle={this.toggle} className="drop-down-list">
                    <DropdownToggle data-toggle="dropdown" tag="span">
                        <img className="profile-img" src={profileImg} alt="profile-Icon" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.props.toggleModal}> View Profile </DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("password")}>  Change Password </DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("delete")}> Delete Account </DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("signout")}> Sign-Out </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

export default ProfileIcon