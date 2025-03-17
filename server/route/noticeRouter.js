import express from "express";
const router = express.Router();
import { upload } from "../utils/multer.js";
import {
  getAllNotice,
  uploadNotice,
  getNoticeByTeacher,
  deleteNotice,
} from "../controller/noticecontroller.js";

router.get("/getAllNotice", getAllNotice);
router.post("/uploadNotice", upload.single("filename"), uploadNotice);
router.get("/getNoticeByTeacher", getNoticeByTeacher);
router.get("/deleteNotice", deleteNotice);

export default router;
