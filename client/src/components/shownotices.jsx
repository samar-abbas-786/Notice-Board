import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners";
const API_URL = "https://notice-board-backend-2.onrender.com/api";

const ShowNotices = () => {
  const [notice, setNotice] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getAllNotices = async () => {
      try {
        setLoading(true);
        const notice = await axios.get(`${API_URL}/notices/getAllNotice`);
        console.log(notice.data.getAllNotice);
        setNotice(notice.data.getAllNotice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        toast.error("Failed to fetch notices.");
        setLoading(true);
      }
    };

    getAllNotices();
  }, []);

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleDelete = async (id) => {
    try {
      await axios.get(`${API_URL}/notices/deleteNotice?id=${id}`);
      setNotice(notice.filter((item) => item._id !== id));
      toast.success("Notice deleted successfully!");
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice.");
    }
  };
  if (loading) {
    return (
      <h1 className="text-9xl flex w-screen h-screen justify-center items-center  ">
        <RingLoader
          size={100}
          color="#2ecfed"
          className="text-white text-9xl  rounded-full"
        />
      </h1>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] text-white text-center bg-gradient-to-br from-black via-slate-800 to-black px-6 pb-12 pt-10">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-lg"
      >
        Latest Notices 📢
      </motion.h1>

      <div className="relative z-10 mt-8 w-full max-w-4xl space-y-6">
        {notice.length > 0 ? (
          notice.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/30 border border-cyan-500 shadow-lg shadow-cyan-500/40 backdrop-blur-lg p-6 rounded-2xl hover:shadow-cyan-400/50 transition-transform transform hover:scale-[1.02] relative"
            >
              <button
                onClick={() => toggleFavorite(index)}
                className="absolute top-4 left-4 text-xl transition-transform transform hover:scale-110"
              >
                <FaHeart
                  className={`${
                    favorites[index] ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Posted Date */}
              <h1 className="text-right text-sm text-gray-400">
                {item.postedOn}
              </h1>

              {/* Notice Title */}
              <h2 className="text-3xl font-bold text-white mb-2">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>

              {/* Download Button */}
              <div className="w-full flex justify-between items-center">
                {item.filename !== null && (
                  <a
                    href={`https://notice-board-backend-2.onrender.com/uploads/${item.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 px-4 py-2 text-[11px] font-semibold text-white bg-cyan-500 rounded-lg transition-transform hover:scale-105 hover:bg-cyan-400"
                  >
                    📄 Download File
                  </a>
                )}
                {(user.role === "teacher" && user._id === item.postedBy) ||
                user.role === "admin" ? (
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 text-right px-4 py-2 text-[11px] font-semibold text-white bg-red-500 rounded-lg transition-transform hover:scale-105 hover:bg-red-400"
                  >
                    🗑️ Delete Notice
                  </button>
                ) : null}
              </div>
            </motion.div>
          ))
        ) : (
          <h1 className="text-3xl font-bold text-white">No Notices Found</h1>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowNotices;
