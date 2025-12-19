import type { Request, Response } from "express";
import { inngest } from "../inngest";

export async function tranning(req: Request, res: Response) {
  try {
    const event = await inngest.send({
      name: "rss/fetch",
      data: {
        triggeredAt: new Date().toISOString(),
      },
    });

    return res.status(202).json({
      message: "RSS ingestion started.....",
      eventId: event.ids[0],
    });
  } catch (error) {
    console.error("❌ Failed to trigger ingestion:", error);
    return res.status(500).json({
      error: "Failed to trigger ingestion",
    });
  }
}
