import type { User } from "@shared/types/User";
import { users } from "../data/users";

export function login(
  email: string,
  password: string,
): Promise<User | undefined> {
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  return Promise.resolve(user);
}
