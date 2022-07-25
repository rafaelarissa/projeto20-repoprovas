import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";
import createTestBody, { createTest } from "../factories/testFactory.js";
import { tokenFactory } from "../factories/tokenFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

describe("GET /tests", () => {
  it("should return test given 'disciplines' filter", async () => {
    const token = await tokenFactory();
    const body = createTestBody();
    await createTest(body);

    const response = await agent
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return 1 HTML e CSS test given HTML e CSS filter", async () => {
    const token = await tokenFactory();
    const body = createTestBody();
    await createTest(body);

    const response = await agent
      .get("/tests?groupBy=disciplines&discipline=HTML e CSS")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.tests.length).toEqual(1);
  });

  it("should return 1 test given Diego filter", async () => {
    const token = await tokenFactory();
    const body = createTestBody();
    await createTest(body);

    const response = await agent
      .get("/tests?groupBy=teachers&teacher=Diego Pinho")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.tests.length).toEqual(1);
  });
});

describe("POST /tests", () => {
  it("returns 201 given a valid body", async () => {
    const token = await tokenFactory();
    const body = createTestBody();

    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(response.status).toBe(201);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
