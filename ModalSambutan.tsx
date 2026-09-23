import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Image as ImageIcon } from 'lucide-react';
import { SambutanData } from '../../data/initialData';

interface ModalSambutanProps {
  isOpen: boolean;
  onClose: () => void;
  data: SambutanData;
  onSave: (updated: SambutanData) => void;
}

export const ModalSambutan: React.FC<ModalSambutanProps> = ({
  isOpen,
  onClose,
  data,
  onSave
}) => {
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [headmasterName, setHeadmasterName] = useState(data.headmasterName);
  const [nip, setNip] = useState(data.nip);
  const [img, setImg] = useState(data.img);
  const [text, setText] = useState(data.text);

  useEffect(() => {
    if (isOpen) {
      setTitle(data.title);
      setSubtitle(data.subtitle);
      setHeadmasterName(data.headmasterName);
      setNip(data.nip);
      setImg(data.img);
      setText(data.text);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      headmasterName: headmasterName.trim(),
      nip: nip.trim(),
      img: img.trim(),
      text: text.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border-t-4 border-blue-600 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-base sm:text-lg text-blue-950 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-500" />
            <span>Edit Sambutan Kepala Sekolah</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Sambutan *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subjudul / Instansi *</label>
            <input
              type="text"
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Kepala Sekolah *</label>
              <input
                type="text"
                required
                value={headmasterName}
                onChange={(e) => setHeadmasterName(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Foto Kepala Sekolah</label>
            <input
              type="url"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="https://..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Pesan Sambutan *</label>
            <textarea
              rows={5}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
