const DATA_FILE = 'assets/data.json';

const getProductUrl = () => {
  const pathname = window.location.pathname;

  if (pathname.includes('/pages/')) {
    return `../${DATA_FILE}`;
  }
  return `./${DATA_FILE}`;
};

let cachedProducts = null;

export const fetchAllProducts = async () => {
  if (cachedProducts) {
    return cachedProducts;
  }

  const url = getProductUrl();

  try {
    const response = await fetch(url);
    const ProductData = await response.json();
    cachedProducts = ProductData.data;
    return cachedProducts;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export const fetchProductById = async (id) => {
  const allProducts = await fetchAllProducts();
  const product = allProducts.find(p => p.id === id);
  return product || null;
}

export const fetchProductsByBlock = async (blockName) => {
  const allProducts = await fetchAllProducts();
  const productsInBlock = allProducts.filter(p =>
    p.blocks?.includes(blockName)
  );
  return productsInBlock;
}