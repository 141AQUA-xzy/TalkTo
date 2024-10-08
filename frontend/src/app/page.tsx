"use client";
import { useState } from "react";
import { io } from "socket.io-client";
import CategoryIcon from "@mui/icons-material/Category";
import { Chat } from "./Chat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("https://talk-tok-backendd.onrender.com"); // Initialize the socket connection on client-side

// const socket = io("https://localhost:3000"); // Initialize the socket connection on client-side


export default function Home() {
  const [username, setUsername] = useState("");
  const [roomID, setId] = useState("");
  const [showChat, setVisibility] = useState(false);

  const JoinRoom = () => {
    if (username === "" || roomID === "") {
      toast("Username & RoomID are required");
      return;
    }
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
    }
    setVisibility(true);
  };

  return (
    <main id="main" className="bg-custom-conic h-lvh w-['100%'] flex flex-col">
      <ToastContainer />

      <div className="flex flex-row items-center gap-1 text-lg p-5 uxll:text-4xl">
        <CategoryIcon />
        <span className="uppercase text-purple-500 font-extrabold">
          Talk-Tok
        </span>
      </div>
      <div className="flex flex-col m-7 gap-2 items-center justify-center uxll:pt-60 uxlll:pt-96">
        {showChat ? (
          <Chat socket={socket} username={username} room={roomID} />
        ) : (
          <div className="bg-white/20 flex flex-col items-center backdrop-blur-lg rounded-lg p-6 max-w-md my-auto mx-auto">
            <input
              placeholder="Username"
              className="p-1 border rounded-md uxll:h-16 uxll:w-72 m-2 text-black"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              placeholder="RoomID"
              className="p-1 border rounded-md uxll:h-16 uxll:w-72 text-black"
              onChange={(e) => setId(e.target.value)}
            ></input>
            <button
              onClick={JoinRoom}
              className="bg-red-400 rounded-xl uppercase p-2 text-black font-bold uxll:h-8 uxll:w-40 m-2 hover:scale-x-105 hover:-translate-y-1 transition-all ease-in"
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
