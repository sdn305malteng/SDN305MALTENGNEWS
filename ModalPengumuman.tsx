import React, { useState, useEffect } from 'react';
import { X, Save, BellRing } from 'lucide-react';
import { PengumumanItem } from '../../data/initialData';

interface ModalPengumumanProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: PengumumanItem | null;
  onSave: (data: {
    id?: number;
    tag: 'INFO' | 'AGENDA' | 'PENTING' | 'PPDB';
    color: 'red' | 'blue' | 'yellow' | 'green';
    title: string;
    date?: string;
    content: string;
  }) => void;
}

export const ModalPengumuman: React.FC<ModalPengumumanProps> = ({
  isOpen,
  onClose,
  editingItem,
  onSave
}) => {
  const [tag, setTag] = useState<'INFO' | 'AGENDA' | 'PENTING' | 'PPDB'>('INFO');
  const [color, setColor] = useState<'red' | 'blue' | 'yellow' | 'green'>('red');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Berlaku Segera');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTag(editingItem.tag);
      setColor(editingItem.color);
      setTitle(editingItem.title);
      setDate(editingItem.date);
      setContent(editingItem.content);
    } else {
      setTag('INFO');
      setColor('red');
      setTitle('');
      setDate('Berlaku Segera');
      setContent('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      id: editingItem ? editingItem.id : undefined,
      tag,
      color,
      title: title.trim(),
      date: date.trim() || 'Berlaku Segera',
      content: content.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border-t-4 border-rose-600 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-rose-600" />
            <span>{editingItem ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tag / Label *</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
              >
                <option value="INFO">INFO</option>
                <option value="AGENDA">AGENDA</option>
                <option value="PENTING">PENTING</option>
                <option value="PPDB">PPDB</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Warna Badge *</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
              >
                <option value="red">Merah (Penting)</option>
                <option value="blue">Biru (Agenda / Info)</option>
                <option value="yellow">Kuning (Perhatian)</option>
                <option value="green">Hijau (PPDB / Umum)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Pengumuman *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Jadwal Libur Awal Semester"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Keterangan Waktu / Tanggal</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Contoh: Sabtu, 28 September 2026"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detail Isi Pengumuman *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Jelaskan isi pengumuman secara rinci..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none leading-relaxed"
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
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" /> {editingItem ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
