import React from 'react';
import '../css/Message.css';
import bot1 from '../../images/during_chat.png';
import bot5 from '../../images/user.png';

const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            {/* <div className="card-panel grey lighten-5 z-depth-1"> */}
                <div className="row valign-wrapper">
                    {props.speaks === 'bot' &&
                    <div className="col s3" style={{marginLeft: '5px'}}>
                        <a className=" waves-effect waves-light" href='/#' style={{backgroundColor: '#ffffff', marginTop: 50}}><img src={bot1} alt="" style={{width: '40px', height: '40px', backgroundColor: '#ffffff', marginTop: 8}} /></a>
                    </div>
                    }
                    <div className="col s10">
                        {props.speaks === 'bot' &&
                            <div className="left-align">
                                <p className="bubblebot hoverable lighten-5 z-depth-1">
                                <span className="white-text ">
                                    {props.text}
                                </span>
                                </p>
                            </div>
                        }
                        {props.speaks === 'me' &&
                            <div className="right-align ">
                                <p className="">
                                <span className="white-text bubble hoverable lighten-5 z-depth-1">
                                    {props.text}
                                </span></p>
                            </div>
                        }
                    </div>
                    {props.speaks === 'me' &&
                    <div className="col s3">
                        <a className="waves-effect waves-light" href='/#' style={{backgroundColor: '#ffffff', marginTop: 50}}><img src={bot5} alt="" style={{width: '20px', height: '30px', backgroundColor: '#ffffff', marginTop: 8}} /></a>
                    </div>
                    }
                </div>
            {/* </div> */}
        </div>
    )
}

export default Message;