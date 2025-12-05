export function updateResultsInfo(pages, index, itemsPerPage) {
  
  const resultsInfo = document.querySelector(".results-info");
  if (!resultsInfo) return;

  const totalProducts = pages.flat().length;

  if (totalProducts === 0) {
    resultsInfo.textContent = "No products found";
    return;
  }

  const perPage = pages[index].length;
  const start = index * itemsPerPage + 1;
  const end = start + perPage - 1;

  resultsInfo.textContent = `Showing ${start}-${end} of ${totalProducts} Results`;
};