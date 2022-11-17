import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import videoRouter from "./routes/videos.js";
import commentRouter from "./routes/comments.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Something went wrong with DB");
    });
};

app.use(
  cors({
    exposedHeaders: "Set-Cookie",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

app.use(
  express.static(path.join(__dirname, "/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/client/build", "index.html")
  );
});

app.listen(process.env.PORT || 3030, () => {
  connectToDB();
  console.log(`Server is running on port 3030`);
});
