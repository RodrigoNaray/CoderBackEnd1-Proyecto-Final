import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();

// Este endpoint se encarga de obtener todos los productos respetando las opciones de filtrado
router.get("/", async (req, res) => {
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
      const products = await productDao.getAll({ category }, options);
      return res.status(200).json({ status: "success", products });
    }

    if (status) {
      const products = await productDao.getAll({ status }, options); // {status: status} = {status} en este caso por tener el mismo nombre en la definición.
      return res.status(200).json({ status: "success", products });
    }

    const products = await productDao.getAll({}, options)
    res.status(200).json({status: "success", products})

  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

// Este endpoint se encarga de obtener un producto por su id
router.get("/:pid", async (req, res) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const product = await productDao.getById(pid)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

// Este endpoint se encarga de crear un producto
router.post("/",checkProductData, async (req, res) => {
  try{
    const body = req.body
    console.log(body)
    const product = await productDao.create(body)

    res.status(201).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

// Este endpoint se encarga de actualizar un producto
router.put("/:pid", async (req, res) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const body = req.body
    const product = await productDao.update(pid, body)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", product})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

// Este endpoint se encarga de eliminar un producto
router.delete("/:pid", async (req, res) => {
  try{
    const { pid } = req.params
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    const product = await productDao.deleteOne(pid)
    if(!product) return res.status(404).json({status: "Error", msg: "Producto no encontrado"})

    res.status(200).json({status: "success", msg: `El producto con el id ${pid} fue eliminado corrctamente`})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})


export default router