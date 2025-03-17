import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const API_URL = "https://notice-board-backend.onrender.com/api";
const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const handleForm = async () => {
    try {
      const user = await axios.post(`${API_URL}/users/createUser`, {
        name,
        email,
        password,
        role,
      });
      console.log("user", user);
      localStorage.setItem("user", JSON.stringify(user.data.user));
      navigate("/home");
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("User creation failed!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center pt-16 justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-cyan-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-opacity-20 backdrop-blur-xl bg-black rounded-lg shadow-lg border border-cyan-500"
        >
          <h2 className="text-3xl font-bold text-center text-white">
            Create an Account
          </h2>
          <div className="mt-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none focus:border-cyan-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none focus:border-cyan-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none focus:border-cyan-300"
            />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none"
            >
              <option value="student" className="text-black">
                Student
              </option>
              <option value="teacher" className="text-black">
                Teacher
              </option>
              <option value="admin" className="text-black">
                Admin
              </option>
            </select>
            <button
              onClick={handleForm}
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-md transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
          <p className="mt-4 text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
