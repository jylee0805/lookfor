import { Dayjs } from "dayjs";
import { createContext, useState } from "react";
import { Control, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

export interface SupportFormContextType {
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  control: Control<FormInputs>;
  reset: UseFormReset<FormInputs>;

  localPhotoUrl: string[];
  setLocalPhotoUrl: React.Dispatch<React.SetStateAction<string[]>>;

  selectPhotos: File[];
  setSelectPhotos: React.Dispatch<React.SetStateAction<File[]>>;
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
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string[]>([]);
  const [selectPhotos, setSelectPhotos] = useState<File[]>([]);
  return <SupportFormContext.Provider value={{ register, handleSubmit, control, reset, localPhotoUrl, setLocalPhotoUrl, selectPhotos, setSelectPhotos }}>{children}</SupportFormContext.Provider>;
}
