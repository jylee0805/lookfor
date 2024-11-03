import dayjs, { Dayjs } from "dayjs";
import { createContext, useState } from "react";
import { Control, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

export type SupportFormContextType = {
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  control: Control<FormInputs>;
  reset: UseFormReset<FormInputs>;

  localPhotoUrl: string[];
  setLocalPhotoUrl: React.Dispatch<React.SetStateAction<string[]>>;

  selectPhotos: File[];
  setSelectPhotos: React.Dispatch<React.SetStateAction<File[]>>;
};

export const SupportFormContext = createContext<SupportFormContextType>({} as SupportFormContextType);

export type FormInputs = {
  day: string | number;
  time: Dayjs;
  status: string;
  concert: string;
  place: string;
  qualify: string;
  more: string;
  image: object;
  item: string;
};
export function SupportFormContextProvider({ children }: { children: React.ReactNode }) {
  const { register, handleSubmit, control, reset } = useForm<FormInputs>({
    defaultValues: {
      item: "SKZOO糰子壓克力鑰匙圈+小零食",
      day: "2024/11/02 (六)",
      time: dayjs("13:00", "HH:mm"),
      status: "0",
      place: "世運捷運站",
      qualify: "四期會員/任一成員泡泡滿100天（以上）",
      more: "大家好！這裡是咪咪貓貓和黑糖饅頭演唱會倒數不到一個月ㄌ好期待好期待😣\n我們兩個這次一起準備了一些應援來和stay們分享～～～\n· 應援物內容：SKZOO糰子壓克力鑰匙圈+小零食幸運餅乾雙面壓克力吊飾圈（兩面的圖案是不一樣的✨）\n· 數量：約15-20份左右（如果有想要交換的朋友可以來私訊我！我們會幫你預留♥♡♥）\n-為了配合ATE的概念（？這次做了食物類的吊飾往後滑有實體照！\nthreads的流量好像會比較好 嗎\n總之來借助串的力量了再請大家分享給你身邊的stay們啦～到時候見！🤤",
    },
  });
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string[]>([]);
  const [selectPhotos, setSelectPhotos] = useState<File[]>([]);
  return <SupportFormContext.Provider value={{ register, handleSubmit, control, reset, localPhotoUrl, setLocalPhotoUrl, selectPhotos, setSelectPhotos }}>{children}</SupportFormContext.Provider>;
}
