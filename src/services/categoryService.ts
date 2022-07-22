import categoryRepository from "../repositories/categoryRepository.js";

async function getById(id: number) {
  return categoryRepository.getById(id);
}

export default { getById };
