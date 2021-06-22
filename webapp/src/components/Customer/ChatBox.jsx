import React,{useRef,useEffect,useState, useCallback} from "react";
import Input from "../ChatInput";
import {useReducer, useSelector} from "react-redux";
import io from "socket.io-client";
import socketUrl from "../../utilities/socketUrl";



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

    let user = useSelector(state=>state.user);

    let [history,setHistory] = useState([]);
    let [text,setText] = useState("");

    const socket = io(socketUrl, {reconnectionDelayMax: 10000});

    useEffect(()=>{
      socket.on("message",(d)=>{
        //d = JSON.parse(d);
        console.log(d);
        //setHistory(hist=>[...hist,{id:d.id,phone:d.phone,role:d.role,message:d.message}])
        if(user.role===1)//is cashier so see all messages
          setHistory(hist=>[...hist,{id:d.id,name:d.name,role:d.role,message:d.message}]);
        else if(user.role===2)//is customer see only some messages
        {

          if(d.role===1){
            if(d.to === user.phone)
              setHistory(hist=>[...hist,{id:d.id,name:"Customer Support",role:d.role,message:d.message}]);
          }
        }


      })

      return ()=>{
        socket.off("message");
      }

    },[socket,setHistory])


    let sendMessage = ()=>{

      setHistory(hist=>[...hist,{id:user.id,name:user.phone,message:text}]);
      setText("");

      if(user.role === 1){
        let firstPart = text.substr(0,text.indexOf(' '));
        let secondPart = text.substr(text.indexOf(' ')+1);
        alert("Sending");
        socket.emit("message",{id:user.id,role:user.role,name:user.phone,message:secondPart,to:firstPart});
      }
      else if(user.role===2){
        socket.emit("message",{id:user.id,role:user.role,name:user.phone,message:text,to:null});
      }

    }


    return (
        <div style={props.style}>
                        <Messages style={{height:"90%"}} myid={user.id} messages={history}/>
                        <Input ChatInput placeholder="Say something" value={text} onChange={(val)=>setText(val)} onSubmit={()=>sendMessage()}/>
        </div>
    )

}


export default ChatSystem;