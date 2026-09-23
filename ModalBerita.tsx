import React, { useState, useEffect } from 'react';
import { X, Save, Newspaper } from 'lucide-react';
import { BeritaItem } from '../../data/initialData';

interface ModalBeritaProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: BeritaItem | null;
  onSave: (data: { id?: number; title: string; category: string; content: string; image?: string }) => void;
}

export const ModalBerita: React.FC<ModalBeritaProps> = ({
  isOpen,
  onClose,
  editingItem,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Terbaru');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setCategory(editingItem.category);
      setImage(editingItem.image || '');
      setContent(editingItem.content);
    } else {
      setTitle('');
      setCategory('Terbaru');
      setImage('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');
      setContent('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      id: editingItem ? editingItem.id : undefined,
      title: title.trim(),
      category: category.trim(),
      image: image.trim() || undefined,
      content: content.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border-t-4 border-emerald-600 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-emerald-600" />
            <span>{editingItem ? 'Edit Berita Sekolah' : 'Tambah Berita Baru'}</span>
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
            <label className="block font-bold text-slate-700 mb-1">Judul Berita *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Siswa SDN 305 Juara Lomba Cerdas Cermat"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              >
                <option value="Terbaru">Terbaru</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Kurikulum">Kurikulum</option>
                <option value="Akademik">Akademik</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Foto Sampul (Opsional)</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Berita Lengkap *</label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi berita secara lengkap dan jelas..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" /> {editingItem ? 'Simpan Perubahan' : 'Terbitkan Berita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
