import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';
import FileUpload from './FileUpload';
import { withRouter } from 'react-router-dom';
import '../css/Chatbot.css';
import bot1 from '../../images/Bottom_right_logo.png';
import send from '../../images/Send_Btn.png';
import bot2 from '../../images/during_chat.png';
import publicIp from 'public-ip';

const cookies = new Cookies();
// const systemIp = localIpUrl ('private');
const systemPublicIp = publicIp.v4();


class Chatbot extends Component {

    messageEnd;
    textFocus;
    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleInputIconPress = this._handleInputIconPress.bind(this);
        this._handleInputOnChange = this._handleInputOnChange.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this._handleFileUpload = this._handleFileUpload.bind(this);
        this._handleFileUpload1 = this._handleFileUpload1.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.state = {
            messages: [],
            showBot: true,
            shopWelcomeSent: false,
            selectedFile: null,
            textEvent: '',
            showTextArea: false,
        };
        if(cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/'});
        }
        // console.log(cookies.get('userID'))
    }

    async df_text_query(question, queryText) {
        let says= {
            speaks: 'me',
            msg:{
                    sender: 'me',
                    bot_id: 1,
                    question: question,
                    text: queryText,
                    ip: systemPublicIp,
                    location: window.location.origin,
                    sessionId: cookies.get('userID')
                }
        };
        this.setState({messages: [...this.state.messages, says]})
        console.log(this.state.messages)
        console.log(window.location.origin)
        const res = await axios.post('http://3.19.204.159:8000/client-form', says.msg);
        console.log(res.data, "text response Object");
        for(let msg of res.data) {
            says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({messages: [...this.state.messages, says]});
            if( msg.answer_type ==='TEXT'){
                this.setState({showTextArea: true})
            } else {
                this.setState({showTextArea: false})
            }
        }
    }

    async df_event_query(question, eventName) {
        let says= {
            speaks: 'me',
            msg:{
                    sender: 'me',
                    bot_id: 1,
                    question: question,
                    text: eventName,
                    ip: systemPublicIp,
                    sessionId: cookies.get('userID')
                }
        };
        console.log(says.msg)
        const res = await axios.post('http://3.19.204.159:8000/client-form', says.msg);
        console.log(res.data, "event response Object");
        for(let msg of res.data) {
            let says = {
                    speaks: 'bot',
                    msg: msg
                };
            this.setState({messages: [...this.state.messages, says]});
            if( msg.answer_type ==='TEXT'){
                this.setState({showTextArea: true})
            } else {
                this.setState({showTextArea: false})
            }
        }

        console.log(this.state.messages)
        
    }

    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x*1000)
        })
    }

    async componentDidMount() {
        this.df_event_query('welcome', 'yes');
        (async () => {
            await systemPublicIp;
        })();
 
    }

    componentDidUpdate() {
        this.messageEnd.scrollIntoView({ scrollBehavior: 'smooth'});
        if(this.textFocus) {
            this.textFocus.focus();
        }
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: true});
    }

    _handleQuickReplyPayload(event, payload, title) {
        // console.log(event, payload, title)
        // console.log(this.state.messages.slice(-1)[0].msg.question)
        let question = this.state.messages.slice(-1)[0].msg.question;
        event.preventDefault();
        event.stopPropagation();
        switch (payload) {
            case 'recommended_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            case 'treatment_covid':
                this.df_event_query('COVID');
                break;
            default:
                this.df_text_query(question,title);
                break;
        }
    }


    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
    }

    renderOneMessage(message, i) {
        if(message.msg) {
                console.log(message)
            }
 
        if(message.msg &&
            message.msg.question &&
            message.msg.suggested_answers && message.msg.answer_type ==='TEXT') {
            return <Message key={i} speaks={message.speaks} text={message.msg.question} />
        } 
        else
        if(message.msg && message.msg.question && !message.msg.suggested_answers) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text} />
        } else if(message.msg && message.msg.text && message.msg.buttons && message.msg.images) {
            return <div key={i}>
                        <div className="card-panel grey lighten-5 z-depth-1">
                            <div style={{overflow: 'hidden'}}>
                                <div className="col s1">
                                    <a className="waves-effect waves-light" href='/#'><img src={bot1} alt="" style={{width: '50px', height: '50px'}} /></a>
                                </div>
                                <div style={{overflow: 'auto'}}>
                                    <div style={{height: 250, width: message.msg.payload.fields.cards.listValue.values.length * 200}}>
                                        {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                
        } else if(message.msg &&
            message.msg.question &&
            message.msg.suggested_answers && message.msg.answer_type ==='RADIO') {
                return <div key={i}>
                    
                <Message speaks={message.speaks} text={message.msg.question} />
                <QuickReplies
                text={message.msg.suggested_answers.title ? message.msg.suggested_answers.title : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.suggested_answers} />
                </div>

            }else if(message.msg &&
                message.msg.question &&
                message.msg.suggested_answers && message.msg.answer_type ==='FILE') {
                    return <div>
                        <FileUpload uploadClick= {this._handleFileUpload} speaks={message.speaks} key={i}/>
                    </div>
            }else if(message.msg &&
                message.msg.question &&
                message.msg.suggested_answers && message.msg.answer_type ==='SELECT') {
                    return <div key={i}>
                        
                    <Message speaks={message.speaks} text={message.msg.question} />
                    <QuickReplies
                    text={message.msg.suggested_answers.title ? message.msg.suggested_answers.title : null}
                    key={i}
                    replyClick={this._handleQuickReplyPayload}
                    speaks={message.speaks}
                    payload={message.msg.suggested_answers} />
                    </div>
    
                }
    }

    renderMessages(stateMessages) {
        if(stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i)
            })
        } else {
            return null;
        }
    }

    renderExtras(stateMessages) {
        if(stateMessages) {
            return stateMessages.map((message, i) => {
                if(message.msg &&
                    message.msg.question &&
                    message.msg.suggested_answers && message.msg.answer_type ==='FILE') {
                        return  <div key={i}>
                        <FileUpload changeClick= {this._handleFileUpload} speaks={message.speaks} key={i} uploadClick={this._handleFileUpload1}/>
                    </div>
                    } else {
                        return null
                    }

            })
        } else {
            return null;
        }


    }

    _handleInputKeyPress(e) {
        let question = this.state.messages.slice(-1)[0].msg.question;
        if(e.key === 'Enter') {
            console.log(e.target.value)
            this.df_text_query(question ,e.target.value);
            e.target.value = '';
            this.setState({textEvent: ''});
        }
    }

    _handleInputOnChange(e) {
        if(e.target.value) {
            this.setState({ textEvent: e.target.value})
        }else {
            e.target.value=''
        }
        
    }

    async _handleInputIconPress(){

        let question = this.state.messages.slice(-1)[0].msg.question;
        await this.df_text_query(question, this.state.textEvent);
        this.setState({textEvent: ''})
    }

    _handleFileUpload(event) { 
        console.log(event.target.files[0]);
        this.setState({selectedFile: event.target.files[0] }); 
        
    }

    _handleFileUpload1() {
            const formData = new FormData(); 
        
            // Update the formData object 
            formData.append( 
            "myFile", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
            ); 
            console.log(this.state.selectedFile);
            console.log(formData) 
            // axios.post("api/uploadfile", formData); 
    }

    render() {
        if(!this.state.showBot) {
            return (
                <div className='chatbot scale-transition' style={{minHeight: '520px', maxHeight: '500px', width: '30%', position: 'absolute', bottom: 80, right: 50, border: '1px solid lightgrey', backgroundColor: 'white'}}>
                    <nav className="header" style={{height: 80, borderTopLeftRadius: '15px', borderTopRightRadius: '15px',  backgroundColor: '#ffffff', display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
                        <div style={{margin:-8}}>
                        <img src={bot2} alt="" className="waves-effect waves-light lighten-5" style={{width: '200px', height: '200px', margin: 0}} />
                        </div>
                        <div style={{margin:-27}}>
                        <a href="/" className="black-text" style={{margin: 0}}>-</a>
                        </div>
                    </nav>
                    <div style={{overflow: 'hidden'}}>
                        <div id='chatbot' style={{height: 350, width:'99%', overflow: 'auto', scrollBehavior: 'smooth', overflowX: 'hidden'}}>
                            {this.renderMessages(this.state.messages)}
                            <div ref={(el) =>{this.messageEnd = el;}}
                                style={{float:'left', clear:'both'}}>
                            </div>
                        </div>
                        <div id='chatbot' style={{height: 30, width:'99%', overflow: 'auto', scrollBehavior: 'smooth', overflowX: 'hidden'}}>
                            {this.renderExtras(this.state.messages)}
                        </div>
                        {this.state.showTextArea? <div>
                        <hr className="divider" style={{margin: 0, color: '#ff0000', backgroundColor: '#ff0000'}}></hr>
                        <div className="col s12" style={{display: "flex",justifyContent: "center",alignItems: "center",}}>
                            <div className= "col s10 input-container" style={{flexGrow: 3}}>
                                <input type="text" style={{margin: 0, bottom: 0, paddingRight: '1%', paddingLeft: '1%', width: '98%',borderBottomStyle: 'none' }} 
                                ref={(input)=>{this.textFocus = input;}} placeholder="Type Your Message" value={this.state.textEvent}
                                onKeyPress={this._handleInputKeyPress} onChange={this._handleInputOnChange}/>
                            </div>
                            <div className="col s2" style={{marginRight:10}}>
                            <img src={send} alt="" className="waves-effect waves-light lighten-5" onClick={this._handleInputIconPress} style={{width: '30px', height: '30px', margin: 0}} />
                            </div>
                        </div>
                        </div>:<div></div>}
                        
                    </div>
                    <div className="fixed-action-btn">
                        <a className="waves-effect waves-light " onClick={this.hide} href="/#">
                        <img src={bot1} alt="" className="waves-effect waves-light hoverable lighten-5" style={{width: '70px', height: '60px'}} />
                        </a>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">Roundbot</a>
                            <ul id= "nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav> */}
                    
                    <div className="fixed-action-btn">
                        <a className="waves-effect waves-light" onClick={this.show} href="/#">
                        <img src={bot1} alt="" className="hoverable lighten-5" style={{width: '70px', height: '60px'}} />
                        </a>
                    </div>
                    <div ref={(el) =>{this.messageEnd = el;}}
                            style={{float:'left', clear:'both'}}>
                    </div>

                </div>
            );
        }

    }

}

export default withRouter(Chatbot);