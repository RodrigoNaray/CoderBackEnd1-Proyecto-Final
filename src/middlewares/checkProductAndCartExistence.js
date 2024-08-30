import { response, request } from "express";
import productServices from "../services/product.services.js";
import cartServices from "../services/cart.services.js";

//El middleware checkProductAndCartExistence se encarga de verificar si un producto y un carrito existen en la base de datos

export const checkProductAndCartExistence = async (req = request, res = response, next) => {
  const pid = req.params.pid; 
  const cid = req.params.cid; 

  try {
    

    //Verificamos que los ids tengan 24 caracteres para que coincidan con el formato de los ids de MongoDB
    if (pid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del producto debe tener 24 caracteres" });
    if (cid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del carrito debe tener 24 caracteres" });
    

    //Verificamos que el producto y el carrito existan en la base de datos
    const product = await productServices.getProductById(pid);
    if (!product) {
      return res.status(400).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    }

    const cart = await cartServices.getCartById(cid);
    if (!cart) {
      return res.status(400).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    }

    next(); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};

