import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { AlumniItem } from '../../data/initialData';

interface TabAlumniProps {
  isAdmin: boolean;
  alumniList: AlumniItem[];
  onAddAlumni: (data: Omit<AlumniItem, 'id' | 'tanggalDaftar'>) => void;
  onDeleteAlumni: (id: number) => void;
}

export const TabAlumni: React.FC<TabAlumniProps> = ({
  isAdmin,
  alumniList,
  onAddAlumni,
  onDeleteAlumni
}) => {
  const [nama, setNama] = useState('');
  const [tahunLulus, setTahunLulus] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [kontak, setKontak] = useState('');
  const [kesan, setKesan] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !tahunLulus.trim() || !pekerjaan.trim()) return;

    onAddAlumni({
      nama: nama.trim(),
      tahunLulus: parseInt(tahunLulus) || 2020,
      pekerjaan: pekerjaan.trim(),
      kontak: kontak.trim() || '-',
      kesan: kesan.trim() || 'Terima kasih SDN 305 Maluku Tengah!'
    });

    setNama('');
    setTahunLulus('');
    setPekerjaan('');
    setKontak('');
    setKesan('');
  };

  const filteredAlumni = alumniList.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.pekerjaan.toLowerCase().includes(search.toLowerCase()) ||
      item.tahunLulus.toString().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700" />
          <span>Portal & Pendataan Alumni SDN 305</span>
        </div>
        <span className="text-xs bg-blue-600 text-white font-bold px-2.5 py-1 rounded-full shadow-2xs">
          {alumniList.length} Alumni Terdata
        </span>
      </div>

      {/* Form Pendataan Alumni */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="border-b border-slate-200 pb-2 mb-3">
          <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <span>Formulir Pendataan Alumni</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Bagi para lulusan SDN 305 Maluku Tengah, silakan melengkapi data berikut untuk mempererat tali silaturahmi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Lengkap Alumni *
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Muhammad Rusli Latuconsina"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tahun Kelulusan *
              </label>
              <input
                type="number"
                required
                min={1970}
                max={2026}
                value={tahunLulus}
                onChange={(e) => setTahunLulus(e.target.value)}
                placeholder="Contoh: 2018"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pendidikan Terakhir / Pekerjaan Sekarang *
              </label>
              <input
                type="text"
                required
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                placeholder="Contoh: Mahasiswa Kedokteran / BUMN / Guru"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nomor Kontak / WhatsApp (Opsional)
              </label>
              <input
                type="text"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Kesan, Pesan & Doa untuk Almamater SDN 305
            </label>
            <textarea
              rows={2}
              value={kesan}
              onChange={(e) => setKesan(e.target.value)}
              placeholder="Tuliskan pengalaman berkesan selama bersekolah di SDN 305 Masohi..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg shadow-sm transition text-xs flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Simpan & Daftarkan Data Alumni
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Alumni Terdaftar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
          <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span>Direktori Alumni Terdaftar</span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama atau tahun lulus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {filteredAlumni.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs italic bg-slate-50 rounded-lg border border-dashed">
            Belum ada alumni yang sesuai dengan kata kunci pencarian.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAlumni.map((item) => (
              <div
                key={item.id}
                className="bg-blue-50/50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between hover:bg-blue-50/90 transition shadow-2xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <h4 className="font-bold text-xs sm:text-sm text-blue-950">
                      {item.nama}
                    </h4>
                    <span className="bg-yellow-300 text-blue-950 font-black px-2 py-0.5 rounded text-[10px] shadow-2xs shrink-0">
                      Lulus '{item.tahunLulus}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600 mb-2">
                    <p className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Briefcase className="w-3 h-3 text-blue-600" />
                      <span>{item.pekerjaan}</span>
                    </p>
                    {item.kontak && item.kontak !== '-' && (
                      <p className="text-[10px] text-slate-500">
                        Kontak: {item.kontak}
                      </p>
                    )}
                  </div>

                  {item.kesan && (
                    <p className="text-[11px] text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                      "{item.kesan}"
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {item.tanggalDaftar}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={() => onDeleteAlumni(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition"
                      title="Hapus Data Alumni"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
