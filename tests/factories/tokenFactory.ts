import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createUserBody, { createUser } from "./userFactory.js";

dotenv.config();
export async function tokenFactory() {
  const user = createUserBody();

  const createdUser = await createUser(user);

  return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
}
