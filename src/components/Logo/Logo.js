import React from 'react';
import 'tachyons';
import Tilt from 'react-tilt'
import './Logo.css'
import logo from './logo.png';

const Logo = () => {
    return (
     <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-4" options={{ max: 65 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> <img alt="logo" src={logo} /> </div>
            </Tilt>
     </div>
    )
}

export default Logo;