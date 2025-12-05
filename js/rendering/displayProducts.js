import { setupAddToCartListeners } from '../ui/addToCartSetup.js';
import { updateCartCounter } from '../ui/cartDisplay.js';
import { setupCardNavigation } from '../ui/cardNavigation.js';
import { getAssetUrl } from '../ui/pathUtils.js';


export const isProductOnSale = (status) => status === true || status === "true";

const displayProducts = (products, container) => {
  if (!products || products.length === 0) {
    container.innerHTML = "";
    return;
  }

  const newProducts = products
    .map((product) => {
      const { id, imageUrl, name, price, salesStatus } = product;
      const saleBadgeClass = isProductOnSale(salesStatus) ? '' : 'hidden';
      const finalImageUrl = getAssetUrl(imageUrl);
      
      return `
        <div class="product-card" data-product-id="${id}">
          <div>
            <div class="product-image-container">
              <img class="product-card-image" src="${finalImageUrl}" alt="Loading ${name}">
              <span class="sale-badge ${saleBadgeClass}">Sale</span>
            </div>
            <div class="product-info in-catalog">
              <p class="product-title">${name}</p>
              <p class="price-display">$${price}</p>
            </div>
          </div>
          <button class="add-to-cart-btn" data-product-id="${id}">Add to Cart</button>
        </div>
       `;
    })
    .join('');
  container.innerHTML = newProducts;

  setupCardNavigation(container, '.product-card');
  setupAddToCartListeners(products);
  updateCartCounter();
};

export default displayProducts;