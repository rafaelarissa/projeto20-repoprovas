import { Prisma } from "@prisma/client";
import { prisma } from "../config/database.js";

async function getTestsByDiscipline(discipline: string) {
  return prisma.term.findMany({
    where: {
      Discipline: {
        some: {
          AND: {
            name: discipline,
            TeacherDiscipline: { some: { Test: { some: {} } } },
          },
        },
      },
    },
    include: {
      Discipline: {
        include: {
          TeacherDiscipline: {
            include: {
              teacher: true,
              Test: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers(teacher: string) {
  return prisma.teacherDiscipline.findMany({
    where: {
      AND: { teacher: { name: teacher }, Test: { some: {} } },
    },
    include: {
      teacher: true,
      discipline: true,
      Test: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function insert(createTestData: Prisma.TestUncheckedCreateInput) {
  await prisma.test.create({
    data: createTestData,
  });
}

async function getById(id: number) {
  return prisma.test.findUnique({
    where: { id },
  });
}

export default { insert, getTestsByDiscipline, getById, getTestsByTeachers };
