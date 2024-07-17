import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Chat from "../views/Chat";
import Register from "../views/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
    path: "/",
    element: <Chat />,
    loader: () => {
      if (!localStorage.token) {
        // console.log("Must Login First");
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
