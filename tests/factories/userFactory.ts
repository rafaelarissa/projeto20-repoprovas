import bcrypt from "bcrypt";
import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker";

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}
