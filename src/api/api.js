import axios from "axios";

const baseURL = "spotfood-backend-production.up.railway.app";

const instance = axios.create({
  baseURL,
});

export default instance;
