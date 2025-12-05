const DISCOUNT_THRESHOLD = 3000;
const DISCOUNT_RATE = 0.10; // 10%

export function calculateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const shipping = subtotal > 500 ? 0 : 30;

  let discountAmount = 0;
  if (subtotal >= DISCOUNT_THRESHOLD) {
    discountAmount = subtotal * DISCOUNT_RATE;
  }

  const total = subtotal - discountAmount + shipping;

  return {
    subtotal,
    shipping,
    discountAmount,
    total
  };
}