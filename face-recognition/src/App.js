import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SearchImage from './components/SearchImage/SearchImage';
import Rank from './components/Rank/Rank';
import ImageLoad from './components/ImageLoad/ImageLoad';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import Particles from "react-particles";
import { Component } from "react";
import { backgroundOptions, particlesInit } from './particlesOptions';

const userInitialState = {
    input: '',
    imageURL: 'https://png.pngitem.com/pimgs/s/623-6236346_person-icon-png-download-person-illustration-transparent-png.png',
    box: {},
    route: "signin",
    isSigned: false,
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
        this.setState({ input: event.target.value })
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

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input })

        // Fetching prediction made on the image
        // This will then run calculate postion of our Box on that image
        // Then display it on top of the face (if any found)
        fetch("https://boiling-shelf-42050-35ffdcb53fa2.herokuapp.com/imageurl", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        input: this.state.input
                    })
                })
            .then(response => response.json())
            .then(result => {
                this.showFaceBox(this.calculateBoxPosition(result))
                fetch("https://boiling-shelf-42050-35ffdcb53fa2.herokuapp.com/image", {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: this.state.userProfile.id

                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.userProfile, {entries: count}))
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

    // Display appropriate components based on current page/root they're on
    render() {
        return (
            <div className='App'>
                <Particles
                    id='tsparticles'
                    init={particlesInit}
                    options={backgroundOptions}
                />
                <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} />
                {this.state.route === "home"
                    ?
                    <div>
                        <Logo />
                        <Rank name={this.state.userProfile.name} entries={this.state.userProfile.entries} />
                        <SearchImage onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <ImageLoad box={this.state.box} imageURL={this.state.imageURL} />
                    </div>
                    : (
                        this.state.route === "signin"
                            ?
                            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                            :
                            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />

                    )
                }
            </div>
        );
    }
}

export default App;