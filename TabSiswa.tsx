import React from 'react';
import {
  Users2,
  PieChart,
  Activity,
  Tent,
  Volleyball,
  Music,
  Stethoscope,
  Trophy,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { SiswaRekap } from '../../data/initialData';

interface TabSiswaProps {
  rekapData: SiswaRekap[];
}

export const TabSiswa: React.FC<TabSiswaProps> = ({ rekapData }) => {
  const totalLaki = rekapData.reduce((acc, curr) => acc + curr.laki, 0);
  const totalPerempuan = rekapData.reduce((acc, curr) => acc + curr.perempuan, 0);
  const totalSemua = totalLaki + totalPerempuan;

  const ekskulList = [
    {
      icon: <Tent className="w-6 h-6 text-emerald-600" />,
      nama: 'Gerakan Pramuka Gugus Depan',
      jadwal: 'Setiap Sabtu, 08.00 - 10.00 WIT',
      pembina: 'Bpk. Ahmad Latuconsina, S.Pd',
      desc: 'Melatih kepemimpinan, kemandirian, kedisiplinan, tali-temali, dan kecintaan pada alam.'
    },
    {
      icon: <Volleyball className="w-6 h-6 text-amber-600" />,
      nama: 'Klub Olahraga & Atletik',
      jadwal: 'Setiap Selasa & Kamis Sore',
      pembina: 'Tim Guru PJOK',
      desc: 'Pembinaan bakat siswa dalam cabang bola voli mini, bulutangkis, catur, dan lari cepat O2SN.'
    },
    {
      icon: <Music className="w-6 h-6 text-purple-600" />,
      nama: 'Seni Tari Tradisional Maluku',
      jadwal: 'Setiap Rabu, 13.30 - 15.00 WIT',
      pembina: 'Ibu Nurhayati Leuly, S.Pd',
      desc: 'Pelestarian seni budaya daerah melalui tarian Lenso, Katreji, dan kreasi tari Nusantara.'
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-rose-600" />,
      nama: 'Dokter Kecil & KKR (UKS)',
      jadwal: 'Setiap Jumat Pagi',
      pembina: 'Pembina UKS & Puskesmas',
      desc: 'Pelatihan pertolongan pertama (P3K), gizi seimbang, kebersihan diri, dan kampanye cuci tangan.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <Users2 className="w-5 h-5 text-blue-700" />
        <span>Informasi Kesiswaan & Prestasi</span>
      </div>

      {/* Rekapitulasi Jumlah Siswa */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-500" />
            <span>Rekapitulasi Data Siswa Per Kelas (T.A. 2026/2027)</span>
          </h3>
          <span className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full text-xs">
            Total Terdaftar: {totalSemua} Siswa
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5 border border-blue-500">Tingkat Kelas</th>
                <th className="p-2.5 border border-blue-500">Wali Kelas</th>
                <th className="p-2.5 border border-blue-500 text-center">Laki-Laki</th>
                <th className="p-2.5 border border-blue-500 text-center">Perempuan</th>
                <th className="p-2.5 border border-blue-500 text-center">Jumlah Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {rekapData.map((item, idx) => {
                const totalKelas = item.laki + item.perempuan;
                return (
                  <tr key={idx} className="hover:bg-blue-50/60 transition">
                    <td className="p-2.5 border border-slate-200 font-bold text-blue-950">
                      {item.kelas}
                    </td>
                    <td className="p-2.5 border border-slate-200 font-medium text-slate-600">
                      {item.waliKelas}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-mono">
                      {item.laki}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-mono">
                      {item.perempuan}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-mono font-bold text-blue-800 bg-blue-50/30">
                      {totalKelas}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-yellow-100 font-extrabold text-blue-950">
                <td colSpan={2} className="p-2.5 border border-yellow-300 text-center uppercase tracking-wider">
                  Total Seluruh Peserta Didik
                </td>
                <td className="p-2.5 border border-yellow-300 text-center font-mono text-sm">
                  {totalLaki}
                </td>
                <td className="p-2.5 border border-yellow-300 text-center font-mono text-sm">
                  {totalPerempuan}
                </td>
                <td className="p-2.5 border border-yellow-300 text-center font-mono text-sm text-blue-900 bg-yellow-200">
                  {totalSemua} Siswa
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Kegiatan Ekstrakurikuler */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-extrabold text-blue-950 text-sm sm:text-base border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-500" />
          <span>Kegiatan Pengembangan Diri & Ekstrakurikuler</span>
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {ekskulList.map((ekskul, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    {ekskul.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-blue-950">
                      {ekskul.nama}
                    </h4>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-blue-600" /> {ekskul.jadwal}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-2">
                  {ekskul.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Pembina: <strong className="text-slate-700">{ekskul.pembina}</strong></span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">Aktif</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prestasi Siswa */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-extrabold text-amber-950 text-sm sm:text-base border-b border-amber-200 pb-2 mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span>Prestasi Terkini Siswa SDN 305 Maluku Tengah</span>
        </h3>
        <ul className="space-y-2 text-xs text-amber-900">
          <li className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Juara 1 Lomba Baca Puisi FLS2N Tingkat Kabupaten Maluku Tengah (2026)</strong>
              <span className="text-[11px] text-slate-600">Diraih oleh Nurul Aulia (Kelas 6) bertempat di Gedung PKK Masohi.</span>
            </div>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Juara 2 Olimpiade Sains Nasional (OSN) IPA Tingkat Gugus Masohi (2026)</strong>
              <span className="text-[11px] text-slate-600">Diraih oleh Muhammad Fatih (Kelas 5).</span>
            </div>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Juara Harapan 1 Regu Pramuka Berprestasi Tingkat Kwarran Masohi</strong>
              <span className="text-[11px] text-slate-600">Regu Rajawali SDN 305 pada Perkemahan Hari Pramuka.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
