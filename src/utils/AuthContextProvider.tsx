import { createContext, useEffect, useState } from "react";
import api from "./api";

export interface AuthContextType {
  loginState: string;
  setLoginState: React.Dispatch<React.SetStateAction<string>>;
  user: Profile;
  setUser: React.Dispatch<React.SetStateAction<Profile>>;
}

export interface Profile {
  avatar: string;
  userName: string;
  UID: string;
  id: string;
  keepIds?: string[];
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginState, setLoginState] = useState<string>("");
  const [user, setUser] = useState<Profile>({} as Profile);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = (await api.getLoginState()) as string;
        console.log(response);
        if (response !== undefined) {
          const currentUser = await api.getUser(response);
          setUser(currentUser);
        }

        setLoginState(response);
        console.log("Login state:", response);
      } catch (error) {
        console.error("Failed to fetch login state:", error);
      }
    };
    getAuth();
  }, []);

  return <AuthContext.Provider value={{ loginState, setLoginState, user, setUser }}>{children}</AuthContext.Provider>;
}
