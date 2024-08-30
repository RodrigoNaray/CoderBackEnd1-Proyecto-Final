import { resProductDto } from "../dto/product.dto.js";
import productRepository from "../persistance/mongoDB/product.repository.js";


const getAllProducts = async (query, options) => {
  return await productRepository.getAll(query, options);
}

const getProductById = async (pid) => {
  const product = await productRepository.getById(pid);
  const productResponse = resProductDto(product);
  return productResponse;
}

const createProduct = async (productData) => {
  return await productRepository.create(productData);
}

const updateProduct = async (pid, productData) => {
  return await productRepository.update(pid, productData);
}

const deleteOneProduct = async (pid) => {
  return productRepository.deleteOne(pid)
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteOneProduct
};