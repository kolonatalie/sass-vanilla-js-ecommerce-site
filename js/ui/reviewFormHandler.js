import { getSelectedRating } from './starRating.js';
import { getProductReviews, saveNewReview } from '../core/reviewData.js';
import { renderReviews, updateReviewCounts } from '../rendering/reviewRenderer.js';


export function displayThankYouMessage(formContainer) {
  const thankYouMessage = formContainer.querySelector('.review-submitted-message');
  const formContent = formContainer.querySelector('.review-form-content');

  if (formContent && thankYouMessage) {
    formContent.style.display = 'none';
    thankYouMessage.style.display = 'block';

    setTimeout(() => {
      thankYouMessage.style.display = 'none';
      formContent.style.display = 'block';
    }, 5000);
  }
}


export function handleReviewSubmission(productId) {
  const form = document.querySelector('#review-form');
  const formContainer = document.querySelector('.review-submitting');

  if (!form || !formContainer) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="Name"]').value.trim();
    const text = form.querySelector('[name="Review"]').value.trim();
    const rating = getSelectedRating();

    if (!name || !text || rating === 0) {
      alert("Please ensure all required fields are filled and a star rating is selected.");
      return;
    }

    const newReview = {
      productId: productId,
      name: name,
      text: text,
      rating: rating,
      date: new Date().toISOString()
    };

    saveNewReview(newReview);
    renderReviews(getProductReviews(productId));
    updateReviewCounts(productId);

    form.reset();
    document.querySelector('.star-rating-input').dataset.rating = 0;
    displayThankYouMessage(formContainer);
  });
}