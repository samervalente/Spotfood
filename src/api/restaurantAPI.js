import api from "./api";

export async function getAllRestaurants(config) {
  try {
    const { data } = await api.get(`/restaurants`, config);
    return data;
  } catch (error) {
    alert("error");
  }
}

export async function getRestaurantById(restaurantId, config) {
  try {
    const { data } = await api.get(`/restaurants/${restaurantId}`, config);

    return data;
  } catch (error) {
    alert("Não foi possível pegar os dados do restaurante.");
  }
}

export async function getRestaurantProducts(restaurantId, config) {
  try {
    const { data } = await api.get(
      `/restaurants/${restaurantId}/products`,
      config
    );
    return data;
  } catch (error) {
    alert("Não foi possível carregar os produtos deste restaurante.");
  }
}

export async function filterRestaurants(state, city, config) {
  try {
    const { data } = await api.get(
      `/restaurants/filter?state=${state}&city=${city}`,
      config
    );

    return data;
  } catch (error) {
    alert(
      "Não foi possível filtrar pela localidade. Por favor, tente novamente."
    );
  }
}
