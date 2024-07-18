import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../utils/url";
import Toastify from "toastify-js";
import { ThemeContext } from "../context/ThemeContext";

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
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF7637)",
        },
      }).showToast();
    }
  }

  const { currentTheme, theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme[currentTheme].dataTheme}>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              <i className="fas fa-smile"></i> RAN CHAT
            </h1>
            <p className="py-6">Register to join the chat and connect with your friends!</p>
          </div>
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="text-center text-3xl font-bold mb-6">Register</h2>
              <form className="w-full">
                <div className="form-control mb-4">
                  <label htmlFor="username" className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input onChange={(e) => setName(e.target.value)} type="text" name="username" id="username" placeholder="Enter username..." required className="input input-bordered" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="Email" className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" name="Email" id="Email" placeholder="Enter Email..." required className="input input-bordered" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="Password" className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" name="Password" id="Password" placeholder="Enter Password..." required className="input input-bordered" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="phase" className="label">
                    <span className="label-text">Phase</span>
                  </label>
                  <select className="select select-secondary w-full max-w-xs" onChange={(e) => setPhase(e.target.value)}>
                    <option disabled selected>
                      Choose Your Phase are you now
                    </option>
                    <option value="Phase 0">Phase 0</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleRegister} type="submit" className="btn btn-secondary w-full">
                    Sign Up
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
