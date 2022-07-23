import bcrypt from "bcrypt";
import { prisma } from "../src/config/database";
async function main() {
  const hashedPassword = bcrypt.hashSync("default", 10);

  await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      email: "test@gmail.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
