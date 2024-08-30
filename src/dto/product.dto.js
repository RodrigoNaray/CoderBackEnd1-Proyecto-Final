export const resProductDto = (product) => {
  return {
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
  }
}