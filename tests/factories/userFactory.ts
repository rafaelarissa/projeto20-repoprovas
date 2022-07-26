import { CreateUserData } from "./../../src/services/userService";
import bcrypt from "bcrypt";
import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker";

export default function createUserBody(): CreateUserData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export async function createUser(user: CreateUserData) {
  return await prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}
