import { useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import { ToastContext } from '@/contexts/ToastContextType';

export function ToastProvider({ children }: { children: ReactNode }) {
  const showSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const showError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const showInfo = useCallback((message: string) => {
    toast.info(message);
  }, []);

  const showWarning = useCallback((message: string) => {
    toast.warning(message);
  }, []);

  const showLoading = useCallback((message: string) => {
    toast.loading(message);
  }, []);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning, showLoading }}>
      {children}
    </ToastContext.Provider>
  );
}
