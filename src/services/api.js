import axios from "axios";

const api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/",
});

export default api;