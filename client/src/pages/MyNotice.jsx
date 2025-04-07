import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const TeacherNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `https://notice-board-backend.onrender.com/api/notices/getNoticeByTeacher?postedBy=${user._id}`
      )
      .then((response) => {
        setNotices(response.data.notices);

        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch notices");
        toast.error("Failed to fetch notices.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  min-h-screen">
        <RingLoader size={80} color="#2ecfed" />
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
        >
          My Notices
        </motion.h1>

        <div className="mt-8 w-full max-w-4xl space-y-6">
          {notices.length === 0 ? (
            <h1 className="text-2xl font-semibold text-white text-center">
              No Notices Found
            </h1>
          ) : (
            notices.map((notice, index) => (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-800 border border-cyan-500 shadow-lg shadow-cyan-500/40 backdrop-blur-lg p-6 rounded-2xl hover:shadow-cyan-400/50 transition-transform transform hover:scale-[1.02] relative"
              >
                <h1 className="text-right text-sm text-gray-400">
                  {notice.postedOn}
                </h1>
                <h2 className="text-xl font-bold text-white mb-2">
                  {notice.title}
                </h2>
                <p className="text-gray-300 text-md leading-relaxed">
                  {notice.description}
                </p>
              </motion.div>
            ))
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TeacherNotices;
