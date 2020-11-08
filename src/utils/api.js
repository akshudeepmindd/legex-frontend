import axios from "axios"

const $http = () => {
<<<<<<< HEAD
  const baseAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
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
=======
	const baseAxios = axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	})
	//get token from local storage
	const token = localStorage.getItem("access-token")
	if (token) {
		baseAxios.defaults.headers.common.Authorization = `Bearer ${token}`
	}
	return baseAxios
}
>>>>>>> 9630a5bfe116c48d6a7f7184a8ca5c9444404d42

export default $http
