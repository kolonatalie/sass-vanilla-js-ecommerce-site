export function setupStarRating() {
  const ratingContainer = document.querySelector('.star-rating-input');
  if (!ratingContainer) return;

  const stars = ratingContainer.querySelectorAll('.star');
  let savedRating = parseInt(ratingContainer.dataset.rating);

  function updateVisualRating(value) {
    stars.forEach(star => {
      const starValue = parseInt(star.dataset.value);
      star.textContent = starValue <= value ? '★' : '☆';
    });
  }
  updateVisualRating(savedRating);

  stars.forEach(star => {
    star.addEventListener('mouseover', function () {
      const hoverValue = parseInt(this.dataset.value);
      updateVisualRating(hoverValue);
    });

    star.addEventListener('mouseout', function () {
      updateVisualRating(savedRating);
    });

    star.addEventListener('click', function () {
      savedRating = parseInt(this.dataset.value);
      ratingContainer.dataset.rating = savedRating;
      updateVisualRating(savedRating);
    });
  });
}

export function getSelectedRating() {
  return parseInt(document.querySelector('.star-rating-input').dataset.rating) || 0;
}