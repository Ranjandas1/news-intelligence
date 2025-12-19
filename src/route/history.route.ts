import { Router } from "express";
import {
  clearHistory,
  getAllHistory,
  getHistoryBySession,
} from "../controllers/history.controller";

const router = Router();
router.get("/", getAllHistory);
router.get("/:sessionId", getHistoryBySession);
router.delete("/:sessionId", clearHistory);

export default router;
