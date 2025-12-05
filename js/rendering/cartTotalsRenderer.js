import { calculateTotals } from '../core/cartCalculations.js';

export function renderCartTotals(cart, totalsContainer) {
  const totals = calculateTotals(cart);
  const discount = parseFloat(totals.discountAmount);

  totalsContainer.innerHTML = `
    <div class="cart-main-totals">
      <div class="cart-total-line">
        <span>Sub Total:</span><span>$${totals.subtotal}</span>
      </div>
      ${discount > 0 ? `<div class="cart-total-line discount-line"><span>Discount
          (10%):</span><span>-$${totals.discountAmount}</span></div>` : ''}
      <div class="cart-total-line">
        <span>Shipping:</span><span>$${totals.shipping}</span>
      </div>
      <div class="cart-total-line final-total">
        <span>Total:</span><span>$${totals.total}</span>
      </div>
      <button id="checkout-btn" class="add-to-cart-btn">CHECKOUT</button>
    </div>
    <div class="cart-buttons">
      <a href="./catalog.html" class="main-btn">Continue Shopping</a>
      <button id="clear-cart-btn" class="main-btn">Clear Cart</button>
    </div>
  `;
}