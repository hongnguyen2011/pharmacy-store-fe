import axios from "axios";

const requestApi = axios.create({
  //baseURL: "https://economic.onrender.com/api/v1/"
  baseURL: "https://localhost:7102/api/"
});

export default requestApi;
  // baseURL: "http://localhost:8000/api/v1/"

