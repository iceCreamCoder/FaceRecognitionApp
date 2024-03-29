import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageForm from './components/ImageForm/ImageForm';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';



const particleSettings = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
   interactivity: {
     onhover: {
       enable: true,
     },
      modes: {
       repluse: 100
       
     }
     
   }
  }
}

const initalState = {
  value: '',
  imageUrl: '',
  box: {},
  route:'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor() {
    super() 
    this.state = initalState
  }
  


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
   const clarifaiFaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById("inputimage");
   const width = Number(image.width);
   const height = Number(image.height);
    return {
      leftCol: clarifaiFaceData.left_col * width,
      topRow: clarifaiFaceData.top_row * height,
      rightCol: width - (clarifaiFaceData.right_col * width),
      bottomRow: height - (clarifaiFaceData.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonChange = () => {
    this.setState({
      imageUrl: this.state.input
   })
   fetch('https://limitless-headland-17401.herokuapp.com/imageurl', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
   .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://limitless-headland-17401.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {
              entries: count
            }))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
         
    })
    .catch(err => console.log(err))
  }
   

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initalState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({
      route: route
    })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return ( 
      <div className="App">
        <Particles  className="particles"
          params={particleSettings}
        />

        <Navigation 
        isSignedIn={isSignedIn}
        onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
          <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
              />
            <ImageForm
              onButtonChange={this.onButtonChange}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          :  (
            route === 'signin'
              ? <SignIn 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange} />
              : <Register 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}/>
          )      
        }
      </div>
    )
  }
}

export default App;