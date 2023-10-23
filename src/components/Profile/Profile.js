import React from "react";
import defaultProfileIcon from "../Profile-Icon/img/defaultProfileIcon.png"
import "./Profile.css"

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            entries: this.props.user.entries
        }
    }

    onFormChange = (event) => {
        switch(event.target.name){
            case "name":
                this.setState({name: event.target.value})
                break;
            
        }
    }

    onProfileUpdate = (data) => {
        fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({formInput: data})
        })
        .then(res => {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user, ...data});
            }).catch(console.log)
    }

    render(){
        const { name } = this.state
        return(
            <div className = "profile-container" >
                <article className="profile-article-html">
                    <main className="profile-main-html">
                        <form className="profile-form-contents">
                            <fieldset id="profile" className="profile-form-grouping">
                                <div className="top-profile-container">
                                    <img className="profile-img" src={defaultProfileIcon}></img>
                                    <legend className="profile-label">Profile</legend>
                                    <div className="profile-exit" onClick={this.props.toggleModal}>X</div>
                                </div>
                                <hr />
                                <p className="profile-name-display">{this.state.name}</p>
                                <p className="profile-image-display">Images submitted: {this.props.user.entries}</p>
                                <hr />
                                <div className="profile-form-div">
                                    <label className="profile-form-label" htmlFor="name">Name</label>
                                    <input  onChange={this.onFormChange} className="profile-input-properties" type="text" name="name" id="name" placeholder={this.props.user.name} />
                                </div>
                            </fieldset>
                            <div>
                                <button className="save-changes" onClick={() => this.onProfileUpdate({name})}>Save Changes</button>
                                <button className="cancel-changes" onClick={this.props.toggleModal}>Cancel</button>
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        )
    }
}


export default Profile