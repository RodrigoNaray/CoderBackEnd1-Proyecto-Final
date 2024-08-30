import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkProductAndCartExistence } from "../middlewares/checkProductAndCartExistence.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { checkCartExistance } from "../middlewares/checkCartExistance.js";


const router = Router();

//Este endpoint se encarga de crear un carrito
router.post("/", cartsControllers.createCart)

//Este endpoint se encarga de obtener un carrito por su id
router.get("/:cid", cartsControllers.getCartById)

// Este endpoint se encarga de agregar un producto al carrito
router.post("/:cid/product/:pid",isUserCart,checkProductAndCartExistence, cartsControllers.addProductToCart);

// Este endpoint se encarga de eliminar un producto del carrito
router.delete("/:cid/product/:pid",checkProductAndCartExistence, cartsControllers.deleteProductToCart);

//El endpoint se encarga de actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid", checkProductAndCartExistence, cartsControllers.updateQuantityProductInCart);


//El endpoint se encarga de eliminar todos los productos del carrito
router.delete("/:cid", checkCartExistance, cartsControllers.clearProductsToCart);


export default router