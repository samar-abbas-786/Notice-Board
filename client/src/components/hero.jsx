import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="relative pt-4 flex flex-col items-center justify-center h-[90vh] text-white text-center bg-gradient-to-br from-blue-900 via-black to-cyan-900">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 md:px-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide leading-tight">
          Welcome to <span className="text-cyan-400">NoticeBoard</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Stay updated with the latest notices, announcements, and important
          information – all in one place.
        </p>

        <div className="mt-12 flex gap-6 flex item-center justify-center">
          <Link to="/notices">
            <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-cyan-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
              View Notices
            </button>
          </Link>
          {!user ? (
            <Link to="/signup">
              <button className="px-6 py-3 text-lg font-semibold rounded-lg border border-cyan-500 text-cyan-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/50">
                Sign Up
              </button>
            </Link>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
