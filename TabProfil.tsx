import React from 'react';
import {
  Building2,
  IdCard,
  Target,
  History,
  CheckCircle2,
  School,
  Monitor,
  BookMarked,
  HeartPulse,
  Sun,
  ShieldCheck,
  Award
} from 'lucide-react';

export const TabProfil: React.FC = () => {
  const fasilitas = [
    { icon: <School className="w-5 h-5 text-blue-600" />, title: '6 Ruang Kelas Reflektif', desc: 'Dilengkapi fasilitas multimedia, papan tulis ganda, dan sirkulasi udara optimal.' },
    { icon: <Monitor className="w-5 h-5 text-emerald-600" />, title: 'Laboratorium Komputer & Digital', desc: '20 unit PC untuk simulasi ANBK dan pembelajaran TIK siswa sejak dini.' },
    { icon: <BookMarked className="w-5 h-5 text-amber-600" />, title: 'Perpustakaan "Pelita Ilmu"', desc: 'Koleksi 2.500+ buku pelajaran, ensiklopedia anak, dan pojok baca santai.' },
    { icon: <HeartPulse className="w-5 h-5 text-rose-600" />, title: 'Ruang UKS & Dokter Kecil', desc: 'Bekerja sama dengan Puskesmas Namaelo untuk pemeriksaan kesehatan berkala.' },
    { icon: <Sun className="w-5 h-5 text-yellow-600" />, title: 'Lapangan Olahraga & Upacara', desc: 'Lapangan serbaguna untuk voli, futsal mini, senam, dan upacara bendera.' },
    { icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />, title: 'Musholla & Sarana Ibadah', desc: 'Tempat salat dhuha berjamaah dan pendidikan budi pekerti keagamaan.' }
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <Building2 className="w-5 h-5 text-blue-700" />
        <span>Profil Resmi SDN 305 Maluku Tengah</span>
      </div>

      {/* Identitas Sekolah */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-extrabold text-blue-950 text-sm sm:text-base border-b border-slate-200 pb-2 mb-3.5 flex items-center gap-2">
          <IdCard className="w-5 h-5 text-amber-500" />
          <span>Identitas & Legalitas Sekolah</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Nama Resmi Sekolah</span>
            <span className="font-bold text-slate-900">SD Negeri 305 Maluku Tengah</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">NPSN</span>
            <span className="font-mono font-bold text-blue-700">60101234</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Bentuk Pendidikan</span>
            <span className="font-semibold text-slate-800">Sekolah Dasar (SD)</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Status Sekolah</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              NEGERI
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Alamat</span>
            <span className="font-semibold text-slate-800">Jl. Nuri Kel. Namaelo</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Kecamatan / Kota</span>
            <span className="font-semibold text-slate-800">Masohi</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Kabupaten / Provinsi</span>
            <span className="font-semibold text-slate-800">Maluku Tengah / Maluku</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Kode Pos</span>
            <span className="font-mono font-semibold text-slate-800">97511</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Status Akreditasi</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" /> A (Unggul / Sangat Baik)
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Kepala Sekolah</span>
            <span className="font-bold text-blue-950">Drs. H. M. Latuconsina, M.Pd</span>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-200/80 pb-2">
          <Target className="w-5 h-5 text-rose-600" />
          <h3 className="font-extrabold text-blue-950 text-base">
            Visi dan Misi Pendidikan
          </h3>
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 block mb-1">
            VISI SEKOLAH:
          </span>
          <blockquote className="bg-white p-4 rounded-lg border border-blue-200 text-xs sm:text-sm font-semibold text-blue-950 italic shadow-2xs leading-relaxed">
            "Terwujudnya Peserta Didik yang Bertaqwa Kepada Tuhan Yang Maha Esa, Berakhlak Mulia, Cerdas, Berkarakter Kebangsaan, Melek Digital, dan Peduli Kelestarian Lingkungan Hidup."
          </blockquote>
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 block mb-2">
            MISI STRATEGIS SEKOLAH:
          </span>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
            <div className="bg-white/80 p-3 rounded-lg border border-blue-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Menanamkan nilai-nilai keagamaan, toleransi, dan budi pekerti luhur dalam keseharian siswa.</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-blue-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Melaksanakan proses pembelajaran aktif, kreatif, efektif, menyenangkan, dan inovatif (PAKEM).</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-blue-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Meningkatkan literasi membaca, numerasi, dan pengenalan teknologi informasi sejak dini.</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-blue-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Menciptakan budaya sekolah bersih, hijau, sehat, dan ramah anak demi kenyamanan belajar.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sejarah Singkat */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-extrabold text-blue-950 text-sm sm:text-base border-b border-slate-200 pb-2 mb-3 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          <span>Sejarah Singkat Sekolah</span>
        </h3>
        <p className="text-xs leading-relaxed text-slate-600 space-y-2">
          SD Negeri 305 Maluku Tengah didirikan sebagai tanggapan atas meningkatnya kebutuhan pendidikan dasar yang berkualitas bagi masyarakat di pusat kota Masohi, khususnya di wilayah Kelurahan Namaelo. Berlokasi strategis di Jalan Nuri, sekolah ini telah meluluskan ribuan alumni yang kini berkiprah di berbagai bidang profesional, pemerintahan, maupun wirausaha. 
        </p>
        <p className="text-xs leading-relaxed text-slate-600 mt-2">
          Dengan dukungan Dinas Pendidikan Maluku Tengah, Komite Sekolah, dan partisipasi orang tua siswa, SDN 305 terus memodernisasi fasilitas belajar, mulai dari pengadaan ruang laboratorium komputer hingga peningkatan kompetensi dewan guru berbasis Kurikulum Merdeka.
        </p>
      </div>

      {/* Fasilitas & Sarana Prasarana */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="font-extrabold text-blue-950 text-sm sm:text-base border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
          <School className="w-5 h-5 text-amber-500" />
          <span>Sarana & Prasarana Unggulan</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {fasilitas.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-300 transition"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
                  {item.icon}
                </div>
                <h4 className="font-bold text-xs text-blue-950 leading-tight">
                  {item.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
