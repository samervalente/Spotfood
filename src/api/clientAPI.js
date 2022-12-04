import api from "./api";

export async function registerClient(clientData) {
  try {
    const response = await api.post(`/clients`, clientData);

    return response.status;
  } catch (error) {
    if (error.response.status === 409) {
      return alert("Já existe uma conta com este email.");
    }

    alert("Não foi possível registrar. Por favor, verifique seus dados.");
  }
}

export async function loginClient(clientData) {
  try {
    const response = await api.post(`/clients/login`, clientData);

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      return alert("Email ou senha incorretos.");
    }

    alert("Não foi possível logar. Por favor, verifique seus dados.");
  }
}

export async function getClientCart(config) {
  try {
    const { data } = await api.get(`/clients/carts`, config);
    return data;
  } catch (error) {
    alert("Não foi possível carregar o carrinho.");
  }
}

export async function getClientOrders(config) {
  try {
    const { data } = await api.get(`/clients/orders`, config);
    return data;
  } catch (error) {
    alert("Não foi possível carregar os pedidos.");
  }
}
