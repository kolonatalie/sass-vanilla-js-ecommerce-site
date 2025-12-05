import { fetchAllProducts } from '../core/fetchProducts.js';
import { getRandomProducts } from '../core/randomProducts.js';
import { setupCardNavigation } from '../ui/cardNavigation.js';
import { generateRatingStars } from './ratingStarsRender.js';
import { getAssetUrl } from '../ui/pathUtils.js';


function createSetCardHTML(product) {
  const { id, imageUrl, name, price, rating } = product;
  const starsHTML = generateRatingStars(rating);
  const finalImageUrl = getAssetUrl(imageUrl);

  return `
    <div class="set-card" data-product-id="${id}">
        <img src="${finalImageUrl}" alt="${name}">
        <div class="set-info">
            <p class="set-name">${name}</p>
            ${starsHTML}
            <p class="set-price">$${price}</p>
        </div>
    </div>
  `;
}


export async function renderTopSetsBlock() {
  const maxTopSetsCount = 5; 
  const container = document.querySelector('#top-best-sets-list');

  if (!container) return;

  const allProducts = await fetchAllProducts();
  const setsPool = allProducts.filter(p => p.category === 'luggage sets');
  const randomSets = getRandomProducts(setsPool, maxTopSetsCount);
  const html = randomSets.map(set => createSetCardHTML(set)).join('');
  container.innerHTML = html;

  setupCardNavigation(container, '.set-card'); 
}