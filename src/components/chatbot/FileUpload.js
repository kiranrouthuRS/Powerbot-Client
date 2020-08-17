import React from 'react';
import '../css/Message.css';
// import bot5 from '../../images/user.png';

const FileUpload = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3" style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            <div className="col s9" style={{marginLeft: '5px'}} >
            <input type="file" onChange={(event) => {
                props.changeClick(event)
            }} /> 
            </div>
            <div className="col s2">
            <button onClick={(event) => 
                props.uploadClick()}> 
                  Upload! 
                </button> 
            </div>
        </div>
    )
}

export default FileUpload;