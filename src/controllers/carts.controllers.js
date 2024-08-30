import cartServices from "../services/cart.services.js"

const createCart = async (req,res) => {
  try{

    const cart = await cartServices.createCart()

    res.status(201).json({status: "success", cart})

  }catch (error){
    console.log(500)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const getCartById = async (req, res) => {
  try{
    const { cid } = req.params
    const cart = await cartServices.getById(cid)

    res.status(200).json({status: "success", cart})


  }catch (error){
    console.log(error)
    res.status(500).json({status: "Error", msg: "Error interno del servidor"})
  }
}

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body
    
    
    const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

const deleteProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    
    const cartUpdate = await cartServices.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

const updateQuantityProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

const clearProductsToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    
    const cart = await cartServices.clearProductsToCart(cid);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

export default { 
  createCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart 
};