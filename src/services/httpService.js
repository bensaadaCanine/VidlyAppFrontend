import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const service = {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  setJWT,
};

export default service;
