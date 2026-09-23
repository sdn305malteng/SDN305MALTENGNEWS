import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { GaleriItem } from '../../data/initialData';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GaleriItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(nextIdx);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black/90 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition"
        title="Tutup (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 z-50 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        title="Foto Sebelumnya (Panah Kiri)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 z-50 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        title="Foto Selanjutnya (Panah Kanan)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
        <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
          <img
            src={currentItem.src}
            alt={currentItem.title}
            className="max-w-full max-h-[70vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
            }}
          />
        </div>

        {/* Caption */}
        <div className="w-full bg-slate-900/90 text-white p-3.5 mt-2 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-yellow-400 font-bold mr-2 text-[11px] uppercase tracking-wide">
              [{currentItem.kategori}]
            </span>
            <span className="font-semibold text-sm">{currentItem.title}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] shrink-0">
            <span>{currentItem.tanggal}</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
