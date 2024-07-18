import { useState, useEffect, useContext} from 'react';
import getUserFromToken from '../utils/auth';
import { ThemeContext } from '../context/ThemeContext';

export default function ChatPage({ socket }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  const user = getUserFromToken();
  // const inputRef = useRef(null); // add a ref to the input field

  const botName = "RAN Chat Bot";

  useEffect(() => {
    socket.auth = {
      username: user.name,
      room: user.phase
    };

    socket.connect();

    socket.on("welcome", (message) => {
      setMessages((current) => [...current, { from: botName, message }]);
    });

    socket.on("message", (message) => {
      setMessages((current) => {
        return [...current, { from: botName, message }];
      });
    });

    socket.on("message:update", (newMessage) => {
      setMessages((current) => [...current, newMessage]);
    });

    socket.on("roomUsers", (roomUsers) => {
      console.log(roomUsers);
    });

    return () => {
      socket.off("welcome")
      socket.off("message")
      socket.off("message:update");
      socket.off("roomUsers");
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const message = messageSent.trim(); // get the current value of the input field
    if (message) {
      socket.emit("message:new", message);
      setMessageSent(""); // clear the input field
    }
  }

  const { currentTheme, theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10" data-theme={theme[currentTheme].dataTheme}>
      <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className={msg.from === user.name ? "chat chat-start flex flex-col" : "chat chat-end flex flex-col"}>
              <div>{msg.from === user.name ? "You" : msg.from}</div>
              <div className="chat-bubble chat-bubble-accent">{msg.message}</div>
            </div>
          ))}
        </div>
        <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
          <input onChange={(e) => setMessageSent(e.target.value)} value={messageSent} className="flex items-center w-full rounded px-3" type="text" placeholder="Type your message…" />
          <button className="btn btn-base-100 ml-4" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

