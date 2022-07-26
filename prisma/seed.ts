import { prisma } from "../src/config/database";

async function main() {
  await prisma.category.createMany({
    data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
    skipDuplicates: true,
  });

  await prisma.teacher.createMany({
    data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
    skipDuplicates: true,
  });

  await prisma.term.createMany({
    data: [{ number: 1 }, { number: 2 }, { number: 3 }],
    skipDuplicates: true,
  });

  await prisma.discipline.createMany({
    data: [
      { name: "HTML e CSS", termId: 1 },
      { name: "JavaScript", termId: 2 },
      { name: "React", termId: 3 },
      { name: "Humildade", termId: 4 },
      { name: "Planejamento", termId: 5 },
      { name: "Autoconfiança", termId: 6 },
    ],
    skipDuplicates: true,
  });

  await prisma.teacherDiscipline.createMany({
    data: [
      { disciplineId: 1, teacherId: 1 },
      { disciplineId: 2, teacherId: 1 },
      { disciplineId: 3, teacherId: 1 },
      { disciplineId: 4, teacherId: 2 },
      { disciplineId: 5, teacherId: 2 },
      { disciplineId: 6, teacherId: 2 },
    ],
    skipDuplicates: true,
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
