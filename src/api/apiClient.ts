import axios from "axios";

const apiURL = "https://localhost:44304/";

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
