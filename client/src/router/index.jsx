import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Chat from "../views/Chat";
import Register from "../views/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Chat />,
  },
]);

export default router;
