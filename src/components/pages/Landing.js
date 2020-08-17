import React from 'react';
import '../css/Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            <div className="landingMenu" style={{width: "900px", height: "632px", display: "flex", justifyContent: "center"}}>
            <h2 className="lighten-5" style={{marginTop: 0, color:"#ffffff", fontSize: 50, fontFamily: "san-serif", fontWeight:40}}><b> Finest Product Range For Diverse Industries</b></h2>
            </div>
            {/* <img src={bg1} alt="" styles={{ width: '100%'}} /> */}

        </div>
    )

}

export default Landing;