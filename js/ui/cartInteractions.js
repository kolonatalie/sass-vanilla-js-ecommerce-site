import { updateItemQuantity, clearCart } from '../core/cartCore.js';
import { renderCartPage } from '../features/cartPage.js';
import { showThankYouModal } from './thankYouModal.js';
import { setupClearCartConfirmation } from './clearCartConfirmation.js'; 

function getIdentifier(target) {
  return {
    id: target.dataset.id,
    size: target.dataset.size === 'null' ? null : target.dataset.size,
    color: target.dataset.color === 'null' ? null : target.dataset.color,
  };
}

export function setupCartEventListeners() {

  document.querySelectorAll('.qty-minus, .qty-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const { id, size, color } = getIdentifier(e.currentTarget);
      const qtyInput = e.currentTarget.parentNode.querySelector('.qty-input');
      let currentQty = parseInt(qtyInput.value);

      const newQty = e.currentTarget.classList.contains('qty-plus') ? currentQty + 1 : currentQty - 1;

      updateItemQuantity(id, newQty, size, color);
      renderCartPage();
    });
  });

  document.querySelectorAll('.cart-item-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const { id, size, color } = getIdentifier(e.currentTarget);
      updateItemQuantity(id, 0, size, color);
      renderCartPage();
    });
  });
 
  const handleClearCart = () => {
    clearCart();
    renderCartPage();
  };

  const showClearCartConfirmation = setupClearCartConfirmation(handleClearCart);

  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      showClearCartConfirmation();
    });
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {

      clearCart();
      showThankYouModal();
      renderCartPage();
    });
  }
}