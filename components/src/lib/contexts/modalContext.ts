import { createContext } from 'react';

export interface ModalContextType {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
