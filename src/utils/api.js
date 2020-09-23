import axios from "axios";

const $http = () => {
  const baseAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  //get token from local storage
  const token = localStorage.getItem("access-token");
  if (token) {
    baseAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return baseAxios;
};

export default $http;
