import React from 'react';
import { X, Calendar, Tag, User, BellRing, BookOpen } from 'lucide-react';
import { BeritaItem, PengumumanItem } from '../../data/initialData';

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  berita: BeritaItem | null;
  pengumuman: PengumumanItem | null;
}

export const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onClose,
  berita,
  pengumuman
}) => {
  if (!isOpen || (!berita && !pengumuman)) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 border-t-4 border-blue-600 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-3 gap-2">
          <div className="space-y-1">
            {berita && (
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded uppercase">
                {berita.category}
              </span>
            )}
            {pengumuman && (
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                  pengumuman.color === 'red'
                    ? 'bg-rose-100 text-rose-800'
                    : pengumuman.color === 'blue'
                    ? 'bg-blue-100 text-blue-800'
                    : pengumuman.color === 'yellow'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {pengumuman.tag}
              </span>
            )}
            <h3 className="font-extrabold text-base sm:text-lg text-blue-950 leading-snug">
              {berita ? berita.title : pengumuman?.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {berita && berita.image && (
          <div className="w-full h-56 rounded-lg overflow-hidden bg-slate-100 mb-4 border border-slate-200">
            <img
              src={berita.image}
              alt={berita.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {berita ? berita.date : pengumuman?.date}
          </span>
          {berita?.author && (
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" /> {berita.author}
            </span>
          )}
          <span className="text-[11px] text-slate-400 ml-auto">SDN 305 Maluku Tengah</span>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap space-y-3">
          {berita ? berita.content : pengumuman?.content}
        </div>

        <div className="mt-6 pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
