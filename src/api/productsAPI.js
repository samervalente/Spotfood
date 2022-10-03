import axios from "axios";

const baseURL = "http://localhost:5000";

export async function getProductById(productId, config) {
  try {
    const { data } = await axios.get(
      `${baseURL}/products/${productId}`,
      config
    );

    return data;
  } catch (error) {
    alert("Não foi possível carregar o produto");
  }
}

export async function addProductToCart(productId, amount, config) {
  try {
    await axios.post(`${baseURL}/products/${productId}/cart`, amount, config);
  } catch (error) {
    alert(
      "Não foi possível adicionar este produto ao carrinho. Tente novamente"
    );
  }
}

export async function removeProductsFromCart(productId, config) {
  try {
    const response = await axios.delete(`${baseURL}/products/${productId}/cart`, config);
    console.log(response)
  } catch (error) {
    alert("Não foi possível remover este produto do carrinho. Tente novamente");
  }
}

export async function registerPurchase(products, config) {
  try {
    await axios.post(`${baseURL}/products/purchase`, products, config);
  } catch (error) {
    alert("Não foi possível realizar a compra. Por favor, tente novamente.");
  }
}
