import axios from "axios";
const baseURL = "http://localhost:5000";

export async function registerClient(clientData) {
  try {
    const response = await axios.post(`${baseURL}/clients`, clientData);

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
    const response = await axios.post(`${baseURL}/clients/login`, clientData);

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      return alert("Email ou senha incorretos.");
    }

    alert("Não foi possível logar. Por favor, verifique seus dados.");
  }
}

export async function validateToken(body, config) {
  try {
    const { status } = await axios.post(
      `${baseURL}/auth/validate`,
      body,
      config
    );
    return status;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
