export function populateCart(cart, allProducts) {
  return cart.map(cartItem => {
    const productDetail = allProducts.find(p => p.id === cartItem.id) || {};
    const price = productDetail.price || cartItem.price || 0;

    return {
      ...cartItem,
      name: productDetail.name || cartItem.name || 'Unknown Product',
      price: price,
      imageUrl: productDetail.imageUrl || cartItem.imageUrl,
      itemTotal: price * cartItem.quantity
    };
  });
}