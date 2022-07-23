import { prisma } from "../config/database.js";

async function getById(id: number) {
  return prisma.teacher.findUnique({
    where: { id },
  });
}

async function getByDiscipline(discipline: number) {
  return prisma.teacher.findMany({
    where: { TeacherDiscipline: { some: { disciplineId: discipline } } },
  });
}

export default {
  getById,
  getByDiscipline,
};
