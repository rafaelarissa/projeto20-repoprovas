import { prisma } from "./../../src/config/database.js";
import app from "../../src/app.js";
import supertest from "supertest";
import createUserBody, { createUser } from "../factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /sign-up", () => {
  it("returns 201 for valid body", async () => {
    const body = createUserBody();

    const response = await agent.post("/sign-up").send(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toBe(201);
    expect(user).not.toBeNull();
  });

  it("returns 422 given a invalid body", async () => {
    const body = {};

    const response = await agent.post("/sign-up").send(body);

    expect(response.status).toBe(422);
  });

  it("returns 409 given a duplicate email", async () => {
    const body = createUserBody();

    await agent.post("/sign-up").send(body);
    const response = await agent.post("/sign-up").send(body);
    const users = await prisma.user.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toBe(409);
    expect(users.length).toEqual(1);
  });
});

describe("POST /sign-in", () => {
  it("returns 200 and a token given valid credentials", async () => {
    const body = createUserBody();
    await createUser(body);

    const response = await agent.post("/sign-in").send(body);

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toEqual("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it("returns 401 given invalid email", async () => {
    const body = createUserBody();

    const response = await agent.post("/sign-in").send(body);

    expect(response.status).toBe(401);
  });

  it("returns 401 given invalid password", async () => {
    const body = createUserBody();
    await createUser(body);

    const response = await agent
      .post("/sign-in")
      .send({ ...body, password: "random password" });

    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
