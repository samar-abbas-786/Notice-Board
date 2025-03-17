import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { db } from "./database/db.js";
import userRouter from "./route/userRouter.js";
import noticeRouter from "./route/noticeRouter.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
db();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRouter);
app.use("/api/notices", noticeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
