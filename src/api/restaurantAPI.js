import axios from "axios";

const baseURL = process.env.API_CONNECT_BASE_URL;

export async function getAllRestaurants(config) {
  try {
    const { data } = await axios.get(`${baseURL}/restaurants`, config);
    return data;
  } catch (error) {
    alert("error");
  }
}

export async function getRestaurantById(restaurantId, config) {
  try {
    const { data } = await axios.get(
      `${baseURL}/restaurants/${restaurantId}`,
      config
    );

    return data;
  } catch (error) {
    alert("Não foi possível pegar os dados do restaurante.");
  }
}

export async function getRestaurantProducts(restaurantId, config) {
  try {
    const { data } = await axios.get(
      `${baseURL}/restaurants/${restaurantId}/products`,
      config
    );
    return data;
  } catch (error) {
    alert("Não foi possível carregar os produtos deste restaurante.");
  }
}

export async function filterRestaurants(state, city, config) {
  try {
    const { data } = await axios.get(
      `${baseURL}/restaurants/filter?state=${state}&city=${city}`,
      config
    );

    return data;
  } catch (error) {
    alert(
      "Não foi possível filtrar pela localidade. Por favor, tente novamente."
    );
  }
}
