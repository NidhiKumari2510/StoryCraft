import { Response } from "express";
import Story from "../models/Story";
import { AuthRequest } from "../middleware/authMiddleware";

export const getUserStories = async (req: AuthRequest, res: Response) => {
  try {
    const stories = await Story.find({
      userId: req.user.id || req.user.userId,
    }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

export const saveStory = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const newStory = await Story.create({
      userId: req.user.id || req.user.userId,
      title,
      content,
    });
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ message: "Failed to save story" });
  }
};
