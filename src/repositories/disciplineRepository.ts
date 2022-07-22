import { prisma } from "../config/database.js";

async function getById(id: number) {
  return prisma.discipline.findUnique({
    where: { id },
  });
}

export default { getById };
