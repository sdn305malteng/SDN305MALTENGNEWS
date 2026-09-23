import React, { useState } from 'react';
import {
  Download,
  FileText,
  Eye,
  PlusCircle,
  Trash2,
  Calendar,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { DownloadItem } from '../../data/initialData';
import { downloadFile } from '../../utils/storage';

interface TabDownloadProps {
  isAdmin: boolean;
  downloads: DownloadItem[];
  onOpenAddDownload: () => void;
  onDeleteDownload: (id: number) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TabDownload: React.FC<TabDownloadProps> = ({
  isAdmin,
  downloads,
  onOpenAddDownload,
  onDeleteDownload,
  onShowToast
}) => {
  const [previewItem, setPreviewItem] = useState<DownloadItem | null>(null);

  const handleDownload = (item: DownloadItem) => {
    try {
      downloadFile(item.nama, item.isiKonten);
      onShowToast(`Berkas "${item.nama}" sedang diunduh ke perangkat Anda!`, 'success');
    } catch (e) {
      console.error(e);
      onShowToast('Gagal mengunduh berkas.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Bar & Admin Toolbar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-700" />
          <span>Pusat Unduhan Berkas & Dokumen Resmi</span>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAddDownload}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" /> Tambah Berkas Unduhan
          </button>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-3">
        <HardDrive className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Informasi Unduhan:</span>
          <p className="text-slate-600 mt-0.5">
            Semua formulir, buku panduan, dan kalender akademik di bawah ini adalah dokumen resmi SDN 305 Maluku Tengah. Klik tombol <strong className="text-emerald-700 font-semibold">"Unduh"</strong> untuk menyimpan berkas langsung ke komputer atau ponsel Anda, atau klik <strong className="text-blue-700 font-semibold">"Pratinjau"</strong> untuk membaca isinya langsung di layar.
          </p>
        </div>
      </div>

      {/* Table Downloads */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 border-b border-blue-700">Nama Dokumen</th>
                <th className="p-3 border-b border-blue-700">Kategori</th>
                <th className="p-3 border-b border-blue-700 text-center">Ukuran</th>
                <th className="p-3 border-b border-blue-700 text-center">Tanggal Rilis</th>
                <th className="p-3 border-b border-blue-700 text-center">Aksi / Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="hover:text-blue-600 transition">{item.nama}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-slate-500">
                    {item.ukuran}
                  </td>
                  <td className="p-3 text-center text-slate-500 text-[11px]">
                    {item.tanggal}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 border border-blue-200"
                        title="Lihat Pratinjau Dokumen"
                      >
                        <Eye className="w-3 h-3" /> Pratinjau
                      </button>

                      <button
                        onClick={() => handleDownload(item)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 shadow-2xs"
                        title="Unduh Berkas ke Perangkat"
                      >
                        <Download className="w-3 h-3" /> Unduh
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => onDeleteDownload(item.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1 rounded transition border border-rose-200"
                          title="Hapus Dokumen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Pratinjau Dokumen */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 border-t-4 border-blue-600 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3">
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  {previewItem.kategori}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-blue-950 mt-1">
                  {previewItem.nama}
                </h4>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed">
              {previewItem.isiKonten}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">
                Ukuran Berkas: {previewItem.ukuran}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownload(previewItem);
                    setPreviewItem(null);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
