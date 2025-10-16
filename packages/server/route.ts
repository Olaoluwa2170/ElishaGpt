import express from "express";
import { chatController } from "./controller/chat.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/api/chat", chatController.sendMessage);

export default router;