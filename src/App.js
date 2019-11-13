import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageForm from './components/ImageForm/ImageForm';
import './App.css';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js'


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
      box: {}
    }
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


  render() {
    return (
      <div className="App">
        <Particles  className="particles"
          params={particleSettings}
        />

        <Navigation />
         <Logo />
        <Rank />
        <ImageForm onButtonChange={this.onButtonChange} onInputChange={this.onInputChange}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
      </div>
    )
  }
}

export default App;