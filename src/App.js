import Navigation from './components/Navigation/Navigation';
import SearchImage from './components/SearchImage/SearchImage';
import Rank from './components/Rank/Rank';
import ImageLoad from './components/ImageLoad/ImageLoad';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Account from './components/Account/Account';
import Password from './components/Password/newPassword';
import Delete from './components/Delete/deleteUser';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal'
import Verification from './components/Verification/Verification';
import Particles from "react-particles";
import { Component } from "react";
import { backgroundOptions, particlesInit } from './particlesOptions';
import defaultProfileIcon from "./img/defaultProfileIcon.png";
import defaultFaceImage from "./img/defaultFaceImage.png";


const userInitialState = {
    imageFormInput: "",
    imageURL: defaultFaceImage,
    box: {},
    route: "signin",
    isSigned: false,
    isProfileOpen: false,
    error: "",
    userProfile: {
        id: "",
        name: "",
        email: "",
        password: "",
        profileImg: defaultProfileIcon,
        entries: 0,
        joined: ""
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = userInitialState;
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            fetch("http://localhost:3001/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data && data.id) {
                        fetch(`http://localhost:3001/profile/${data.id}`, {
                            method: "get",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token
                            }
                        })
                            .then(res => res.json())
                            .then(user => {
                                if (user && user.email) {
                                    if (user.profile_img) {
                                        // We are converting the bytea to base64 to display it on frontend
                                        user.profileImg = `data:image/jpeg;base64,${user.profile_img}`;
                                    }else {
                                        user.profileImg = this.state.userProfile.profileImg;
                                    }
                                    this.loadUser(user);
                                    this.onRouteChange("home");
                                }
                            })
                    }
                })
                .catch(this.onRouteChange("signin"))
        }
    }

    // Receive and log input from SearchImage input box to console
    onInputChange = (event) => {
        this.setState({ imageFormInput: event.target.value })
    }

    calculateBoxPosition = (data) => {
        if (data && data.outputs) {
            const clarifaiFaceBoxOutput = data.outputs[0].data.regions[0].region_info.bounding_box
            // We're getting our image from "ImageLoad" compnent with the width/height values of the image
            // Thereafter we use the values from our api from "clarifaiFaceBoxOutput" which shows 
            // cordinates of image on where the face was detected, we'll use them and join them all together to form a box around the face
            // then we'll show them visually on the image

            const image = document.getElementById("inputImage")
            // Converting the width/height from string to numbers
            const width = Number(image.width)
            const height = Number(image.height)
            return {
                "rightCol": width - (clarifaiFaceBoxOutput.right_col * width),
                "bottomRow": height - (clarifaiFaceBoxOutput.bottom_row * height),
                "topRow": clarifaiFaceBoxOutput.top_row * height,
                "leftCol": clarifaiFaceBoxOutput.left_col * width,
            }
        }
        return
    }

    showFaceBox = (box) => {
        if (box) {
            this.setState({ box: box })
        }
        return
    }

    loadUser = (user) => {
        this.setState({
            userProfile: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                profileImg: user.profileImg,
                entries: user.entries,
                joined: user.joined
            }
        })
    }

    // https://rocky-mountain-27857-bc14d0ed0a0a.herokuapp.com/
    onButtonSubmit = () => {
        const token = window.sessionStorage.getItem('token');
        this.setState({ imageURL: this.state.imageFormInput })

        // Fetching prediction made on the image
        // This will then run calculate postion of our Box on that image
        fetch("http://localhost:3001/imageurl", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                input: this.state.imageFormInput
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result !== "Failed to work with API." && result.status.code !== 30002) {
                    this.showFaceBox(this.calculateBoxPosition(result))
                    fetch("http://localhost:3001/image", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        body: JSON.stringify({
                            id: this.state.userProfile.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.userProfile, { entries: count }))
                        })
                        this.setState({error: ""})
                }else {
                    this.setState({error: "Please enter valid face image URL"})
                }
            }).catch(error => console.log("Failed to fetch data: " + error));
    }


    onRouteChange = (route) => {
        // Change the state of isSigned property depending on the route
        if (route === "signout") {
            this.setState(userInitialState);
            sessionStorage.removeItem("token")
        } else if (route === "home") {
            this.setState({ isSigned: true });
        }
        this.setState({ route: route });
    }

    // Improved routing for our app, any existing app routes should be mentioned in here
    pageRouting() {
        switch (this.state.route) {
            case "home":
                return (
                    <div>
                        <Rank name={this.state.userProfile.name} entries={this.state.userProfile.entries} error={this.state.error}/>
                        <SearchImage onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <ImageLoad box={this.state.box} imageURL={this.state.imageURL} />
                    </div>
                );
            case "account":
                return <Account onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} />;
            case "password":
                return <Password onRouteChange={this.onRouteChange} email={this.state.userProfile.email} />;
            case "delete":
                return <Delete onRouteChange={this.onRouteChange} email={this.state.userProfile.email} />;
            case "signin":
                return <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} defaultProfileImg={this.state.userProfile.profileImg} />;
            case "register":
                return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
            case "verify":
                return <Verification email={this.state.userProfile.email} />;
            default:
                return <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isProfileOpen: !prevState.isProfileOpen
        }))

    }

    // Display appropriate components based on current page/root they're on
    render() {
        return (
            <div className='App'>
                <Particles
                    id='tsparticles'
                    init={particlesInit}
                    options={backgroundOptions}
                />
                {this.state.isProfileOpen &&
                    <Modal>
                        <Profile isProfileOpen={this.state.isProfileOpen} user={this.state.userProfile} toggleModal={this.toggleModal} loadUser={this.loadUser} defaultProfileImg={defaultProfileIcon}/>
                        {console.log(this.state.isProfileOpen)}
                    </Modal>
                }
                <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} toggleModal={this.toggleModal} userProfileImg={this.state.userProfile.profileImg} defaultProfileImg={defaultProfileIcon}/>
                {this.pageRouting()}
            </div>
        );
    }
}

export default App;