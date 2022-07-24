import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";
import createTestBody from "../factories/testFactory.js";
import createUserBody, { createUser } from "../factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

describe("POST /tests", () => {
  it("returns 201 given a valid body", async () => {
    const userBody = createUserBody();
    await createUser(userBody);
    const login = await agent.post("/sign-in").send(userBody);
    const token = login.body.token;
    const body = createTestBody();

    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(response.status).toBe(201);
  });
});

// describe("GET /tests", () => {
//   it("should return tests by discipline given discipline filter");
// });
