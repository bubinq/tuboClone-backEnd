import express from "express";
import {
  createVideo,
  deleteVideo,
  dislikeVideo,
  editVideo,
  getRandomVideos,
  getRecommendedVideos,
  getSubscribedVideos,
  getTagLikeVideos,
  getTrendingVideos,
  getVideo,
  increaseTrendingViews,
  increaseViews,
  likeVideo,
  searchVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createVideo);
router.put("/update/:Id", verifyToken, editVideo);
router.delete("/delete/:Id", verifyToken, deleteVideo);
router.patch("/like/:videoId", verifyToken, likeVideo);
router.patch("/dislike/:videoId", verifyToken, dislikeVideo);
router.post("/search", searchVideo);
router.get("/trend", getTrendingVideos);
router.get("/tags/:Id", getTagLikeVideos);
router.get("/sub", verifyToken, getSubscribedVideos);
router.put("/view/:Id", increaseViews);
router.put("/incrTrend/:Id", increaseTrendingViews);
router.get("/recommended", verifyToken, getRecommendedVideos);
router.get("/", getRandomVideos);
router.get("/:Id", getVideo);

export default router;
