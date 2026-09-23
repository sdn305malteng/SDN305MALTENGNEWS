import React from 'react';
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Globe,
  Heart,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { TabId } from './Navbar';

interface FooterProps {
  onNavigateTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="max-w-6xl mx-auto bg-slate-900 text-slate-300 text-xs border-t-4 border-yellow-400 rounded-b-xl overflow-hidden shadow-2xl mt-6">
      {/* Top Footer Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800">
        {/* Col 1: School Identity */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">
                SD NEGERI 305 MALUKU TENGAH
              </h4>
              <p className="text-[11px] text-yellow-400 font-semibold">
                Masohi - Maluku Tengah | NPSN: 60101234
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed max-w-md">
            Mewujudkan generasi penerus bangsa yang bertaqwa, berkarakter mulia, cerdas literasi & numerasi, berwawasan digital, serta cinta tanah air di bumi Pamahanunusa Masohi.
          </p>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Terakreditasi <strong className="text-white">A (Unggul)</strong> oleh BAN-S/M</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1.5">
            Pintasan Menu
          </h5>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li>
              <button
                onClick={() => onNavigateTab('home')}
                className="hover:text-yellow-400 transition"
              >
                Beranda Utama
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('profil')}
                className="hover:text-yellow-400 transition"
              >
                Profil & Visi Misi
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('guru')}
                className="hover:text-yellow-400 transition"
              >
                Dewan Guru & Staf
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('siswa')}
                className="hover:text-yellow-400 transition"
              >
                Data Siswa & Ekskul
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('download')}
                className="hover:text-yellow-400 transition"
              >
                Formulir PPDB & Unduhan
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('bukutamu')}
                className="hover:text-yellow-400 transition"
              >
                Buku Tamu Digital
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact & Media Sosial */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1.5">
            Kontak Alamat
          </h5>
          <div className="space-y-1.5 text-[11px] text-slate-400">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Jl. Nuri Kel. Namaelo, Masohi 97511</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>info@sdn305malteng.sch.id</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>(0914) 21102 / Maluku Tengah</span>
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1.5 font-bold">
              Kanal Sosial Media:
            </span>
            <div className="flex gap-2 text-slate-300">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
                title="Facebook SDN 305"
              >
                <i className="fab fa-facebook-f text-xs"></i>
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition"
                title="YouTube SDN 305"
              >
                <i className="fab fa-youtube text-xs"></i>
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition"
                title="Instagram SDN 305"
              >
                <i className="fab fa-instagram text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-3.5 px-6 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>
          &copy; 2026 <strong className="text-slate-300">SDN 305 Maluku Tengah</strong>. Hak Cipta Dilindungi Undang-Undang.
        </span>
        <span className="text-[10px] text-slate-600">
          Sistem Informasi Sekolah Dasar Masohi - Versi 2.4 Berkelanjutan
        </span>
      </div>
    </footer>
  );
};
