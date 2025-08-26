import React, { createContext, ReactNode, useContext, useEffect } from "react";

import { Modal, ModalSizes } from "@/components/ui/Modal";
import useModal from "@/hooks/useModal";

interface ModalContextType {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode, size?: ModalSizes) => void;
  closeModal: () => void;
}

// Cria o Contexto com um valor inicial para evitar `null`
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook para consumir o contexto
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

// Provedor que encapsula a lógica e o componente Modal
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const modal = useModal();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modal.closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modal.closeModal, modal.size]);

  return (
    <ModalContext.Provider value={modal}>
      {children}
      <Modal size={modal.size} isOpen={modal.isOpen} onClose={modal.closeModal}>
        {modal.modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
