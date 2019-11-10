import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageForm from './components/ImageForm/ImageForm';
import './App.css';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js'



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
  render() {
    return (
      <div className="App">
        <Particles  className="particles"
          params={particleSettings}
        />

        <Navigation />
         <Logo />
        <Rank />
        <ImageForm />
        <FaceRecognition /> 
      </div>
    )
  }
}

export default App;