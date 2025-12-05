const getDetailsPagePath = () => {
    const pathname = window.location.pathname;

    if (pathname.includes('/pages/')) {
        return `../pages/product-details-template.html`; 
    } 
    
    return `./pages/product-details-template.html`; 
};

export function setupCardNavigation(container, cardSelector) {
  const productCards = container.querySelectorAll(cardSelector);

  const detailsPageBaseUrl = getDetailsPagePath();
  
  productCards.forEach((card) => {
    card.addEventListener('click', function (event) {
      if (event.target.closest('button')) {
        return; 
      }
      const productId = card.dataset.productId;
      window.location.href = `${detailsPageBaseUrl}?id=${productId}`;
    });
    card.style.cursor = 'pointer';
  });
}