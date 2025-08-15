import { useState, useCallback, ReactNode } from "react";

// Define a interface para o estado do modal
interface ModalState {
  isOpen: boolean;
  modalContent: ReactNode | null;
}

// Define a interface para o retorno do hook
interface UseModal {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const useModal = (): UseModal => {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    modalContent: null,
  });

  const openModal = useCallback((content: ReactNode) => {
    setState({
      isOpen: true,
      modalContent: content,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState({
      isOpen: false,
      modalContent: null,
    });
  }, []);

  return {
    isOpen: state.isOpen,
    modalContent: state.modalContent,
    openModal,
    closeModal,
  };
};

export default useModal;
