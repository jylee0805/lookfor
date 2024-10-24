import { createContext, useEffect, useState } from "react";
import { Personal } from "../types";

import api from "./api";

export type AuthContextType = {
  loginState: string;
  setLoginState: React.Dispatch<React.SetStateAction<string>>;
  user: Personal;
  setUser: React.Dispatch<React.SetStateAction<Personal>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginState, setLoginState] = useState<string>("");
  const [user, setUser] = useState<Personal>({} as Personal);

  useEffect(() => {
    const getAuth = async () => {
      const response = (await api.getLoginState()) as string;
      if (response !== undefined) {
        const currentUser = await api.getUser(response);

        setUser(currentUser);
      }

      setLoginState(response);
    };
    getAuth();
  }, [loginState]);

  return <AuthContext.Provider value={{ loginState, setLoginState, user, setUser }}>{children}</AuthContext.Provider>;
}
