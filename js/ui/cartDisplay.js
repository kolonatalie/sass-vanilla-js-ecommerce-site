import { getCart } from '../core/cartCore.js';

const cartCounter = document.getElementById('cart-counter');


export function updateCartCounter() {

  if (!cartCounter) {
    console.error("Error: Cart counter element (#cart-counter) not found in the DOM.");
    return;
  }
  const cart = getCart();
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCounter.textContent = itemCount;
  cartCounter.style.display = itemCount === 0 ? 'none' : 'flex';
}


export function animateAddToCartButton(button, quantity = 1, duration = 3000) {
  const originalText = button.textContent;
  const feedbackText = quantity === 1 ? 'Added!' : `Added ${quantity} items!`;

  button.textContent = feedbackText;
  button.classList.add('added');
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('added');
    button.disabled = false;
  }, duration);
}