import teacherRepository from "../repositories/teacherRepository.js";

async function getById(id: number) {
  return teacherRepository.getById(id);
}

export default { getById };
