import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Messages from "./Messages";
import Input from "./Input";
const ENDPOINT = "http://localhost:5001";
let id = Math.random();
let socket;
const Chat = () => {
  const [invisible, setInvisible] = useState("");
  const [invisibleList, setInvisibleList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleNewMessage = useCallback(() => {
    setMessages([...messages, ...invisibleList]);
    setInvisibleList([]);
  }, [messages, invisibleList]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("chat message", (msg_server) => setInvisible(msg_server));
  }, []);

  useEffect(() => {
    if (invisible !== "") {
      setInvisibleList((prev) => [...prev, invisible]);
      setInvisible("");
    }
  }, [invisible]);

  useEffect(() => {
    invisibleList.length > 0 &&
      invisibleList[invisibleList.length - 1].id === id &&
      handleNewMessage();
  }, [handleNewMessage, invisibleList]);

  const sendMessage = () => {
    socket.emit("chat message", { id: id, txt: message, date: new Date() });
    setMessage("");
  };

  return (
    <div className="container">
      <Messages messages={messages} />
      {invisibleList.length > 0 ? (
        <button
          onClick={handleNewMessage}
        >{`안읽은 메세지 ${invisibleList.length}개`}</button>
      ) : null}
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
