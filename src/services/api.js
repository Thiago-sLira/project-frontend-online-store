export async function getCategories() {
  const url = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await url.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  // const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const response = await url.json();
  return response;
}

export async function getProductById(productId) {
  const url = await fetch(`https://https://api.mercadolibre.com/items/${productId}`);
  const response = await url.json();
  return response;
}
