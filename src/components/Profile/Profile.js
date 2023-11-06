import React from "react";
import defaultProfileIcon from "../Profile-Icon/img/defaultProfileIcon.png"
import "./Profile.css"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            entries: this.props.user.entries,
            profileImg: this.props.user.profileImg
        }
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case "name":
                this.setState({ name: event.target.value })
                console.log(event.target.name)
                break;
            case "profile-img":
                this.setState({ profileImg: event.target.value })
                console.log(event.target.name)
                break;

        }
    }

    onProfileUpdate = (data) => {
        const token = window.sessionStorage.getItem("token")
        fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ formInput: data })
        })
            .then(resp => {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data });
            }).catch(console.log)
    }

    render() {
        const { name, profileImg } = this.state
        return (
            <div className="profile-container" >
                <article className="profile-article-html">
                    <main className="profile-main-html">
                        <form className="profile-form-contents">
                            <fieldset id="profile" className="profile-form-grouping">
                                <div className="top-profile-container">
                                    <img className="profile-img" src={profileImg}></img>
                                    <legend className="profile-label">Profile</legend>
                                    <div className="profile-exit" onClick={this.props.toggleModal}>X</div>
                                </div>
                                <hr />
                                <p className="profile-name-display">{this.state.name}</p>
                                <p className="profile-image-display">Images submitted: {this.props.user.entries}</p>
                                <hr className="second-horizontal-row" />
                                <div className="profile-form-div">
                                    <label className="profile-form-label" htmlFor="name">Name</label>
                                    <input onChange={this.onFormChange} className="profile-input-properties" type="text" name="name"
                                        id="name" placeholder={this.props.user.name} />
                                    <br />
                                    <label className="profile-form-label" htmlFor="profile-img">Profile Image</label>
                                    <input onChange={this.onFormChange} className="profile-input-properties" type="file" name="profile-img"
                                        id="profile-img" />
                                </div>
                            </fieldset>
                        </form>
                    </main>
                    <div className="modify-options-container">
                        <div>
                            <button className="save-changes" onClick={() => this.onProfileUpdate({ name, profileImg })}>Save Changes</button>
                            <button className="cancel-changes" onClick={this.props.toggleModal}>Cancel</button>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}


export default Profile