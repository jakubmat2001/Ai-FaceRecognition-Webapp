import React from "react";
import defaultProfileIcon from "../Profile-Icon/img/defaultProfileIcon.png"
import "./Profile.css"

const Profile = ({ isProfileOpen, toggleModal, usersName, usersEntries}) => {

    return (
        <div className="profile-container">
            <article className="profile-article-html">
                <main className="profile-main-html">
                    <form className="profile-form-contents">
                        <fieldset id="profile" className="profile-form-grouping">
                            <div className="top-profile-container">
                                <img className="profile-img" src={defaultProfileIcon}></img>
                                <legend className="profile-label">Profile</legend>
                                <div className="profile-exit" onClick={toggleModal}>X</div> 
                            </div>
                            <hr/>
                            <p className="profile-name-display">{usersName}</p>
                            <p className="profile-image-display">Images submitted: {usersEntries}</p>
                            <hr/>
                            <div className="profile-form-div">
                                <label className="profile-form-label" htmlFor="name">Name</label>
                                <input className="profile-input-properties" type="text" name="Name" id="Name" value={usersName}/>
                            </div>
                        </fieldset>
                        <div>
                            <button className="save-changes" onClick={toggleModal}>Save Changes</button>
                            <button className="cancel-changes" onClick={toggleModal}>Cancel</button>
                        </div>
                    </form>
                </main>
            </article>

        </div>
    )

}

export default Profile