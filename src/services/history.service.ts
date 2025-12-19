import { prisma } from "../config/prismaClient";

export async function getHistory(sessionId: string) {
  return prisma.interaction.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
  });
}
