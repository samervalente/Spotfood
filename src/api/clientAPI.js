import axios from "axios"
const baseURL = "http://localhost:4000"


export async function registerClient(clientData){
    try {
        const response = await axios.post(`${baseURL}/clients`, clientData)
        return response.data

    } catch (error) {
        alert("Não foi possível registrar. Por favor, verifique seus dados.")
    }
}