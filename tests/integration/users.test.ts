import { prisma } from "./../../src/config/database";
import app from "../../src/app.js";
import supertest from "supertest";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /sign-up", () => {
  it("returns 201 for valid params", async () => {
    const body = {};
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
