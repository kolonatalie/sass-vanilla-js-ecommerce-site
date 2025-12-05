import { getAssetUrl } from '../ui/pathUtils.js';

export function renderCartItems(populatedCart, container) {

  container.innerHTML = populatedCart.map(item => {
    const finalImageUrl = getAssetUrl(item.imageUrl);

    return `
      <div class="cart-item" data-product-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
        <img src="${finalImageUrl}" alt="${item.name}" class="cart-item-image">
        <span class="cart-item-name">${item.name} ${item.size ? `(${item.size})` : ''}</span>
        <span class="cart-item-price">$${item.price}</span>
        
        <div class="cart-quantity-controls">
            <button class="qty-minus" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">-</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
            <button class="qty-plus" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">+</button>
        </div>
        <span class="cart-item-total">$${item.itemTotal}</span>
        <button class="cart-item-delete" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="trash" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>
      </div>
      `;
  }).join('');
}