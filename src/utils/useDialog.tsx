import { useState } from "react";

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return {
    setIsOpen,
    isOpen,
    openDialog,
    closeDialog,
  };
};
