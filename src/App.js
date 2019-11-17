import React, {Component} from 'react';
// import Navigation from './components/Navigation/Navigation';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageForm from './components/ImageForm/ImageForm';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';



const app = new Clarifai.App({
  apiKey: 'ea00787c0e474be6ac9562c7192e45f7'
});





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


class App extends Component {
  constructor() {
    super() 
    this.state = {
      value: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }
  

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)
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

    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        this.displayFaceBox(
          this.calculateFaceLocation(response))
         .catch(err => console.log(err))
      }   
    );
  }


  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
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
            <Rank />
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
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange}/>
          )      
        }
      </div>
    )
  }
}

export default App;