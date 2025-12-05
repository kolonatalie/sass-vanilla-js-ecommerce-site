import { showToast } from '../ui/showToast.js';
import { updateCartCounter } from '../ui/cartDisplay.js';


export function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    showToast('Your cart went outside for a smoke. Be back never.', 'error', 5000);
    console.error("Cart retrieval error:", e);
    return [];
  }
}


export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
}


export function addToCartWithQuantity(product, quantity = 1, size = null, color = null) {
  const cart = getCart();
  const itemSignature = { id: product.id, size: size, color: color };
  const existingItemIndex = cart.findIndex(item =>
    item.id === itemSignature.id &&
    item.size === itemSignature.size &&
    item.color === itemSignature.color
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: size,
      color: color,
    });
  }
  saveCart(cart);
}


export function updateItemQuantity(targetId, newQuantity, size, color) {
  const cart = getCart();

  const existingItemIndex = cart.findIndex(item =>
    item.id === targetId && item.size === size && item.color === color
  );

  if (existingItemIndex > -1) {
    if (newQuantity <= 0) {
      cart.splice(existingItemIndex, 1);
    } else {
      cart[existingItemIndex].quantity = newQuantity;
    }
    saveCart(cart);
  }
}


export function clearCart() {
  localStorage.removeItem('cart');
  updateCartCounter();
  window.scrollTo({ top: 200, behavior: "smooth" });
}