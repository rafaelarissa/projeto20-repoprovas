import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database.js";
import { CreateTestData } from "../../src/services/testService.js";

export default function createTestBody(): CreateTestData {
  return {
    name: faker.lorem.word(2),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
}

export async function createTest(test: CreateTestData) {
  return await prisma.test.create({
    data: {
      name: test.name,
      pdfUrl: test.pdfUrl,
      categoryId: test.categoryId,
      teacherDisciplineId: 1,
    },
  });
}
