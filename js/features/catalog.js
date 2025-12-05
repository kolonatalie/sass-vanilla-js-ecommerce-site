import { fetchAllProducts } from '../core/fetchProducts.js';
import displayProducts from '../rendering/displayProducts.js';
import { paginate, itemsPerPage } from '../ui/paginate.js';
import displayButtons from '../ui/displayButtons.js';
import { updateResultsInfo } from '../rendering/resultsInfo.js';
import { updateFilter, resetFilters, filterProducts } from './filters.js';
import { setupDropdownFilters, setupStaticFilters } from '../ui/filterUI.js';
import { setupSearch } from '../ui/search.js';
import { showToast } from '../ui/showToast.js';

const btnContainer = document.querySelector('.btn-container');

let index = 0;
let pages = [];
let allProducts = [];

export const updateCatalog = (filteredProducts) => {
  pages = paginate(filteredProducts);
  index = 0;
  setupUI();
};


const setupUI = () => {
  const container = document.querySelector('.container');

  if (pages.flat().length === 0) {
    container.innerHTML = `
        <div class="no-products">
          <p class="no-products-title">We looked everywhere… <br> even under the couch cushions.<br> No luck.</p>
          <p>Hit "Clear Filters" and try again!</p>
          <img src="../assets/videos/sad.gif" alt="No products found" class="gif">
        </div>
      `;
    btnContainer.style.display = "none";
  } else {
    displayProducts(pages[index], container);
    btnContainer.style.display = "flex";
  }

  displayButtons(btnContainer, pages, index);
  updateResultsInfo(pages, index, itemsPerPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
};


const applyFilters = () => {
  const filtered = filterProducts(allProducts);

  if (filtered.length === 0) {
    showToast("Oops. That product is so exclusive, even we can’t find it.", "error", 5000);
  }
  updateCatalog(filtered);
};


const paginationHandler = (target) => {
  if (target.classList.contains('page-btn')) {
    index = parseInt(target.dataset.index);
  }
  if (target.classList.contains('next-btn') && index < pages.length - 1) {
    index++;
  }
  if (target.classList.contains('prev-btn') && index > 0) {
    index--;
  }
  setupUI();
};


function setupPaginationListeners(btnContainer, paginationHandler) {
  btnContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-container')) return;
    paginationHandler(e.target);
  });
}


const init = async () => {
  allProducts = await fetchAllProducts();

  pages = paginate(allProducts);
  setupUI();

  setupDropdownFilters(applyFilters, updateFilter);
  setupStaticFilters(applyFilters, updateFilter, resetFilters);
  setupPaginationListeners(btnContainer, paginationHandler);
  setupSearch(allProducts, updateCatalog);
};


export function setupCatalog() {
  window.addEventListener('load', init);
}