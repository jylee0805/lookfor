import { Dayjs } from "dayjs";
import { createContext } from "react";
import { Control, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

export interface SupportFormContextType {
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  control: Control<FormInputs>;
  reset: UseFormReset<FormInputs>;
}

export const SupportFormContext = createContext<SupportFormContextType>({} as SupportFormContextType);

export interface FormInputs {
  day: string | number;
  time: Dayjs;
  status: string;
  concert: string;
  place: string;
  qualify: string;
  more: string;
  image: object;
  item: string;
}
export function SupportFormContextProvider({ children }: { children: React.ReactNode }) {
  const { register, handleSubmit, control, reset } = useForm<FormInputs>();
  return <SupportFormContext.Provider value={{ register, handleSubmit, control, reset }}>{children}</SupportFormContext.Provider>;
}
