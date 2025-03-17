import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "https://notice-board-backend.onrender.com/api";

const Teacher_List = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/getAllTeacher`);
        console.log(response.data.teachers);

        setTeachers(response.data.teachers || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        toast.error("Failed to fetch teachers.");
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.get(`${API_URL}/users/delete?id=${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      toast.success("Teacher deleted successfully!");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Failed to delete teacher.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-cyan-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl p-6 bg-opacity-20 backdrop-blur-xl bg-black rounded-lg shadow-lg border border-cyan-500 text-center"
        >
          <h2 className="text-3xl font-bold text-white">Teacher List</h2>
          {teachers.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {teachers.map((teacher, index) => (
                <motion.li
                  key={teacher._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-between items-center px-4 py-2 bg-black/30 border border-cyan-500 rounded-lg shadow-md shadow-cyan-500/50"
                >
                  <span>
                    {teacher.name} - {teacher.email}
                  </span>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="ml-4 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition transform hover:scale-105"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-300">No teachers found.</p>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Teacher_List;
