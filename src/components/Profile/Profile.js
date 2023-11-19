import React from "react";
import "./Profile.css"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            entries: this.props.user.entries,
            profileImg: this.props.user.profileImg,
            profileImgCopy: null
        }
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case "name":
                this.setState({ name: event.target.value })
                break;
            case "profile-img":
                const profileImageFile = event.target.files[0]
                this.setState({ profileImg: profileImageFile });
                this.setState({ profileImgCopy: URL.createObjectURL(profileImageFile) })
                break;
            default:
                return
        }
    }

    // Since our backend requires multer to receive image files
    // We need to consturct form with data that we wish to change 
    onProfileUpdate = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.profileImg && data.profileImg instanceof File) {
            formData.append("image", data.profileImg);
            console.log(`data in image ${data.profileImg}`)
        }
        const token = window.sessionStorage.getItem("token");
        fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Authorization": token
            },
            body: formData
        })
            .then(resp => resp.json()) // Convert the response to JSON
            .then(response => {
                if (response.success) {
                    // This code allows users to update individual profile details or all of them
                    try {
                        const responseImg = response.profileImg = `data:image/jpeg;base64,${response.profile_img}`;
                        this.props.loadUser({ ...this.props.user, name: data.name, profileImg: responseImg.profile_img });
                        this.props.toggleModal();
                        window.location.reload();
                    } finally {
                        this.props.loadUser({ ...this.props.user, name: data.name });
                        this.props.toggleModal();
                        window.location.reload();
                    }
                    
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // We check if the profileImg is an object in the state, which it will if it's uploaded from desktop
    // If so we'll display the user uploaded image modified to display it on frontend prior to uploading 
    checkProfileImg = (profileImg) => {
        if (profileImg instanceof File) {
            return this.state.profileImgCopy
        }
        return profileImg
    }


    render() {
        let { name, profileImg } = this.state
        if (profileImg === null || profileImg === undefined) {
            profileImg = this.props.defaultProfileImg;
        }
        return (
            <div className="profile-container" >
                <article className="profile-article-html">
                    <main className="profile-main-html">
                        <form className="profile-form-contents">
                            <fieldset id="profile" className="profile-form-grouping">
                                <div className="top-profile-container">
                                    <img className="profile-img-modal" src={this.checkProfileImg(profileImg)} alt=""></img>
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
                                    <input onChange={this.onFormChange} className="profile-input-properties-img" type="file" name="profile-img"
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