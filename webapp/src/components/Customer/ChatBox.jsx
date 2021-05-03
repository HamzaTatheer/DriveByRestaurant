import React,{useRef,useEffect,useState} from "react";
import Input from "../ChatInput";


const Message = ({name,message,colored})=>{
    return (
    <div style={colored=== true ? {color:"green"}:{color:"black"}}>{name +": "+ message}<hr/></div>
    )
}


const Messages = (props) => {

  let {myid, messages } = props;

    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);
  
    return (
      <div style={{height:"40vh",overflowY:"scroll"}} className="chat-container">
        {messages.map((message,key) => <Message colored={(message.id != 1 ? true:false)} key={key} {...message} />)}
        <div ref={messagesEndRef} />
      </div>
    )
}



function ChatSystem(props){


    let myId = 1;
    let myName="Hamza (customer)";

    let [history,setHistory] = useState([{id:2,name:"Akram (cashier)",message:"Hey"},{id:1,name:myName,message:"ello"}]);
    let [text,setText] = useState("");


    let sendMessage = ()=>{
        setHistory(hist=>[...hist,{id:myId,name:myName,message:text}]);
        setText("");
    }


    return (
        <div style={props.style}>
                        <Messages style={{height:"90%"}} myid={myId} messages={history}/>
                        <Input ChatInput placeholder="Say something" value={text} onChange={(val)=>setText(val)} onSubmit={()=>sendMessage()}/>
        </div>
    )

}


export default ChatSystem;