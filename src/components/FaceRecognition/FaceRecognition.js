import React from 'react';



const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center pb6 pa3 ma3">
            <div className="absolute mt2 pa3">
                <img alt="bw" src={imageUrl} width='500px' height='auto' />
            </div>
            
        </div>
    )
}

export default FaceRecognition;