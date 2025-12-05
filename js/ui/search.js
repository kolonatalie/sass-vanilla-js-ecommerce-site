import { showToast } from './showToast.js';
import { updateCatalog } from '../features/catalog.js';

export function setupSearch(allProducts) {
  const searchInput = document.querySelector("#search-models");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    updateCatalog(filtered);

    if (filtered.length === 0 && query !== "") {
      showToast("Product not found", "error");
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim().toLowerCase();
      const matches = allProducts.filter(product =>
        product.name.toLowerCase() === query
      );

      if (matches.length === 1) {
        window.location.href = `product-details-template.html?id=${matches[0].id}`;
      } else if (matches.length === 0) {
        showToast("Product not found", "error");
      } else {
        updateCatalog(allProducts.filter(product =>
          product.name.toLowerCase().includes(query)
        ));
      }
    }
  });
}