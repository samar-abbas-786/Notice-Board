import express from "express";
const router = express.Router();
import {
  createUser,
  loginUser,
  getAllStudents,
  getAllTeacher,
  deletById,
} from "../controller/usercontroller.js";

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/getAllStudents", getAllStudents);
router.get("/getAllTeacher", getAllTeacher);
router.get("/delete", deletById);

export default router;
