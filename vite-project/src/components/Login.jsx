import React, { useState } from "react";
import left_cover from "../assets/cover_image.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChangeRegister = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = () => {
    alert("Registration successful! Now please log in.");
    setShowRegister(false); // Show login form
  };

  const handleLoginSubmit = () => {
    alert("Login successful! Navigating to OTP screen...");
    navigate("/otp"); // Simulate successful login
  };

  return (
    <div className="w-full h-screen flex md:flex-row flex-col">
      <div className="relative md:w-1/2 w-full h-full">
        <img src={left_cover} className="w-full h-full object-cover" alt="Cover" />
        <div className="absolute top-[20%] left-[10%] text-white">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>

      <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center bg-white">
        {!showRegister ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChangeLogin}
              placeholder="Email"
              className="w-2/3 mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChangeLogin}
              placeholder="Password"
              className="w-2/3 mb-6 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleLoginSubmit}
              className="w-2/3 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            <br />
            <button
              onClick={() => setShowRegister(true)}
              className="w-2/3 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleChangeRegister}
              placeholder="Name"
              className="w-2/3 mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChangeRegister}
              placeholder="Email"
              className="w-2/3 mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChangeRegister}
              placeholder="Password"
              className="w-2/3 mb-6 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleRegisterSubmit}
              className="w-2/3 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            <br />
            <button
              onClick={() => setShowRegister(false)}
              className="w-2/3 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
