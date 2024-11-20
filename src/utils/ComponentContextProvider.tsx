import { createContext, useState } from "react";

export type ComponentContextType = {
  isHomeLoad: boolean;
  setIsHomeLoad: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ComponentContext = createContext<ComponentContextType | null>(null);

export function ComponentContextProvider({ children }: { children: React.ReactNode }) {
  const [isHomeLoad, setIsHomeLoad] = useState<boolean>(false);
  return <ComponentContext.Provider value={{ isHomeLoad, setIsHomeLoad }}>{children}</ComponentContext.Provider>;
}
