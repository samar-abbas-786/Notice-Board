import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Splash = ({ onFinish }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-indigo-900 text-white"
      >
        {/* Glowing Logo Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-4xl font-bold text-indigo-700">NB</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-5 text-4xl font-extrabold tracking-wide"
        >
          NoticeBoard
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg text-gray-200 mt-2"
        >
          Stay updated with campus announcements
        </motion.p>
      </motion.div>
    )
  );
};

export default Splash;
