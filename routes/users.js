import express from "express";
const router = express.Router();
import {
  decrementSubscribersCount,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  incrementSubscribersCount,
  recommendVideos,
  subscribeToChannel,
  unSubscribeToChannel,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

router.get("/", getAllUsers);
router.get("/me", verifyToken, getMe);
router.get("/users/:userId", getUser);
router.patch("/incSubs/:userId", verifyToken, incrementSubscribersCount);
router.patch("/decSubs/:userId", verifyToken, decrementSubscribersCount);
router.patch("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.patch("/sub/:userId", verifyToken, subscribeToChannel);
router.patch("/unsub/:userId", verifyToken, unSubscribeToChannel);
router.patch("/recommend", verifyToken, recommendVideos)
export default router;
