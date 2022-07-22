import { Prisma } from "@prisma/client";
import { prisma } from "../config/database.js";

async function insert(createTestData: Prisma.TestUncheckedCreateInput) {
  await prisma.test.create({
    data: createTestData,
  });
}

export default { insert };
