import type { User } from "@shared/types/User";
import { ApiClient } from "./apiClient";

export async function getUser(): Promise<User> {
  const response = await ApiClient.get<User>("/api/auth/me");

  return response.data;
}
