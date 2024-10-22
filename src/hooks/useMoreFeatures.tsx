import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContextProvider";

export const useMoreFeatures = (itemUID: string, editHandler: () => void, deleteHandler: () => void) => {
  const authContext = useContext(AuthContext);
  const [isMoreClick, setIsMoreClick] = useState<string>("");

  const show = authContext?.loginState === itemUID;

  const toggleMoreClick = (id: string) => {
    setIsMoreClick((prev) => (prev === id ? "" : id));
  };

  return {
    show,
    isMoreClick,
    toggleMoreClick,
    handleEdit: editHandler,
    handleDelete: deleteHandler,
  };
};
