import React, { useState, useEffect } from 'react';
import { GraduationCap, LogIn, UserCheck, Phone, Mail, Globe, Database, Clock } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onLoginClick, onLogoutClick }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time Masohi (WIT - UTC+9)
      const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jayapura', // WIT
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now);
      setTimeStr(`${formatted} WIT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 max-w-6xl mx-auto rounded-t-xl mt-3 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium tracking-wide">
            Selamat Datang di Website Resmi <strong className="text-white">SD NEGERI 305 MALUKU TENGAH</strong>
          </span>
          <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Database className="w-2.5 h-2.5" /> Sistem Siap & Aktif
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {timeStr && (
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span>{timeStr}</span>
            </span>
          )}

          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <UserCheck className="w-3.5 h-3.5" /> Admin Aktif
              </span>
              <button
                onClick={onLogoutClick}
                className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded text-[10px] font-bold transition shadow-sm"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-slate-300 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer hover:underline"
            >
              <LogIn className="w-3.5 h-3.5 text-yellow-400" />
              <span>Login Member / Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Banner Hero */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white relative shadow-xl overflow-hidden">
        {/* Background Overlay Decoration */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="flex flex-col md:flex-row items-center relative z-10">
          {/* Logo & School Name */}
          <div className="p-6 md:w-3/5 flex items-center gap-5">
            <div className="bg-white p-2.5 rounded-full shadow-xl border-4 border-blue-300/80 shrink-0 transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 shadow-inner">
                <GraduationCap className="w-12 h-12" />
              </div>
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-blue-200 uppercase drop-shadow">
                Pemerintah Kabupaten Maluku Tengah
              </p>
              <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-300 tracking-tight drop-shadow-md my-0.5">
                SDN 305 MALUKU TENGAH
              </h1>
              <p className="text-xs md:text-sm text-blue-100 font-medium leading-relaxed opacity-95">
                Jl. Nuri Kel. Namaelo, Masohi - Maluku Tengah 97511
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-yellow-400 text-blue-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow">
                  Akreditasi A
                </span>
                <span className="bg-blue-950/70 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-400/30">
                  NPSN: 60101234
                </span>
              </div>
            </div>
          </div>

          {/* Banner Photo Visual */}
          <div className="md:w-2/5 h-44 md:h-52 relative overflow-hidden hidden md:block border-l border-blue-700/50">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Kegiatan Siswa SDN 305"
              className="object-cover w-full h-full opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-2 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded">
              Suasana Pembelajaran Unggul
            </div>
          </div>
        </div>

        {/* Yellow Info Sub-bar */}
        <div className="bg-yellow-400 text-blue-950 font-bold py-2 px-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-2 border-t border-yellow-300">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-900" />
              <span>Website : www.sdn305malteng.sch.id</span>
            </span>
            <span className="hidden sm:inline text-yellow-600">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-900" />
              <span>Email : info@sdn305malteng.sch.id</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-blue-900 font-semibold">
            <Phone className="w-3 h-3" />
            <span>Telepon: (0914) 21102 / Masohi</span>
          </div>
        </div>
      </div>
    </header>
  );
};
