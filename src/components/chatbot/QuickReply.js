import React, { Component } from 'react';
import '../css/QuickReply.css';


class QuickReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            black: true
         }
    }
    changeColor(){
        this.setState({black: !this.state.black})
     }
// const QuickReply = (props) => {
    // console.log(props)
    render () {
        // let btn_class = this.state.black ? "bubbleQuickReply" : "bubbleQuickReplySelect";
        if(this.props.reply.payload) {
            return (
                <div>
                    <a style={{margin: 1, borderRadius: '20px', borderColor: 'black'}} href="/#" className="waves-effect waves-light hoverable bubbleQuickReply "
                    onClick={(event) => {
                        this.props.click(
                            event,
                            this.props.reply.payload,
                            this.props.reply.title,
                        )
                    }}>
                        <label>
                        {/* <input className="button" name={props.reply.title} type="button" /> */}
                        <span  style={{color: '#000000'}}>{this.props.reply.title}</span>
                        </label>
                    </a>
                </div>
    
            );
        } else {
            return (
                <div>
                    <a style={{margin: 3, borderRadius: '20px'}} href={this.props.reply.structValue.fields.link.stringValue} 
                    className="btn waves-effect waves-light hoverable z-depth-1 blue">
                        {this.props.reply.title}
                    </a>
                </div>
            );
        }
    }
}



export default QuickReply;