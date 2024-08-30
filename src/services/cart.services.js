import cartRepository from "../persistance/mongoDB/cart.repository.js"
import productRepository from "../persistance/mongoDB/product.repository.js";

const createCart = async () => {
  return await cartRepository.create();
}

const getCartById = async (cid) => {
  return await cartRepository.getById(cid);
}

const addProductToCart = async (cid, pid) => {
  return await cartRepository.addProductToCart(cid, pid);
}

const deleteProductToCart = async (cid, pid) => {
  await cartRepository.deleteProductToCart(cid, pid);
}

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  await cartRepository.updateQuantityProductInCart(cid, pid, Number(quantity));
}

const clearProductsToCart = async (cid) => {
  return await cartRepository.clearProductsToCart(cid);
}

const purchaseCart = async (cid) => {
  const cart = await cartRepository.getById(cid);
  let total = 0;
  const productsWithoutStock = [];
  for (const productCart of cart.products) {
    const product = await productRepository.getById(productCart.product);

    if (product.stock >= productCart.quantity) {
      total += product.price * productCart.quantity;
      await productRepository.update(product._id, { stock: product.stock - productCart.quantity });
    } else {
      productsWithoutStock.push(productCart);
    }

    await cartRepository.update(cid, { products: productsWithoutStock });
  }

  return total;
}

export default { 
  createCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart ,
  purchaseCart
};