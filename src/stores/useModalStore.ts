import { ReactNode } from "react";

import { create } from "zustand";

import { ModalSizes } from "@/components/ui/Modal";

type ModalStore = {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  modalSize: ModalSizes;
  openModal: (content: ReactNode, size?: ModalSizes) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  modalContent: null,
  modalSize: "large",
  openModal: (content, size = "large") =>
    set({ isModalOpen: true, modalContent: content, modalSize: size }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));
