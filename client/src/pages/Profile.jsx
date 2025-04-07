import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserEdit, FaUsers, FaSave, FaUpload } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Profilepic from "../assets/profile.png";
import { IoMdLogOut } from "react-icons/io";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //   const handleNavigate = (item) => {
  //     navigate(item);
  //   };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-[100vh] text-white text-center bg-gradient-to-br from-black via-slate-800 to-black px-6 pb-12 pt-10">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md"></div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 mt-8 bg-black/30 border border-cyan-500 shadow-lg shadow-cyan-500/40 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md text-center"
        >
          <img
            src={Profilepic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-cyan-500 shadow-lg shadow-cyan-500/50"
          />
          <h2 className="text-3xl font-bold text-white mt-4">{user.name}</h2>
          <p className="text-gray-300 text-lg">{user.email}</p>
          <p className="text-gray-400 text-sm">{user.role}</p>

          {/* Buttons Based on Role */}
          <div className="mt-4 space-y-3">
            {/* Admin: List Teachers & Students */}
            {user.role === "admin" && (
              <>
                <motion.button
                  onClick={() => navigate("/teacherList")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-white bg-blue-500 rounded-lg transition-transform hover:bg-blue-400"
                >
                  <FaUsers /> List All Teachers
                </motion.button>

                <motion.button
                  onClick={() => navigate("/studentlist")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-white bg-green-500 rounded-lg transition-transform hover:bg-green-400"
                >
                  <FaUsers /> List All Students
                </motion.button>
              </>
            )}

            {/* Student: Saved Notices */}
            {user.role === "student" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-white bg-purple-500 rounded-lg transition-transform hover:bg-purple-400"
              >
                <FaSave /> Saved Notices
              </motion.button>
            )}

            {/* Teacher: Uploaded Notices */}
            {user.role === "teacher" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 flex items-center justify-center gap-2 text-lg font-semibold text-white bg-yellow-500 rounded-lg transition-transform hover:bg-yellow-400"
              >
                <Link className="flex items-center gap-2" to={"/myNotices"}>
                  {" "}
                  <FaUpload /> Uploaded Notices
                </Link>
              </motion.button>
            )}
          </div>

          {/* Edit Profile Button */}
          <div className="w-full flex justify-evenly">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 flex items-center gap-2 text-lg font-semibold text-white bg-cyan-500 rounded-lg transition-transform hover:bg-cyan-400"
            >
              <FaUserEdit /> Edit Profile
            </motion.button> */}
            {/* Logout */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 flex items-center gap-2 text-lg font-semibold text-white bg-red-500 rounded-lg transition-transform hover:bg-red-400"
            >
              <IoMdLogOut /> Logout
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
