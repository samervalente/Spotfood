import axios from "axios";

export async function getStates() {
  try {
    let { data } = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    data = data.sort((a, b) => a.nome.localeCompare(b.nome));
    return data;
  } catch (error) {
    alert("Não foi possível carregar os estados.");
  }
}

export async function getCity(stateId) {
  try {
    let { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
    );
    data = data.sort((a, b) => a.nome.localeCompare(b.nome));
    return data;
  } catch (error) {}
}
