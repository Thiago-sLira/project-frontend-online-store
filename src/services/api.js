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
  const url = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const response = await url.json();
  return response;
}

// função de adicionar produtos ao localStorage
export function handleLocalStorage(foundProduct) {
  const getLocalStorageProducts = JSON.parse(localStorage.getItem('cart'));
  const getCartProducts = getLocalStorageProducts.map((product, index) => {
    product.index = index;
    return product;
  });
  const getIndex = getCartProducts[getCartProducts.length - 1];
  foundProduct.index = !getIndex ? 0 : getIndex.index + 1;
  if (!getCartProducts) {
    localStorage.setItem('cart', JSON.stringify([foundProduct]));
  } else {
    localStorage.setItem('cart', JSON.stringify([...getCartProducts, foundProduct]));
  }
}
