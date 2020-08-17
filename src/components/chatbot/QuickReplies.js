import React, { Component } from 'react';
import QuickReply from './QuickReply';
import bot1 from '../../images/during_chat.png';


class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, payload, text) {
        // console.log(event, payload, text)
        this.props.replyClick(event, payload, text);
    }

    renderQuickReply(reply, i) {
        // console.log(reply,i)
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if(quickReplies) {
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
            })
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="col s12 m8 offset-m2 16 offset-13">
                {/* <div className="card-panel grey lighten-5 z-depth-1"> */}
                    <div className="row valign-wrapper">
                        <div className="col s2">
                        <a className=" waves-effect waves-light" href='/#' style={{backgroundColor: '#ffffff', marginTop: 20}}><img src={bot1} alt="" style={{width: '40px', height: '40px', backgroundColor: '#ffffff'}} /></a>
                        </div>
                        <div className="col s10" id="quick-replies">
                            {/* {console.log(this.props)} */}
                            {this.props.text && <p>
                            {this.props.text.stringValue}
                            </p>
                            }
                            <div className=" col s10">
                                {this.renderQuickReplies(this.props.payload)}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}

export default QuickReplies;