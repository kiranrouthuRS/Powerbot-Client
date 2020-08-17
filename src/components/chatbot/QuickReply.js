import React from 'react';
import '../css/QuickReply.css';

const QuickReply = (props) => {
    // console.log(props)
    if(props.reply.payload) {
        return (
            <div>
                <a style={{margin: 1, borderRadius: '20px'}} href="/#" className="btn waves-effect waves-light hoverable z-depth-1 blue"
                onClick={(event) => {
                    props.click(
                        event,
                        props.reply.payload,
                        props.reply.title,
                    )
                }}>
                    <label>
                    <input className="button" name={props.reply.title} type="button" />
                    <span className="white-text" style={{color: '#ffffff'}}>{props.reply.title}</span>
                    </label>
                </a>
            </div>

        );
    } else {
        return (
            <div>
                <a style={{margin: 3, borderRadius: '20px'}} href={props.reply.structValue.fields.link.stringValue} 
                className="btn waves-effect waves-light hoverable z-depth-1 blue">
                    {props.reply.title}
                </a>
            </div>
        );
    }

}

export default QuickReply;