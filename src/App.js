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
      value: ''
    }
  }
  


  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonChange = () => {
    console.log("button pressed")
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function (response) {
        // do something with response
        console.log(response)
      },
      function (err) {
        // there was an error
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
        <FaceRecognition /> 
      </div>
    )
  }
}

export default App;