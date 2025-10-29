import express from "express";
import { getUserStories, saveStory } from "../controllers/historyController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getUserStories);
router.post("/", verifyToken, saveStory);

export default router;
