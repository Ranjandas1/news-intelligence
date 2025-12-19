import type { Request, Response } from "express";
import { getHistory } from "../services/history.service";
import { allHistory, history } from "../services/chat.service";

export async function getAllHistory(req: Request, res: Response) {
  const history = await allHistory();
  return res.json(history);
}

export async function getHistoryBySession(req: Request, res: Response) {
  const { sessionId } = req.params;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId parameter is required" });
  }
  const history = await getHistory(sessionId as string);
  return res.json(history);
}

export async function clearHistory(req: Request, res: Response) {
  const { sessionId } = req.params;

  await history(sessionId as string);

  return res.json({ message: "History cleared" });
}
