import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

interface ChatProps {
  socket: any;
  username: string;
  room: string;
}
interface Message {
  message: string;
  author: string;
  time: string;
}

export function Chat({ socket, username, room }: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data: { message: string; author: string; time: string }) => {
        setMessageList((list) => [...list, data]);
      }
    );
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time" className="text-black">
                      {messageContent.time}
                    </p>
                    <p id="author" className="text-black">
                      {messageContent.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="text-black"
        />
        <button onClick={sendMessage} className="bg-white">
          &#9658;
        </button>
      </div>
    </div>
  );
}
export default Chat;

// import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";

// interface ChatProps {
//   socket: any;
//   username: string;
//   room: string;
// }
// interface Message {
//   message: string;
//   author: string;
//   time: string;
// }
// export function Chat({ socket, username, room }: ChatProps) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState<Message[]>([]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage("");
//     }
//   };
//   useEffect(() => {
//     if (!socket) return; // Ensure socket is defined

//     socket.on(
//       "receive_message",
//       (data: { message: string; author: string; time: string }) => {
//         setMessageList((prevList) => [...prevList, data]);
//       }
//     );

//     return () => {
//       if (socket) {
//         socket.off("receive_message");
//       }
//     };
//   }, [socket]);

//   return (
//     <div>
//       <ScrollToBottom>
//         {messageList.map((messageContent) => {
//           return (
//             <div
//               className="message"
//               id={username === messageContent.author ? "you" : "other"}
//             >
//               <div>
//                 <div className="h-5 w-fit text-center bg-purple-400">
//                   <p>{messageContent.message}</p>
//                 </div>
//                 <div className="message-meta">
//                   <p id="time">{messageContent.time}</p>
//                   <p id="author">{messageContent.author}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </ScrollToBottom>
//       <div>
//         <input
//           className="text-black"
//           type="text"
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//           value={currentMessage}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         ></input>
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }
