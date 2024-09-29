import { createContext, useState } from "react";

export interface ComponentContextType {
  pageState: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
}
export const ComponentContext = createContext<ComponentContextType | null>(null);

export function ComponentContextProvider({ children }: { children: React.ReactNode }) {
  const [pageState, setPageState] = useState<string>("view");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return <ComponentContext.Provider value={{ pageState, setPageState, isDialogOpen, setIsDialogOpen }}>{children}</ComponentContext.Provider>;
}
