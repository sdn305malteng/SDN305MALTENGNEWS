import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastInfo | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border ${
          toast.type === 'success'
            ? 'bg-gray-900/95 border-emerald-500/40 text-white'
            : toast.type === 'error'
            ? 'bg-gray-900/95 border-red-500/40 text-white'
            : 'bg-gray-900/95 border-blue-500/40 text-white'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 pr-1">
          <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition p-0.5 rounded"
          title="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
