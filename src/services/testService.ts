import { Test } from "@prisma/client";
import testRepository from "../repositories/testRepository.js";
import { badRequestError } from "../utils/errorUtils.js";
import categoryService from "./categoryService.js";
import disciplineService from "./disciplineService.js";
import teacherDisciplineService from "./teacherDisciplineService.js";
import teacherService from "./teacherService.js";

export type CreateTestData = Omit<
  Test,
  "id" | "teacherDisciplineId" | "view"
> & {
  teacherId: number;
  disciplineId: number;
};
async function insert(createTestData: CreateTestData) {
  const { categoryId, teacherId, disciplineId, name, pdfUrl } = createTestData;

  const existingCategory = await categoryService.getById(categoryId);
  if (!existingCategory) throw badRequestError("Category doesn't exist");

  const existingDiscipline = await disciplineService.getById(disciplineId);
  if (!existingDiscipline) throw badRequestError("Discipline doesn't exist");

  const existingTeacher = await teacherService.getById(teacherId);
  if (!existingTeacher) throw badRequestError("Teacher doesn't exist");

  const teacherDiscipline =
    await teacherDisciplineService.getByTeacherAndDiscipline(
      teacherId,
      disciplineId
    );
  if (!teacherDiscipline)
    throw badRequestError("Teacher doesn't teach this discipline");

  await testRepository.insert({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  });
}

export default { insert };