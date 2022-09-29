import axios from "axios"
const baseURL = "http://localhost:4000"


export async function getAllRestaurants(config){

    try {
        const {data} = await axios.get(`${baseURL}/restaurants`, config)
       
        return data
    } catch (error) {
        alert(error)
    }
}

