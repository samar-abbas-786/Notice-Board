import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "https://notice-board-backend.onrender.com/api";

const Student_List = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/getAllStudents`);
        setStudents(response.data.student);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.get(`${API_URL}/users/delete?id=${id}`);
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
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
          <h2 className="text-3xl font-bold text-white">Student List</h2>
          {students.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {students.map((student, index) => (
                <motion.li
                  key={student._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-between items-center px-4 py-2 bg-black/30 border border-cyan-500 rounded-lg shadow-md shadow-cyan-500/50"
                >
                  <span>
                    {student.name} - {student.email}
                  </span>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="ml-4 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition transform hover:scale-105"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-300">No students found.</p>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Student_List;
