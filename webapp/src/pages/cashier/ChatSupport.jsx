import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Button from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import "../../index.css";
function ChatSupport(props) {
  let [messages, setMessages] = useState([
    { name: "Hamza", message: "Where is my order?", id: "@13" },
    { name: "Ali", message: "Burger should be spicy", id: "@23" },
    { name: "Akram", message: "Kindly tell me your order number", to: "@23" },
  ]);
  const SendText = (message) => {
    console.log(message);
    setMessages((messages) => [...messages, message]);
  };
  return (
    <div>
      <ProfileHeader>
        <Button
          label="Go back to Orders"
          onClick={() => props.history.push("/delivery/orders")}
        />
      </ProfileHeader>
      <div
        style={{ paddingRight: "20%", paddingLeft: "20%" }}
        className="chatbox"
      >
        <p>Take Away Customer Support</p>
      </div>
      {ChatSupportBox(messages, SendText)}
    </div>
  );
}

function ChatSupportBox(messages, onsubmit) {
  let [chatText, setChatText] = useState("");
  let [toCustomer, setToCustomer] = useState("");

  function onChangeChat(e) {
    let message = e.target.value;
    let toCustomer = message.substr(0, message.indexOf(" "));
    message = message.substr(message.indexOf(" ") + 1);
    setToCustomer(toCustomer);
    setChatText(message);
  }
  return (
    <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
      <div
        style={{ overflow: "scroll", height: "250px" }}
        className="chatmessages"
      >
        {messages.map((i) => (
          <>
            <p>
              <b>
                {i.name}
                {i.to ? "(cashier) to " + i.to + " : " : i.id + " : "}
              </b>
              {i.message}
            </p>
            <hr></hr>
          </>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="inputmessage"
      >
        <TextField
          style={{ width: "100%" }}
          onChange={(e) => onChangeChat(e)}
          label="Type Here"
        />
        <Button
          redButton
          onClick={() =>
            onsubmit({ name: "Akram", message: chatText, to: toCustomer })
          }
          label="Send"
          mystyle={{
            paddingLeft: "40%",
            paddingRight: "40%",
            paddingBottom: "2px",
            paddingTop: "2px",
            marginTop: "10px",
          }}
        />
      </div>
    </div>
  );
}

export default ChatSupport;
