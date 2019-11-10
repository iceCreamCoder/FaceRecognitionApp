import React from 'react';
import 'tachyons';
import './ImageForm.css'


const ImageForm = ({onInputChange, onButtonChange}) => {
    return (
        <div className="ma4 mt0">
           <p className="f3">
            {`Watch this AI detect faces in your pictures! Lets give it a try.`}
           </p>
            
           <div className="center ">
               <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange} />
                    <button
                     className="w-30 grow f4 link ph3 pv3 dib white bg-dark-blue pointer" onClick={onButtonChange}>Search Image</button>
               </div>
           </div>
        </div>
    )
}

export default ImageForm;