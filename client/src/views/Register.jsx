import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../utils/url";
import Toastify from "toastify-js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState("");
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${url}/register`, { name, email, password, phase });
      console.log(data);

      navigate("/login");
    } catch (error) {
      //   console.log(error.response.data.message);
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FF0000, #FF7637)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <header className="p-5">
        <center>
          <h1 className="text-3xl font-bold">
            <i className="fas fa-smile"></i> RAN CHAT
          </h1>
          <h2 className="text-3xl font-bold">Register</h2>
        </center>
      </header>
      <main className="flex flex-col items-center w-full max-w-md p-5 bg-white rounded shadow-md">
        <form action="chat.html" className="w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="Email"
              id="Email"
              placeholder="Enter Email..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter Password..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">
              Phase
            </label>
            <input
              onChange={(e) => setPhase(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handleRegister}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <br />
          <Link to="/login">Login</Link>
        </form>
      </main>
    </div>
  );
}
