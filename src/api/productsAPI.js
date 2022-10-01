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


export async function registerPurchase(products, config){
  try {
    await axios.post(`${baseURL}/products/purchase`, products, config)

  } catch (error) {
    alert("Não foi possível realizar a compra. Por favor, tente novamente.")
  }
}