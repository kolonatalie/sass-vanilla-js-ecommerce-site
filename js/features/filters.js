import { isProductOnSale } from '../rendering/displayProducts.js';

let activeFilters = {
  category: "all",
  color: "all",
  size: "all",
  salesStatus: false,
  search: "",
  sortBy: "default"
};

export function updateFilter(key, value) {
  activeFilters[key] = value;
};

export function resetFilters() {
  activeFilters = {
    category: 'all',
    color: 'all',
    size: 'all',
    salesStatus: false,
    sortBy: 'default',
    search: ''
  };
}

export function filterProducts(products) {
  let filtered = [...products];

  if (activeFilters.category !== "all") {
    filtered = filtered.filter(p => p.category === activeFilters.category);
  }

  if (activeFilters.color !== "all") {
    filtered = filtered.filter(p => p.color === activeFilters.color);
  }

  if (activeFilters.size !== "all") {
    const selectedSize = activeFilters.size;

    filtered = filtered.filter(p => {
      if (selectedSize === "S-L") {
        const productSize = p.size;
        return productSize === "S" || productSize === "M" || productSize === "L";
      } else {
        return p.size === selectedSize;
      }
    });
  }

  if (activeFilters.salesStatus) {
    filtered = filtered.filter(p => isProductOnSale(p.salesStatus));
  }

  if (activeFilters.search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(activeFilters.search.toLowerCase())
    );
  }

  switch (activeFilters.sortBy) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "popularity_desc":
      filtered.sort((a, b) => b.popularity - a.popularity);
      break;
    case "rating_desc":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return filtered;
};