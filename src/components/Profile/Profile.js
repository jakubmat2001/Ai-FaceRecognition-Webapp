import React from "react";
import defaultProfileIcon from "../Profile-Icon/img/defaultProfileIcon.png"
import "./Profile.css"

const Profile = ({ isProfileOpen, toggleModal }) => {

    return (
        <div className="profile-container">
            <article className="profile-article-html">
                <main className="profile-main-html">
                    <form className="profile-form-contents">
                        <fieldset id="profile" className="profile-form-grouping">
                            <img className="profile-img" src={defaultProfileIcon}></img>
                            <legend className="profile-label">Profile</legend>
                            <div className="profile-form-div">
                                <label className="profile-form-label" htmlFor="name">Name</label>
                                <input className="profile-input-properties" type="text" name="Name" id="Name" />
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