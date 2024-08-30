export const resUserDto = (user) => {
  return {
    Id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    cart: user.cart
  }
}