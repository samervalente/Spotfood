import api from "./api";

export async function getProductById(productId, config) {
  try {
    const { data } = await api.get(`/products/${productId}`, config);

    return data;
  } catch (error) {
    alert("Não foi possível carregar o produto");
  }
}

export async function addProductToCart(productId, amount, config) {
  try {
    await api.post(`/products/${productId}/cart`, amount, config);
  } catch (error) {
    alert(
      "Não foi possível adicionar este produto ao carrinho. Tente novamente"
    );
  }
}

export async function removeProductsFromCart(productId, config) {
  try {
    await api.delete(`/products/${productId}/cart`, config);
  } catch (error) {
    alert("Não foi possível remover este produto do carrinho. Tente novamente");
  }
}

export async function registerPurchase(products, config) {
  try {
    const response = await api.post(
      `/products/purchase`,
      products,
      config
    );
    return response;
  } catch (error) {
    alert("Não foi possível realizar a compra. Por favor, tente novamente.");
  }
}
