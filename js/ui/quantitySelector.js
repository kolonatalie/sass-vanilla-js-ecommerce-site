export function setupQuantitySelector() {
  const qtyInput = document.querySelector('.quantity-input');
  const minusBtn = document.querySelector('.minus-btn');
  const plusBtn = document.querySelector('.plus-btn');

  if (!qtyInput) return;

  qtyInput.value = 1;
  qtyInput.min = 1;

  minusBtn.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
      qtyInput.value = currentQty - 1;
    }
  });

  plusBtn.addEventListener('click', () => {
    let currentQty = parseInt(qtyInput.value);
    qtyInput.value = currentQty + 1;
  });
  
  qtyInput.addEventListener('change', () => {
    if (parseInt(qtyInput.value) < 1 || isNaN(parseInt(qtyInput.value))) {
      qtyInput.value = 1;
    }
  });
}