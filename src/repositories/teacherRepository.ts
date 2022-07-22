import { prisma } from "../config/database.js";

async function getById(id: number) {
  return prisma.teacher.findUnique({
    where: { id },
  });
}

export default { getById };
