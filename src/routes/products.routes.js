import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import productsControllers from "../controllers/products.controllers.js";

const router = Router();

// Este endpoint se encarga de obtener todos los productos respetando las opciones de filtrado
router.get("/",passportCall("jwt"), authorization("user"), productsControllers.getAllProducts)

// Este endpoint se encarga de obtener un producto por su id
router.get("/:pid", productsControllers.getProductById)

// Este endpoint se encarga de crear un producto
router.post("/",authorization("admin"),checkProductData, productsControllers.createProduct)

// Este endpoint se encarga de actualizar un producto
router.put("/:pid",authorization("admin"), productsControllers.updateProduct)

// Este endpoint se encarga de eliminar un producto
router.delete("/:pid", authorization("admin"), productsControllers.deleteOneProduct)


export default router