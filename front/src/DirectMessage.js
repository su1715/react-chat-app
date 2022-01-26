import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from "./Messages";
import Input from "./Input";
const ENDPOINT = "http://localhost:5001";
let socket;

const DirectMessage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);
  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("chat message", { txt: message, date: new Date() });
    setMessage("");
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default DirectMessage;
