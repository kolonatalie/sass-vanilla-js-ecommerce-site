export const itemsPerPage = 12;

export const paginate = (products) => {
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProducts;
};