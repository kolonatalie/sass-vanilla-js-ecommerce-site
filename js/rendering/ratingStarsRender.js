export function generateRatingStars(rating) {
  return `
  <div class="stars-container">
    <span class="product-rating" style="--rating: ${rating};"></span>
  </div>
  `;
}