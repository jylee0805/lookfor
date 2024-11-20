import { createContext } from "react";
import { FieldErrors, useForm, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetError, UseFormWatch } from "react-hook-form";

export type FormInputs = {
  section: string;
  row: string;
  seat: string;
  concert: string;
  note: string;
  content: string;
  image: object;
};
export type ViewContextType = {
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  reset: UseFormReset<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  getValues: UseFormGetValues<FormInputs>;
  setError: UseFormSetError<FormInputs>;
  formState: {
    errors: FieldErrors<FormInputs>;
  };
};

export const ViewContext = createContext<ViewContextType>({} as ViewContextType);

export function ViewContextProvider({ children }: { children: React.ReactNode }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      section: "3E",
      row: "1",
      seat: "5",
      concert: "[BABYMONSTER PRESENTS : SEE YOU THERE] IN TAIPEI",
      note: "不用擔心會被欄杆擋到",
      content: "整場的氛圍很棒~~~",
    },
  });
  return <ViewContext.Provider value={{ register, handleSubmit, reset, watch, getValues, formState: { errors }, setError }}>{children}</ViewContext.Provider>;
}
