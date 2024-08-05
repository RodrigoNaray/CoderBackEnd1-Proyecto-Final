import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import { checkProductAndCartExistence } from "../middlewares/checkProductAndCartExistence.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";


const router = Router();

//Este endpoint se encarga de crear un carrito
router.post("/", async (req,res) => {
  try{

    const cart = await cartDao.create()
    console.log("Cart al crearse: ",cart)

    res.status(201).json({status: "success", cart})

  }catch (error){
    console.log(500)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

//Este endpoint se encarga de obtener un carrito por su id
router.get("/:cid", async (req, res) => {
  try{
    const { cid } = req.params
    const cart = await cartDao.getById(cid)
    if(!cart) return res.status(404).json({status: "Error", msg: "Carrito no encontrado"})

    res.status(200).json({status: "success", cart})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
})

// Este endpoint se encarga de agregar un producto al carrito
router.post("/:cid/product/:pid",isUserCart,checkProductAndCartExistence, async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cartUpdate = await cartDao.addProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Este endpoint se encarga de eliminar un producto del carrito
router.delete("/:cid/product/:pid",checkProductAndCartExistence, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    
    const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

//El endpoint se encarga de actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid", checkProductAndCartExistence,async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body
    
    const cart = await cartDao.getById(cid);
    
    const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity));

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});


//El endpoint se encarga de eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    if (cid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del carrito debe tener 24 caracteres" });
    const cartExist = await cartDao.getById(cid);
    if (!cartExist) return res.status(404).json({ status: "Error", msg: `Carrito id: ${cid} no encontrado` });
    
    const cart = await cartDao.clearProductsToCart(cid);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});


export default router