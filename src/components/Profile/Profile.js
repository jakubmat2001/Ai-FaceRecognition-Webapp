import React from "react";
import "./Profile.css"

const Profile = ({ isProfileOpen, toggleModal }) => {

    return (
        <div className="profile-container">
            <article className="register-article-html">
                <main className="register-main-html">
                    <form className="register-form-contents">
                        <fieldset id="register" className="register-form-grouping">
                            <legend className="register-label">Register</legend>
                            <div className="register-form-div">
                                <label className="register-form-label" htmlFor="name">Name</label>
                                <input className="register-input-properties" type="text" name="Name" id="Name" />
                            </div>
                            <div className="register-form-div">
                                <label className="register-form-label" htmlFor="email-address">Email</label>
                                <input className="register-input-properties" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="register-form-div">
                                <label className="register-form-label" htmlFor="password">Password</label>
                                <input className="register-input-properties" type="password" name="password" id="password" />
                            </div>
                            <div className="register-form-div">
                                <label className="register-form-label" htmlFor="conf-password">Confirm Password</label>
                                <input className="register-input-properties" type="password" name="confirm-password" id="conf-password" />
                            </div>
                        </fieldset>
                        <button onClick={toggleModal}> Click</button>
                    </form>
                </main>
            </article>

        </div>
    )

}

export default Profile