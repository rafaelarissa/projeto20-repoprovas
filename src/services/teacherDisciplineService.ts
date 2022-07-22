import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";

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
