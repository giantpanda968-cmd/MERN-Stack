import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setuserName] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setuserName(localStorage.getItem("loggedInuser"));
  }, []);
  const handlelogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInuser");
    toast.success("user logout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const data = async () => {
    try {
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await axios.get(
        "https://mern-stack-zav6.onrender.com/api/auth/profile",
        headers,
      );

      const result = response.data;

      setProducts(result);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className=" shadow-[8px_8px_15px_rgba(0,0,0,0.75)] p-6 flex flex-col justify-center items-center bg-gray-200 rounded-md">
        <h1 className="text-4xl font-bold text-center">Welcome<span className="text-red-500"> {userName}</span></h1>
        <div className="text-black mt-3 mb-3">
          {products &&
            products?.map((items, idx) => {
              return (
                <ul key={idx}>
                  <span>
                    {items.name}:{items.price}
                  </span>
                </ul>
              );
            })}
        </div>

        <button
          className="bg-pink-900 text-white py-1 px-3 rounded cursor-pointer active:scale-97 flex justify-center items-center"
          onClick={handlelogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
