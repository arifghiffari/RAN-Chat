import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Chat from "../views/Chat";
import Register from "../views/Register";
import BaseLayout from "../views/BaseLayout";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});
// langsung connect ke socket server
// karena event based communication jadi sama aja kyk socket.emit("connect")

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login socket={socket} />,
    loader: () => {
      if (localStorage.token) {
        // console.log("udh login bos");
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.token) {
        // console.log("udh login bos");
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.token) {
        // console.log("Must Login First");
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Chat socket={socket} />,
      },
    ],
  },
]);

export default router;
