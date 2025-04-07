import User from "../model/userSchema.js";
import Notice from "../model/noticeSchema.js";
import { get } from "mongoose";

export const uploadNotice = async (req, res) => {
  try {
    const { title, description, postedBy, postedOn } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!title || !description || !postedBy) {
      return res.status(400).json({ message: "All fields must be provided" });
    }

    const notice = await Notice.create({
      title,
      description,
      postedBy,
      postedOn,
      filename: file, 
    });

    if (!notice) {
      return res.status(400).json({ message: "Notice couldn't be uploaded" });
    }

    res.status(200).json({ message: "Notice uploaded successfully", notice });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAllNotice = async (req, res) => {
  try {
    const getAllNotice = await Notice.find().sort({ postedOn: -1 });
    if (getAllNotice.length == 0) {
      res.status(400).json({ message: "No Notice Available" });
    }
    res.status(200).json({ message: "notices found", getAllNotice });
  } catch (error) {
    console.log("Error Occured on upLoadNotice", error);
  }
};

export const getNoticeByTeacher = async (req, res) => {
  try {
    const { postedBy } = req.query;
    const notices = await Notice.find({ postedBy: postedBy });
    if (notices.length == 0) {
      return res.status(400).json({ message: "No Notice Uploaded" });
    }
    res.status(200).json({ message: "found notice by teacher", notices });
  } catch (error) {
    console.log("Error Occured on getNoticeByTeacher", error);
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.query;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return res.status(400).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.log("Error Occured on deleteNotice", error);
  }
};
