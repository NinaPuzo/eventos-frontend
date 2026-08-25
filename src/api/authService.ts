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

export function register(
  name: string,
  lastname: string,
  email: string,
  password: string,
): Promise<User | null> {
  const registeredUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (registeredUser) {
    return Promise.resolve(null);
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    lastname,
    email,
    password,
  };

  users.push(newUser);

  return Promise.resolve(newUser);
}
