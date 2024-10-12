import { createContext, useState } from "react";

export interface ComponentContextType {
  isViewLoad: boolean;
  setIsViewLoad: React.Dispatch<React.SetStateAction<boolean>>;
  isHomeLoad: boolean;
  setIsHomeLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ComponentContext = createContext<ComponentContextType | null>(null);

export function ComponentContextProvider({ children }: { children: React.ReactNode }) {
  const [isViewLoad, setIsViewLoad] = useState<boolean>(false);
  const [isHomeLoad, setIsHomeLoad] = useState<boolean>(false);
  return <ComponentContext.Provider value={{ isViewLoad, setIsViewLoad, isHomeLoad, setIsHomeLoad }}>{children}</ComponentContext.Provider>;
}
