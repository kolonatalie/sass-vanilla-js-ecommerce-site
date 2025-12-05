import { fetchProductById } from './core/fetchProducts.js';
import { NavBar } from './ui/navToggle.js';
import { setupLoginModal } from './ui/loginModal.js';
import { initializeFormValidation } from './core/formValidation.js';
import { carouselLogic } from './ui/carousel.js';
import { showThankYou } from './ui/contactForm.js';
import { setupCatalog } from './features/catalog.js';
import { renderTopSetsBlock } from './rendering/topSetsRender.js';
import { setupTabs } from './ui/tabs.js';
import { initializeAllProductBlocks } from './features/productBlockRenderer.js';
import { setupProductDetailsPage } from './features/productDetails.js';
import { renderCartPage } from './features/cartPage.js';
import { updateCartCounter } from './ui/cartDisplay.js';
updateCartCounter();
import { setupScrollReveal } from './ui/scrollReveal.js';

function initFeature(selector, callback) {
  const els = document.querySelectorAll(selector);
  if (els.length > 0) callback();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeAllProductBlocks();
  updateCartCounter();

  initFeature(".fade-in-section", setupScrollReveal);
  initFeature(".nav-toggle", NavBar);
  initFeature(".modal-btn", setupLoginModal);
  initFeature('[required]', initializeFormValidation);
  initFeature(".inner", carouselLogic);
  initFeature("#contact-form-box", showThankYou);
  initFeature(".btn-container", setupCatalog);
  initFeature("#top-best-sets-list", renderTopSetsBlock);
  initFeature(".tab-btn", setupTabs);

  initFeature(".product-details-page", () => setupProductDetailsPage(fetchProductById));
  initFeature(".cart-page-template", renderCartPage);
});


/*
---------------
Back To Top
---------------
*/

window.addEventListener('scroll', () => {
  const backToTopButton = document.getElementById('back-to-top');
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 500) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});