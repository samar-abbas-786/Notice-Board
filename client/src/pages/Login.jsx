import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "https://notice-board-backend-2.onrender.com/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center pt-16 justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-cyan-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-opacity-20 backdrop-blur-xl bg-black rounded-lg shadow-lg border border-cyan-500"
        >
          <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none focus:border-cyan-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-3 bg-transparent border-b-2 border-cyan-400 text-white focus:outline-none focus:border-cyan-300"
            />
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-md transition transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
