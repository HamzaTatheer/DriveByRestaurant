import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Button from "../../components/Button";
import ChatBox from "../../components/Customer/ChatBox";

function ChatSupport(props) {

  return (
    <div>
      <ProfileHeader>
        <Button
          label="Go back to Orders"
          onClick={() => props.history.push("/cashier/orders")}
        />
      </ProfileHeader>
      <div
        style={{ paddingRight: "20%", paddingLeft: "20%" }}
        className="chatbox"
      >
        <p>Take Away Customer Support</p>
      </div>
        <ChatBox/>
    </div>
  );
}

export default ChatSupport;
