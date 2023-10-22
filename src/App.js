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
import Particles from "react-particles";
import { Component } from "react";
import { backgroundOptions, particlesInit } from './particlesOptions';


const userInitialState = {
    imageFormInput: '',
    imageURL: 'https://png.pngitem.com/pimgs/s/623-6236346_person-icon-png-download-person-illustration-transparent-png.png',
    box: {},
    route: "home",
    isSigned: true,
    isProfileOpen: true,
    userProfile: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ""
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = userInitialState;
    }

    // Receive and log input from SearchImage input box to console
    onInputChange = (event) => {
        this.setState({ imageFormInput: event.target.value })
    }

    calculateBoxPosition = (data) => {
        const clarifaiFaceBoxOutput = data.outputs[0].data.regions[0].region_info.bounding_box
        // We're getting our image from "ImageLoad" compnent with the width/height values of the image
        // Thereafter we use the values from our api from "clarifaiFaceBoxOutput" which shows 
        // cordinates of image on where the face was detected, we'll use them and join them all together to form a box around the face
        // then we'll show them visually on the image

        const image = document.getElementById("inputImage")
        // Converting the width/height from string to numbers
        const width = Number(image.width)
        const height = Number(image.height)
        console.log("image width " + width + "\nimage height " + height)
        return {
            "rightCol": width - (clarifaiFaceBoxOutput.right_col * width),
            "bottomRow": height - (clarifaiFaceBoxOutput.bottom_row * height),
            "topRow": clarifaiFaceBoxOutput.top_row * height,
            "leftCol": clarifaiFaceBoxOutput.left_col * width,
        }
    }

    showFaceBox = (box) => {
        this.setState({ box: box })
    }

    loadUser = (user) => {
        this.setState({
            userProfile: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                entries: user.entries,
                joined: user.joined
            }
        })
    }
    // https://rocky-mountain-27857-bc14d0ed0a0a.herokuapp.com/
    onButtonSubmit = () => {
        // const {imageFormInput} = this.props;

        this.setState({ imageURL: this.state.imageFormInput })

        // Fetching prediction made on the image
        // This will then run calculate postion of our Box on that image
        // Then display it on top of the face (if any found)
        fetch("http://localhost:3001/imageurl", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: this.state.imageFormInput
            })
        })
            .then(response => response.json())
            .then(result => {
                this.showFaceBox(this.calculateBoxPosition(result))
                fetch("http://localhost:3001/image", {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: this.state.userProfile.id

                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.userProfile, { entries: count }))
                    })
            }).catch(error => console.log("Failed to fetch data: " + error));
    }

    onRouteChange = (route) => {
        // Change the state of isSigned property depending on the route
        if (route === "signout") {
            this.setState(userInitialState);
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
                        <Rank name={this.state.userProfile.name} entries={this.state.userProfile.entries} />
                        <SearchImage onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <ImageLoad box={this.state.box} imageURL={this.state.imageURL} />
                    </div>
                );
            case "account":
                return <Account onRouteChange={this.onRouteChange} isSigned={this.state.isSigned}/>;
            case "password":
                return <Password onRouteChange={this.onRouteChange} email={this.state.userProfile.email}/>;
            case "delete":
                return <Delete onRouteChange={this.onRouteChange} email={this.state.userProfile.email}/>;
            case "signin":
                return <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
            case "register":
                return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
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
                    <Profile isProfileOpen={this.state.isProfileOpen} toggleModal={this.toggleModal}/>
                    {console.log(this.state.isProfileOpen)}
                </Modal>
                }
                <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} toggleModal={this.toggleModal} />
                {this.pageRouting()}
            </div>
        );
    }
}

export default App;