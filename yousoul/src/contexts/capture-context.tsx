import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task } from '../api/client';

interface CaptureContextType {
  showCapture: boolean;
  editingTask: Task | null;
  openCapture: (task?: Task) => void;
  closeCapture: () => void;
}

const CaptureContext = createContext<CaptureContextType | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const [showCapture, setShowCapture] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openCapture = useCallback((task?: Task) => {
    setEditingTask(task || null);
    setShowCapture(true);
  }, []);

  const closeCapture = useCallback(() => {
    setShowCapture(false);
    setEditingTask(null);
  }, []);

  return (
    <CaptureContext.Provider value={{ showCapture, editingTask, openCapture, closeCapture }}>
      {children}
    </CaptureContext.Provider>
  );
}

export const useCapture = () => {
  const context = useContext(CaptureContext);
  if (!context) throw new Error('useCapture must be used within CaptureProvider');
  return context;
};
