import { renderProduct } from '../rendering/productRenderer.js';
import { setupQuantitySelector } from '../ui/quantitySelector.js';
import { setupAddToCartButton } from '../ui/addToCartSetup.js';

import { setupStarRating } from '../ui/starRating.js';
import { handleReviewSubmission } from '../ui/reviewFormHandler.js';
import { updateReviewCounts, renderReviews } from '../rendering/reviewRenderer.js';
import { getProductReviews } from '../core/reviewData.js';
import { setupProductOptionSelectors } from '../ui/productOptionsUI.js';
import { showToast } from '../ui/showToast.js';


const getFirstOptionValue = (product, key) => {
  const value = product[key];
  if (!value) return null;

  if (typeof value === 'string') {
    const parts = value.split(',').map(v => v.trim()).filter(v => v);
    return parts.length > 0 ? parts[0] : null;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : null;
  }
  return value;
}

export async function setupProductDetailsPage(fetchProductById) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const productContainer = document.querySelector('.product-container');

  let selectedVariants = {
    size: null,
    color: null,
    category: null,
  };

  const updateSelectedVariant = (key, value) => {
    selectedVariants[key] = value === 'all' ? null : value;
    console.log(`Variant selected: ${key} = ${selectedVariants[key]}`);
  };
  if (!productId) {
    showToast("Oops! This link is as broken as my diet plan.", 'error'); 
    console.error("No product ID found in the URL.");
    return;
  }
  try {
    const product = await fetchProductById(productId);

    if (product) {
      selectedVariants.size = getFirstOptionValue(product, 'size');
      selectedVariants.color = getFirstOptionValue(product, 'color');
      selectedVariants.category = getFirstOptionValue(product, 'category');

      renderProduct(product);
      setupQuantitySelector(product);

      setupProductOptionSelectors(updateSelectedVariant);
      setupAddToCartButton(product, () => selectedVariants);

      setupStarRating();
      updateReviewCounts(productId);
      renderReviews(getProductReviews(productId));
      handleReviewSubmission(productId);
      renderProduct(product);
      productContainer.classList.remove('is-loading');
    } else {
      console.error(`Product with ID ${productId} not found.`);
      showToast("RIP product! Gone but not forgotten.", 'error');
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    showToast("Network issues. Even WiFi needs a nap.", 'error');
  }
}