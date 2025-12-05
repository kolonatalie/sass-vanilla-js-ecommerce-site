import { fetchProductsByBlock, fetchAllProducts } from '../core/fetchProducts.js';
import { getRandomProducts } from '../core/randomProducts.js';
import { setupCardNavigation } from '../ui/cardNavigation.js';
import { setupAddToCartListeners } from '../ui/addToCartSetup.js';
import { getAssetUrl } from '../ui/pathUtils.js';

const BLOCK_CONFIG = {
  
  'newProducts': {
    blockName: "New Products Arrival",
    selector: '.product-grid.new-arrival',
    count: 4
  },
  'selectedProducts': {
    blockName: "Selected Products",
    selector: '.product-grid.selected',
    count: 4
  },
  'youMayAlsoLike': {
    blockName: "You May Also Like",
    selector: '.product-grid.also-like',
    count: 4
  }
};


function renderProductCard(cardElement, product) {
  if (!product || !cardElement) return;

  cardElement.dataset.productId = product.id;

  const img = cardElement.querySelector('.product-card-image');
  if (img) {
    img.src = getAssetUrl(product.imageUrl);
    img.alt = product.name;
  }

  const title = cardElement.querySelector('.product-title');
  if (title) {
    title.textContent = product.name;
  }

  const priceDisplay = cardElement.querySelector('.price-display');
  if (priceDisplay) {
    priceDisplay.textContent = `$${product.price}`;
  }

  const saleBadge = cardElement.querySelector('.sale-badge');
  if (saleBadge) {
    if (product.salesStatus) {
      saleBadge.classList.remove('hidden');
    } else {
      saleBadge.classList.add('hidden');
    }
  }

  const addToCartBtn = cardElement.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.dataset.productId = product.id;
  }
}


async function initializeBlock(config, allProducts, productsWithListeners) {
  const container = document.querySelector(config.selector);
  if (!container) {
    return;
  }

  let productList = [];

  if (config.blockName === "You May Also Like") {
    productList = getRandomProducts(allProducts, config.count);
  } else if (config.blockName) {
    const products = await fetchProductsByBlock(config.blockName);
    productList = getRandomProducts(products, config.count);
  } else {
    return;
  }

  const productCards = container.querySelectorAll('.product-card');

  productList.forEach((product, index) => {
    const cardElement = productCards[index];
    if (cardElement) {
      renderProductCard(cardElement, product);
      productsWithListeners.push(product);
    }
  });
  setupCardNavigation(container, '.product-card');
}


export async function initializeAllProductBlocks() {
  const allProducts = await fetchAllProducts();
  if (allProducts.length === 0) {
    return;
  }

  const allRenderedProducts = [];

  await initializeBlock(BLOCK_CONFIG.newProducts, allProducts, allRenderedProducts);
  await initializeBlock(BLOCK_CONFIG.selectedProducts, allProducts, allRenderedProducts);
  await initializeBlock(BLOCK_CONFIG.youMayAlsoLike, allProducts, allRenderedProducts);

  setupAddToCartListeners(allRenderedProducts);
}