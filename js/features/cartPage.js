import { fetchAllProducts } from '../core/fetchProducts.js';
import { getCart } from '../core/cartCore.js';
import { populateCart } from '../core/cartDataMapper.js';
import { renderCartItems } from '../rendering/cartItemRenderer.js';
import { renderCartTotals } from '../rendering/cartTotalsRenderer.js';
import { setupCartEventListeners } from '../ui/cartInteractions.js';



export async function renderCartPage() {
  const cartContainer = document.querySelector('.cart-items-container');
  const cartHeader = document.querySelector('.cart-header');
  const totalsContainer = document.querySelector('.cart-totals-container');
  const emptyMessageContainer = document.querySelector('.cart-empty-message');

  let cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    cartHeader.style.visibility = 'hidden';
    emptyMessageContainer.style.display = 'block';
    totalsContainer.style.display = 'none';
    return;
  }

  emptyMessageContainer.style.display = 'none';
  cartHeader.style.visibility = 'visible';

  const allProducts = await fetchAllProducts();
  const populatedCart = populateCart(cart, allProducts);

  renderCartItems(populatedCart, cartContainer);
  renderCartTotals(populatedCart, totalsContainer);
  setupCartEventListeners();
}