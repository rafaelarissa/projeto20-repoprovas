import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

export async function getByTeacherAndDiscipline(
  teacherId: number,
  disciplineId: number
) {
  return teacherDisciplineRepository.getByTeacherAndDiscipline(
    teacherId,
    disciplineId
  );
}

export default {
  getByTeacherAndDiscipline,
};
