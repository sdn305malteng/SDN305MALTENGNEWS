import React, { useState } from 'react';
import {
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  Maximize2,
  Upload,
  Link as LinkIcon,
  Tag,
  Calendar,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { GaleriItem } from '../../data/initialData';

interface TabGaleriProps {
  isAdmin: boolean;
  galeriList: GaleriItem[];
  onAddFoto: (data: Omit<GaleriItem, 'id' | 'tanggal'>) => void;
  onDeleteFoto: (id: number) => void;
  onOpenLightbox: (item: GaleriItem, index: number) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TabGaleri: React.FC<TabGaleriProps> = ({
  isAdmin,
  galeriList,
  onAddFoto,
  onDeleteFoto,
  onOpenLightbox,
  onShowToast
}) => {
  const [sourceType, setSourceType] = useState<'file' | 'url'>('url');
  const [title, setTitle] = useState('');
  const [kategori, setKategori] = useState('Kegiatan Siswa');
  const [url, setUrl] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [filterCat, setFilterCat] = useState('Semua');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      onShowToast('Ukuran berkas maksimal 4MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('Judul / keterangan foto wajib diisi.', 'error');
      return;
    }

    const finalSrc = sourceType === 'url' ? url.trim() : fileBase64;
    if (!finalSrc) {
      onShowToast('Pilih berkas foto atau masukkan link URL gambar.', 'error');
      return;
    }

    onAddFoto({
      title: title.trim(),
      kategori: kategori,
      src: finalSrc
    });

    setTitle('');
    setUrl('');
    setFileBase64('');
    onShowToast(`Foto "${title}" berhasil ditambahkan ke galeri!`, 'success');
  };

  const categories = ['Semua', 'Belajar Mengajar', 'Upacara', 'Lingkungan', 'Ekstrakurikuler', 'Kegiatan Siswa'];

  const filteredGaleri = galeriList.filter((item) => {
    return filterCat === 'Semua' || item.kategori === filterCat;
  });

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-700" />
          <span>Galeri Photo & Dokumentasi Kegiatan</span>
        </div>
        <span className="text-xs bg-blue-600 text-white font-bold px-2.5 py-1 rounded-full shadow-2xs">
          {galeriList.length} Foto Tersimpan
        </span>
      </div>

      {/* Form Unggah Foto (Khusus Admin atau Pengelola) */}
      <div className="bg-white border border-blue-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-blue-100 pb-2">
          <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <span>Unggah Foto Galeri Baru</span>
          </h3>
          <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
            Panel Pengelola
          </span>
        </div>

        <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Keterangan / Judul Foto *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Upacara Peringatan Hari Pahlawan di Masohi"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kategori Kegiatan *
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Belajar Mengajar">Belajar Mengajar</option>
                <option value="Upacara">Upacara & Hari Besar</option>
                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                <option value="Lingkungan">Lingkungan & Sarana</option>
                <option value="Kegiatan Siswa">Kegiatan Siswa Umum</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="radio"
                name="sourceType"
                checked={sourceType === 'url'}
                onChange={() => setSourceType('url')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" /> Link URL Gambar Online
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="radio"
                name="sourceType"
                checked={sourceType === 'file'}
                onChange={() => setSourceType('file')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1">
                <Upload className="w-3.5 h-3.5 text-emerald-600" /> Unggah Berkas dari Komputer / HP
              </span>
            </label>
          </div>

          {sourceType === 'url' ? (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Link URL Gambar (HTTPS) *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pilih Berkas Foto (JPG, PNG, WEBP) *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 border border-slate-300 rounded-lg p-1.5 cursor-pointer bg-slate-50"
              />
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg shadow-sm transition text-xs flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Publikasikan Foto ke Galeri
            </button>
          </div>
        </form>
      </div>

      {/* Filter Kategori & Galeri Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
            <FolderOpen className="w-4 h-4 text-blue-600 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1 rounded-full font-semibold transition whitespace-nowrap ${
                  filterCat === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            Menampilkan: <strong className="text-blue-900">{filteredGaleri.length} Foto</strong>
          </span>
        </div>

        {filteredGaleri.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed text-slate-400 text-xs">
            Belum ada foto pada kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGaleri.map((item, index) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div
                    onClick={() => onOpenLightbox(item, index)}
                    className="relative h-48 bg-slate-200 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-blue-950 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-blue-600" /> Perbesar Foto
                      </span>
                    </div>

                    <span className="absolute top-2 left-2 bg-blue-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="p-3">
                    <h4
                      onClick={() => onOpenLightbox(item, index)}
                      className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer"
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {item.tanggal}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={() => onDeleteFoto(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 flex items-center gap-1 font-semibold transition"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
