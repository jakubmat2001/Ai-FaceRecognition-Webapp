import React from "react";
import userIcon from "./Profile-Icon-Images/user.png"
import keyIcon from "./Profile-Icon-Images/key.png"
import closeIcon from "./Profile-Icon-Images/close.png"
import logoutIcon from "./Profile-Icon-Images/logout.png"
import './Profile-Icon.css'

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropDownOpen: false,
            profileImg: this.props.userProfileImg,
            fontSize: ""
        };
    }

    componentDidMount = () => {
        const {userEmail} = this.props;
        this.modifyEmailLenght(userEmail)
    }

    // Toggling the drop-down profile
    toggle() {
        this.setState((prevState) => ({
            dropDownOpen: !prevState.dropDownOpen
        }));
    }

    modifyEmailLenght = (email) => {
        if (email.length > 24 && email.length <= 32){
             this.setState((prevState) => 
             ({...prevState,
                fontSize: "10px"}))
             return
        }else if (email.length <= 24){
            this.setState((prevState) => 
            ({...prevState,
               fontSize: "14px"}))
             return
        }
        else {
            this.setState((prevState) => 
            ({...prevState,
               fontSize: "0px"}))
             return
        }
    }

    render() {
        const {dropDownOpen, fontSize} = this.state;
        const {userEmail, userName, toggleModal, onRouteChange} = this.props
        if (this.state.profileImg === null || this.state.profileImg === undefined) {
            this.state.profileImg = this.props.defaultProfileImg;
        }

        return (
            <div className="action">
                <div className="profile" onClick={this.toggle}>
                    <img src={this.state.profileImg} alt="Profile" />
                </div>
                {dropDownOpen && 
                    <div className="menu active">
                        <h3>{userName}<br/><span style={{fontSize: fontSize}}>{userEmail}</span></h3>
                        <ul>
                            <li>
                                <img src={userIcon} alt="profile"/>
                                <a href="#" onClick={() => toggleModal()}>My Profile</a>
                            </li>
                            <li>
                                <img src={keyIcon} alt="change password"/>
                                <a href=".#" onClick={() => onRouteChange("password")}>Change Password</a>
                            </li>
                            <li>
                                <img src={closeIcon} alt="delete account"/>
                                <a href=".#" onClick={() => onRouteChange("delete")}>Delete Account</a>
                            </li>
                            <li>
                                <img src={logoutIcon} alt="signout"/>
                                <a href=".#" onClick={() => onRouteChange("signout")}>Logout</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileIcon;

