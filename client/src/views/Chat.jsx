import { useState, useEffect } from 'react';
import getUserFromToken from '../utils/auth';

export default function ChatPage({ socket }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  const user = getUserFromToken();

  useEffect(() => {
    // ngeset auth buat socketnya
    socket.auth = {
      username: user.name,
      room: user.phase
    };
    // console.log(socket.auth);

    // kenapa butuh connect manual? supaya bisa set auth dlu sblm connect
    socket.connect();

    socket.on("welcome", (message) => {
      console.log(message);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    socket.on("roomUsers", (roomUsers) => {
      console.log(roomUsers);
    });

    return () => {
      socket.off("message:update");
      socket.off("roomUsers");
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message:new", messageSent);
    setMessageSent("");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((msg) => {
              return (
                <>
                  <div className={msg.from == user.name ? "chat chat-start flex flex-col" : "chat chat-end flex flex-col"}>
                    <div>{msg.from == user.name ? "You" : msg.from}</div>
                    <div className="chat-bubble chat-bubble-accent">{msg.message}</div>
                  </div>
                </>
              );
            })}
          </div>
          <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
            <input onChange={(e) => setMessageSent(e.target.value)} className="flex items-center w-full rounded px-3" type="text" placeholder="Type your message…" />
            <button className="btn btn-base-100 ml-4" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
