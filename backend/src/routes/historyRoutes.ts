import express from "express";
import { getUserStories, saveStory, deleteStory } from "../controllers/historyController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getUserStories);
router.post("/", verifyToken, saveStory);
router.delete("/:id", verifyToken, deleteStory);


export default router;
