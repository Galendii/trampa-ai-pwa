import { ReactNode, useCallback, useState } from "react";

import { ModalSizes } from "@/components/ui/Modal";

// Define a interface para o estado do modal
interface ModalState {
  isOpen: boolean;
  modalContent: ReactNode | null;
  size?: "small" | "medium" | "large";
}

// Define a interface para o retorno do hook
interface UseModal {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode, size?: ModalSizes) => void;
  closeModal: () => void;
  size?: ModalSizes;
}

const useModal = (): UseModal => {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    modalContent: null,
    size: "large",
  });

  const openModal = useCallback((content: ReactNode, size?: ModalSizes) => {
    setState({
      isOpen: true,
      modalContent: content,
      size,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState({
      isOpen: false,
      modalContent: null,
      size: "large",
    });
  }, []);

  return {
    isOpen: state.isOpen,
    modalContent: state.modalContent,
    openModal,
    closeModal,
    size: state.size,
  };
};

export default useModal;
