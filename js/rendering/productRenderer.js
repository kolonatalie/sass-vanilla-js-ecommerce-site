import { generateRatingStars } from './ratingStarsRender.js';
import { getAssetUrl } from '../ui/pathUtils.js';

export function renderProduct(product) {
  const { name, price, imageUrl, rating } = product;
  const finalImageUrl = getAssetUrl(imageUrl);

  document.querySelector('.product-title').textContent = name;
  document.querySelector('.product-price').textContent = `$${price}`;
  document.querySelector('.product-title-description').textContent = name;
  document.querySelector('.main-product-image').src = finalImageUrl;
  document.querySelector('.main-product-image').alt = name;

  const thumbnailImages = document.querySelectorAll('.thumbnail-gallery-image');
  thumbnailImages.forEach(img => {
    img.src = finalImageUrl;
    img.alt = `Thumbnail of ${name}`;
  });
  renderProductOptions(product);

  const starsHTML = generateRatingStars(rating);
  const ratingContainer = document.querySelector('.product-rating-container');

  if (ratingContainer) {
    ratingContainer.innerHTML = starsHTML;
  }
}

function renderProductOptions(product) {
  const filterKeys = ['size', 'color', 'category'];

  filterKeys.forEach(key => {
    const optionList = document.querySelector(`#${key}-selector .filter-options`);

    optionList.innerHTML = '';
    let values = product[key];

    if (typeof values === 'string') {
      values = values.split(',').map(v => v.trim());
    } else if (!Array.isArray(values)) {
      values = [values].filter(v => v != null);
    }

    const newOptionsHTML = values.map(value => {
      const displayValue = value.charAt(0).toUpperCase() + value.slice(1);
      return `
            <li data-filter-value="${value}">${displayValue}</li>
            `;
    }).join('');
    
    optionList.insertAdjacentHTML('beforeend', newOptionsHTML);
  });
}