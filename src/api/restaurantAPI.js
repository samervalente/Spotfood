import axios from "axios";
const baseURL = "http://localhost:5000";

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
      console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    alert("Não foi possível pegar os dados do restaurante.");
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

