import { prisma } from "../config/prismaClient";

export async function allHistory() {
  const history = await prisma.interaction.findMany({
    orderBy: { createdAt: "desc" },
  });

  return history;
}

export async function history(sessionId: string) {
  await prisma.interaction.deleteMany({
    where: { sessionId },
  });

  return { message: "History cleared" };
}
