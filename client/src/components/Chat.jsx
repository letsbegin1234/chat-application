import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Message from "./Message";
import Navbar from "./Navbar";
import ScrollableFeed from "react-scrollable-feed";
//const socket = io("http://localhost:4000");
const socket = io("/");
var name = "";

const Chat = () => {
  // const [room, setRoom] = useState("");

  //const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [om, setOm] = useState("");
  const { id } = useParams();
  var room = id;

  useEffect(() => {
    //const newName = prompt("Enter your name:");
    name = prompt("Enter your name:");
    setOm("Om");
    // setRoom(id);
    console.log("id is", id);
    joinRoom();
  }, []);

  // useEffect(() => {
  //   while (room == null) {
  //     joinRoom();
  //   }
  // }, []);
  // useEffect(() => {

  //   console.log("room number", room);
  // }, []);
  function joinRoom() {
    //console.log(room);
    const newfool = {
      name: name,
      room: room,
    };
    socket.emit("join_room", newfool);
  }
  function handleSend(e) {
    e.preventDefault();
    const newMessage = {
      name: name,
      room: room,
      message: message,
      side: "left",
    };
    const yourMessage = {
      name: name,
      room: room,
      message: message,
      side: "right",
    };
    setMessages((messages) => [...messages, yourMessage]);
    setMessage("");
    socket.emit("send_message", newMessage);
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log("Data recieved is ", data);
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);
  return (
    <div>
      {om == "Om" ? (
        <div className="parent">
          <Navbar name={name} room={room} />
          <div className="chat">
            <ScrollableFeed>
              {messages.map((msg, index) => (
                <div key={index} className="msg-holder">
                  {msg.side == "left" && (
                    <div className="left">
                      {/* <b>{msg.name}</b>
                      <p>{msg.message}</p> */}
                      <Message name={msg.name} message={msg.message} />
                    </div>
                  )}
                  {msg.side == "right" && (
                    <div className="right">
                      {/* <b>{msg.name}</b>
                      <p>{msg.message}</p> */}
                      <Message name={msg.name} message={msg.message} />
                    </div>
                  )}
                  {msg.side == "center" && (
                    <div className="center">
                      {/* <p>{msg.message}</p> */}
                      <Message message={msg.message} />
                    </div>
                  )}
                </div>
              ))}
            </ScrollableFeed>
          </div>
          <form onSubmit={handleSend} className="sender-div">
            <input
              placeholder="Enter Message: "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">
              <span class="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      ) : (
        <h1>Enter your name:</h1>
      )}
    </div>
  );
};

export default Chat;
