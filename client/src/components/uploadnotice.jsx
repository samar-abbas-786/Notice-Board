import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const API_URL = "https://notice-board-backend.onrender.com/api";
const UploadNotice = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState(null);

  //   const handleSubmit = async () => {
  //     try {
  //       const notice = await axios.post(`${API_URL}/notices/uploadNotice`, {
  //         title,
  //         description,
  //         filename,
  //         postedBy: user._id,
  //       });
  //       console.log(notice);
  //       toast.success(notice.data.message);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("filename", filename); // ✅ Correct way to append file
      formData.append("postedBy", user._id);

      const response = await axios.post(
        `${API_URL}/notices/uploadNotice`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);
      toast.success(response.data.message);
      setTitle("");
      setDescription("");
      setFilename(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload notice");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex pt-36 justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-black to-cyan-900 p-6">
        <div
          className="bg-[#0a1120] border border-cyan-500 shadow-lg shadow-cyan-500/50 
        rounded-lg p-8 w-full max-w-lg text-white"
        >
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <FaFileUpload className="text-3xl text-cyan-400" />
            Upload Notice
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Share important notices with everyone
          </p>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-300">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#0d1a2d] text-white border border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#0d1a2d] text-white border border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter description"
                rows="4"
                required
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-300">
                Attach File (Optional)
              </label>
              <input
                type="file"
                name="filename"
                onChange={(e) => setFilename(e.target.files[0])}
                className="w-full text-gray-300 bg-[#0d1a2d] border border-cyan-400 rounded px-4 py-2 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
            >
              Upload Notice
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadNotice;
