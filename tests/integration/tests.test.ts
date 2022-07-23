import { prisma } from "./../../src/config/database";
import app from "../../src/app.js";
import supertest from "supertest";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$disconnect();
});
