import React, { useState } from 'react';
import { X, Save, Download } from 'lucide-react';

interface ModalDownloadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    nama: string;
    kategori: string;
    ukuran: string;
    tanggal: string;
    tipe: string;
    isiKonten: string;
  }) => void;
}

export const ModalDownload: React.FC<ModalDownloadProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Formulir');
  const [ukuran, setUkuran] = useState('350 KB');
  const [isiKonten, setIsiKonten] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !isiKonten.trim()) return;

    let finalName = nama.trim();
    if (!finalName.endsWith('.pdf') && !finalName.endsWith('.doc')) {
      finalName += '.pdf';
    }

    onSave({
      nama: finalName,
      kategori,
      ukuran: ukuran.trim() || '350 KB',
      tanggal: new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      tipe: 'PDF Document',
      isiKonten: isiKonten.trim()
    });

    setNama('');
    setIsiKonten('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border-t-4 border-blue-600 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            <span>Tambah Dokumen Unduhan Baru</span>
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
            <label className="block font-bold text-slate-700 mb-1">Nama Dokumen *</label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Formulir Pendaftaran Ekstrakurikuler 2026.pdf"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Dokumen *</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Formulir">Formulir</option>
                <option value="Kurikulum">Kurikulum</option>
                <option value="Jadwal">Jadwal</option>
                <option value="Panduan">Panduan & Tata Tertib</option>
                <option value="Edaran">Surat Edaran</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimasi Ukuran</label>
              <input
                type="text"
                value={ukuran}
                onChange={(e) => setUkuran(e.target.value)}
                placeholder="250 KB"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Isi Teks / Konten Berkas Resmi *
            </label>
            <textarea
              rows={6}
              required
              value={isiKonten}
              onChange={(e) => setIsiKonten(e.target.value)}
              placeholder="Ketik isi format dokumen atau teks resmi di sini..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-[11px]"
            ></textarea>
            <p className="text-[10px] text-slate-500 mt-1 italic">
              Konten ini akan otomatis terunduh sebagai berkas dokumen nyata saat pengunjung menekan tombol Unduh.
            </p>
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
              <Save className="w-4 h-4" /> Publikasikan Dokumen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
