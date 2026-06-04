import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import View from "../assests/view.png";
import { useNavigate, Link } from "react-router-dom";
import Google from "../assests/google.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showconfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const onsubmithandler = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("name,email and password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("confirmPassword does'nt Match");
      return;
    }
    try {
      const response = await axios.post(
        "https://mern-stack-zav6.onrender.com/api/auth/signUp",
        {
          name,
          email,
          password,
        },
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="border flex justify-center items-start w-full min-h-screen bg-slate-950 p-5">
      <div className="w-full md:w-85 h-fit border border-white p-4 bg-gray-200 text-black rounded-md">
        <h1 className="text-center text-xl font-bold">
          Welcome<span className="text-red-600"> Back</span>
        </h1>
        <p className="text-center text-sm text-gray-500">
          Signup to create your account
        </p>
        <form
          className="mt-3"
          onSubmit={(e) => {
            onsubmithandler(e);
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="Name"
              value={name}
              className="w-full border-b outline-none py-2 px-3 rounded-md bg-white"
              onChange={(e) => {
                const value = e.target.value;

                if (value.startsWith(" ")) {
                  return;
                }
                setName(value);
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              className="w-full border-b outline-none py-2 px-3 rounded-md bg-white"
              onChange={(e) => {
                setEmail(e.target.value.replace(/^\s+/, ""));
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password">Password:</label>
            <div className="flex justify-center items-center bg-white border-b rounded-md py-2 px-3">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                className="w-full outline-0  rounded-md bg-white"
                onChange={(e) => {
                  setPassword(e.target.value.replace(/^\s+/, ""));
                }}
              />
              <img
                src={View}
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="ConfirmPassword">ConfirmPassword:</label>
            <div className="flex justify-center items-center bg-white border-b rounded-md py-2 px-3">
              <input
                type={showconfirmPass ? "text" : "password"}
                name="ConfirmPassword"
                placeholder="ConfirmPassword"
                value={confirmPassword}
                className="w-full outline-0 rounded-md bg-white"
                onChange={(e) => {
                  setConfirmPassword(e.target.value.replace(/^\s+/, ""));
                }}
              />
              <img
                src={View}
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setShowConfirmPass(!showconfirmPass);
                }}
              />
            </div>
          </div>
          <button
            className="w-full p-2 rounded-md bg-blue-900 text-white cursor-pointer mt-4"
            type="submit"
          >
            Signup
          </button>
        </form>
        <hr className="mt-3" />
        <button className="w-full p-2 rounded-md mt-2 cursor-pointer bg-white text-sm flex justify-center items-center">
          <img src={Google} className="w-4 h-4 mr-4" />
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          Already have an account?
          <Link to="/login" className="text-blue-700 cursor-pointer">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
