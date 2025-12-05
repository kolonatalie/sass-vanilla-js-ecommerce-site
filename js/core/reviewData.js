const REVIEWS_KEY = 'product_reviews';

export function getProductReviews(productId) {
  const allReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
  return allReviews.filter(review => review.productId === productId.toString());
}

export function saveNewReview(newReview) {
  const allReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
  allReviews.push(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
}