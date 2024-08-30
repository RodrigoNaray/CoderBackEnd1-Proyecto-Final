import { request, response } from "express";
import cartServices from "../services/cart.services.js";


export const checkCartExistance = async (req = request, res = response, next) => {
  const cid = req.params.cid;

  try{
    //Verificamos que los ids tengan 24 caracteres para que coincidan con el formato de los ids de MongoDB
    if (cid.length !== 24 ) return res.status(400).json({ status: "Error", msg: "El id del carrito debe tener 24 caracteres" });
    
    //Verificamos que el carrito exista en la base de datos
    const cart = await cartServices.getCartById(cid);
    if (!cart) {
      return res.status(400).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    }

    next();
  }
  catch (error){
    console.log(error);
    return res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}