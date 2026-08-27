import axios from "axios";

const apiURL = "https://localhost:44304/";

export const ApiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let currentAccessToken: string | null = localStorage.getItem("accessToken");

ApiClient.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});
