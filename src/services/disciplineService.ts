import disciplineRepository from "../repositories/disciplineRepository.js";

async function getById(id: number) {
  return disciplineRepository.getById(id);
}

export default { getById };
