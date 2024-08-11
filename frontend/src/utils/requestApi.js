import axios from "axios";

const requestApi = axios.create({
  baseURL: "https://economic.onrender.com/api/v1/"
});

export default requestApi;
  // baseURL: "http://localhost:8000/api/v1/"

