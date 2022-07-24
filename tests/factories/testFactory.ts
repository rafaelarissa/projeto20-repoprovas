import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
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
