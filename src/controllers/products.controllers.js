import { request, response } from "express";
import productService from "../services/product.services.js";

const getAllProducts = async (req = request, res = response) => {
  try{
    
    // Realizamos un filtrado de productos por categoría, estado y opciones de paginación

    const { limit, page, sort, category, status } = req.query;
    console.log(limit, page, sort, category, status)
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      learn: true,
    };

    console.log(options)

    if (category) {
      const products = await productService.getAllProducts({ category }, options);
      return res.status(200).json({ status: "success", products });
    }

    if (status) {
      const products = await productService.getAllProducts({ status }, options); // {status: status} = {status} en este caso por tener el mismo nombre en la definición.
      return res.status(200).json({ status: "success", products });
    }

    const products = await productService.getAllProducts({}, options)
    res.status(200).json({status: "success", products})

  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const getProductById = async (req = request, res = response) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const product = await productService.getProductById(pid)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const createProduct = async (req = request, res = response) => {
  try{
    const productData = req.body
    console.log(body)
    const product = await productService.createProduct(productData)

    res.status(201).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const updateProduct = async (req = request, res = response) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const productData = req.body
    const product = await productService.updateProduct(pid, productData)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const deleteOneProduct = async (req = request, res = response) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const product = await productService.deleteOneProduct(pid)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", msg: `El producto con el id ${pid} fue eliminado corrctamente`})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteOneProduct
}