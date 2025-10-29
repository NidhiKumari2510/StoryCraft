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

export const deleteStory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id || req.user.userId;

    const deleted = await Story.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete story" });
  }
};

