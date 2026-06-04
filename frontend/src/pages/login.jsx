import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Google from '../assests/google.png';
import View from '../assests/view.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass,setShowPass]=useState(false);
  const navigate = useNavigate();

  const onsubmithandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("email and password is require");
      return;
    }

    try {
      const response = await axios.post(
        "https://mern-stack-zav6.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      const { name, jwtToken } = await response.data;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInuser", name);

      setEmail("");
      setPassword("");

      toast.success(response.data.message);
      navigate("/home");
      return;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="border flex justify-center items-start w-full min-h-screen bg-slate-950 p-5">
      <div className="w-full md:w-85 h-fit border border-white p-4 bg-gray-200 text-black rounded-md">
        <h1 className="text-center text-xl font-bold">
          Welcome <span className="text-red-600">Back</span>
        </h1>
        <p className="text-center text-sm text-gray-500">
          Login to continue your account
        </p>
        <form
          className="mt-3"
          onSubmit={(e) => {
            onsubmithandler(e);
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              autoFocus
              name="email"
              placeholder="Email..."
              className="w-full border-b outline-none p-2 rounded-md bg-white"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password">Password:</label>
            <div className="flex justify-center items-center p-2 bg-white border-b rounded-md">
            <input
              type={showPass?"text":"password"}
              placeholder="Password"
              className="w-full outline-0"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img src={View} className="w-4 h-4 cursor-pointer" onClick={()=>{
              setShowPass(!showPass);
            }}/>
            </div>
          </div>

          <p className="text-end text-sm text-blue-500 mt-2">
            Forgot Password?
          </p>
          <button
            className="w-full p-2 rounded-md bg-blue-900 text-white cursor-pointer mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <hr className="mt-3" />
        <button className="w-full p-2 rounded-md mt-2 cursor-pointer bg-white text-sm flex justify-center items-center">
          <img src={Google} className="w-4 h-4 mr-3" />
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          Don't have an account?
          <Link to="/signup" className="text-blue-700">
            {" "}
            Sign UP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
