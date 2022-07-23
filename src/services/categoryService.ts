import categoryRepository from "../repositories/categoryRepository.js";

async function getById(id: number) {
  return categoryRepository.getById(id);
}

async function findMany() {
  return categoryRepository.findMany();
}

export default { getById, findMany };
