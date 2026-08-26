import { createContext } from "react";
import type { User } from "@shared/types/User";
import type { Dispatch, SetStateAction } from "react";

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
