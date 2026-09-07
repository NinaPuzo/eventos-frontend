import axios from "axios";

const apiURL =
  "https://eventosapi-abeueqcbg8grcqfe.austriaeast-01.azurewebsites.net";

export const ApiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

ApiClient.interceptors.request.use((config) => {
  let currentAccessToken: string | null = localStorage.getItem("accessToken");

  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});
