import { addToCartWithQuantity } from '../core/cartCore.js';
import { animateAddToCartButton } from './cartDisplay.js';
import { showToast } from './showToast.js';


export function setupAddToCartListeners(products) {
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productToAdd = products.find(p => String(p.id) === String(productId));

      if (productToAdd) {
        const defaultSize = productToAdd.size || null;
        const defaultColor = productToAdd.color || null;

        addToCartWithQuantity(productToAdd, 1, defaultSize, defaultColor);

        animateAddToCartButton(button, 1, 3000);

        showToast(`Boom! ${productToAdd.name} is added to cart`, 'success');
      }
    });
  });
}


export function setupAddToCartButton(product, getSelectedVariants) {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const qtyInput = document.querySelector('.quantity-input');

  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value) || 1;
    const variants = getSelectedVariants();
    const size = variants.size;
    const color = variants.color;

    addToCartWithQuantity(product, quantity, size, color);

    animateAddToCartButton(addToCartBtn, quantity, 1500);
  });
}