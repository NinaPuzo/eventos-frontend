import { useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";
import type { User } from "@shared/types/User";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
