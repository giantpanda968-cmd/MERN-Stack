import { Navigate, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import RefreshHandler from "./pages/RefreshHandler";

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
