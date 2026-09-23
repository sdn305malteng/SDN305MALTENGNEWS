import React, { useState } from 'react';
import {
  BookOpen,
  MessageSquare,
  Send,
  Heart,
  Trash2,
  Calendar,
  User,
  ShieldCheck
} from 'lucide-react';
import { BukuTamuItem } from '../../data/initialData';

interface TabBukuTamuProps {
  isAdmin: boolean;
  bukuTamuList: BukuTamuItem[];
  onAddBukuTamu: (data: Omit<BukuTamuItem, 'id' | 'tanggal' | 'likes'>) => void;
  onLikeBukuTamu: (id: number) => void;
  onDeleteBukuTamu: (id: number) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TabBukuTamu: React.FC<TabBukuTamuProps> = ({
  isAdmin,
  bukuTamuList,
  onAddBukuTamu,
  onLikeBukuTamu,
  onDeleteBukuTamu,
  onShowToast
}) => {
  const [nama, setNama] = useState('');
  const [status, setStatus] = useState('Orang Tua Siswa');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) {
      onShowToast('Nama dan pesan buku tamu wajib diisi.', 'error');
      return;
    }

    onAddBukuTamu({
      nama: nama.trim(),
      status: status,
      email: email.trim() || '-',
      pesan: pesan.trim()
    });

    setNama('');
    setEmail('');
    setPesan('');
    onShowToast('Pesan Anda berhasil dicatat di Buku Tamu Digital SDN 305!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700" />
          <span>Buku Tamu Digital Sekolah</span>
        </div>
        <span className="text-xs bg-blue-600 text-white font-bold px-2.5 py-1 rounded-full shadow-2xs">
          {bukuTamuList.length} Pesan Masuk
        </span>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Form Isi Buku Tamu (2 Cols) */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3.5 h-fit">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Tulis Kesan & Kunjungan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tinggalkan pesan, saran, atau ucapan selamat untuk dewan guru dan kemajuan sekolah.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Lengkap Anda *
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Bapak Herman / Ibu Salma"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Peran / Status Kunjungan *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Orang Tua Siswa">Orang Tua / Wali Siswa</option>
                <option value="Alumni SDN 305">Alumni SDN 305</option>
                <option value="Masyarakat / Pemerhati">Tokoh Masyarakat / Warga Masohi</option>
                <option value="Instansi Dinas / Guru">Tamu Dinas / Mitra Pendidikan</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email atau Kontak WhatsApp
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@contoh.com atau 0812xxxx"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pesan / Kesan / Masukan *
              </label>
              <textarea
                rows={4}
                required
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tuliskan ucapan atau saran Anda..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Publikasikan Ke Buku Tamu
            </button>
          </form>
        </div>

        {/* Daftar Pesan Buku Tamu (3 Cols) */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-extrabold text-blue-950 text-sm">
              Daftar Pesan Pengunjung Terkini
            </h4>
            <span className="text-[11px] text-slate-500">
              Moderasi Aktif & Terpelihara
            </span>
          </div>

          {bukuTamuList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed text-slate-400 text-xs">
              Belum ada pesan di buku tamu. Jadilah yang pertama mengisi!
            </div>
          ) : (
            <div className="space-y-3">
              {bukuTamuList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between border-l-4 border-l-blue-600"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="font-extrabold text-xs sm:text-sm text-blue-950 leading-tight">
                            {item.nama}
                          </h5>
                          <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.tanggal}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed pl-1 italic">
                      "{item.pesan}"
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onLikeBukuTamu(item.id)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition font-semibold text-[11px] p-1 rounded hover:bg-rose-50"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{item.likes} Suka</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => onDeleteBukuTamu(item.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 text-[11px] flex items-center gap-1 font-semibold"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
