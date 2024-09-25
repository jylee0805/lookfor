import { createContext, useEffect, useState } from "react";
import api from "./api";

export interface AuthContextType {
  loginState: string;
  setLoginState: React.Dispatch<React.SetStateAction<string>>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [loginState, setLoginState] = useState<string>("");

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = (await api.getLoginState()) as string; // 确认 response 是 string 类型
        setLoginState(response);
        console.log("Login state:", response); // 检查是否获取到数据
      } catch (error) {
        console.error("Failed to fetch login state:", error); // 捕获错误
      }
    };
    getAuth(); // 在首次渲染时调用
  }, []); // 依赖数组为空，表示只在组件挂载时执行

  return <AuthContext.Provider value={{ loginState, setLoginState }}>{children}</AuthContext.Provider>;
}
