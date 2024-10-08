import { createContext, useState } from "react";

export interface ComponentContextType {
  pageState: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  isViewLoad: boolean;
  setIsViewLoad: React.Dispatch<React.SetStateAction<boolean>>;
  isHomeLoad: boolean;
  setIsHomeLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ComponentContext = createContext<ComponentContextType | null>(null);

export function ComponentContextProvider({ children }: { children: React.ReactNode }) {
  const [pageState, setPageState] = useState<string>("view");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isViewLoad, setIsViewLoad] = useState<boolean>(false);
  const [isHomeLoad, setIsHomeLoad] = useState<boolean>(false);
  return <ComponentContext.Provider value={{ pageState, setPageState, isDialogOpen, setIsDialogOpen, isViewLoad, setIsViewLoad, isHomeLoad, setIsHomeLoad }}>{children}</ComponentContext.Provider>;
}
