import { getProductReviews } from '../core/reviewData.js'; 

export function updateReviewCounts(productId) {
  const productReviews = getProductReviews(productId);
  const count = productReviews.length + 1;

  const reviewHeader = document.querySelector('.review-header');
  if (reviewHeader) {
    const productName = document.querySelector('.product-title').textContent || "Product";
    reviewHeader.textContent = `${count} review${count !== 1 ? 's' : ''} for ${productName}`;
  }

  const clientReviewSpan = document.querySelector('.client-review-count');
  if (clientReviewSpan) {
    clientReviewSpan.textContent = `(${count} Client${count !== 1 ? 's' : ''} Review${count !== 1 ? 's' : ''})`;
  }
}


export function renderReviews(productReviews) {
  const reviewsListContainer = document.querySelector('.reviews-list');
  if (!reviewsListContainer) return;

  reviewsListContainer.innerHTML = '';

  productReviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('single-review');

    const dateString = new Date(review.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    const starsDisplay = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    reviewElement.innerHTML = `
      <img src="../assets/images/icons/review-avatar.webp" alt="${review.name}">
      <div class="review-text-container">
        <div class="review-meta">
          <span class="review-author">${review.name}</span>
          <span class="review-date">${dateString}</span>
          <span class="review-rating">${starsDisplay}</span>
        </div>
        <p class="review-text">${review.text}</p>
      </div>
    `;
    reviewsListContainer.appendChild(reviewElement);
  });
}