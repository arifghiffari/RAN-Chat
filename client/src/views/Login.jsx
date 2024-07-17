import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import url from "../utils/url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${url}/login`, { email, password });
      //   console.log(data);
      localStorage.setItem("token", data.accessToken);

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">
                <i className="fas fa-smile"></i>
                <br />
                RAN CHAT
              </h1>
              <p className="py-6">Log in to join the chat and connect with your friends!</p>
            </div>
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <form action="chat.html" className="w-full">
                  <div className="form-control">
                    <label htmlFor="Email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" name="Email" id="Email" placeholder="Enter Email..." required className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label htmlFor="password" className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password..." required className="input input-bordered" />
                  </div>
                  <div className="form-control mt-6">
                    <button onClick={handleLogin} type="submit" className="btn btn-secondary">
                      Join Chat
                    </button>
                    <br />
                    <p>
                      Didn't have account?{" "}
                      <Link to="/register" className="link link-primary">
                        <button>Register</button>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
