import { createContext } from 'react';

export interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
  showLoading: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
