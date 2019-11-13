import React from 'react';
import './FaceRecognition.css';



const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center pb6 pa3 ma3">
            <div className="absolute mt2 pa3">
                <img id="inputimage" alt="bw" src={imageUrl} width='500px' height='auto' />
                <div
                 style={{
                     top: box.topRow,
                     left: box.leftCol,
                     right: box.rightCol,
                     bottom: box.bottomRow
                 }}
                 className="bounding-box"
                 >

                 </div>
            </div>
        </div>
    )
}

export default FaceRecognition;