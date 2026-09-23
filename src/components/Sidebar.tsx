import React, { useState } from 'react';
import {
  Megaphone,
  UserLock,
  BarChart2,
  Users,
  Eye,
  Calendar,
  Globe,
  LogOut,
  Sliders,
  PlusCircle,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Award
} from 'lucide-react';
import { PollData } from '../data/initialData';
import { VisitorStats } from '../utils/storage';
import { TabId } from './Navbar';

interface SidebarProps {
  isAdmin: boolean;
  onLogin: (user: string, pass: string) => boolean;
  onLogout: () => void;
  onNavigateTab: (tab: TabId) => void;
  pollData: PollData;
  onVotePoll: (optionId: string) => void;
  visitorStats: VisitorStats;
  onResetData: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isAdmin,
  onLogin,
  onLogout,
  onNavigateTab,
  pollData,
  onVotePoll,
  visitorStats,
  onResetData,
  onShowToast
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedPoll, setSelectedPoll] = useState<string>(pollData.options[0]?.id || '');
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem('sdn305_poll_voted') === 'true';
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setLoginError('Username dan password harus diisi.');
      return;
    }

    const success = onLogin(username.trim(), password);
    if (success) {
      setLoginError('');
      setUsername('');
      setPassword('');
      onShowToast('Berhasil masuk sebagai Administrator SDN 305!', 'success');
    } else {
      setLoginError('Username atau password salah! (Gunakan demo: admin / 1234)');
      onShowToast('Gagal masuk. Periksa username dan password.', 'error');
    }
  };

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoll) return;
    onVotePoll(selectedPoll);
    setHasVoted(true);
    localStorage.setItem('sdn305_poll_voted', 'true');
    onShowToast('Terima kasih atas partisipasi Anda dalam polling sekolah!', 'success');
  };

  const totalVotes = pollData.options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <aside className="w-full md:w-1/4 space-y-4">
      {/* 1. WIDGET: BANNER PENDIDIKAN */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3.5 py-2 font-bold flex items-center gap-2 text-xs shadow-xs tracking-wide">
          <Megaphone className="w-4 h-4 text-amber-100" />
          <span>Informasi & Tautan Penting</span>
        </div>
        <div className="p-3 space-y-2.5 bg-slate-50/50 text-center text-xs">
          <div className="border border-blue-200 bg-white p-2.5 rounded-lg shadow-2xs hover:shadow-xs transition group">
            <span className="font-extrabold text-blue-900 block text-base group-hover:text-blue-600 transition">
              BOS REGULER
            </span>
            <span className="text-[11px] text-slate-500 font-medium block">
              Bantuan Operasional Sekolah Transparan
            </span>
            <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
              Kementerian Pendidikan
            </span>
          </div>

          <div className="border border-emerald-200 bg-white p-2.5 rounded-lg shadow-2xs hover:shadow-xs transition group">
            <span className="font-extrabold text-emerald-800 block text-base group-hover:text-emerald-600 transition">
              KURIKULUM MERDEKA
            </span>
            <span className="text-[11px] text-slate-500 font-medium block">
              Pembelajaran Terdiferensiasi & Berkarakter
            </span>
            <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              PMM Aktif
            </span>
          </div>

          <div className="border border-red-200 bg-red-50/70 p-2.5 rounded-lg shadow-2xs hover:shadow-xs transition">
            <span className="font-extrabold text-red-700 block text-base">
              RUMAH BELAJAR
            </span>
            <span className="text-[11px] text-red-600 font-medium block">
              Portal Sumber Belajar Digital Siswa
            </span>
            <span className="inline-block mt-1 text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded font-semibold">
              E-Learning Kemdikbud
            </span>
          </div>
        </div>
      </div>

      {/* 2. WIDGET: LOGIN MEMBER / AREA ANGGOTA */}
      <div id="login-area" className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3.5 py-2 font-bold flex items-center gap-2 text-xs shadow-xs tracking-wide">
          <UserLock className="w-4 h-4 text-amber-100" />
          <span>Area Anggota & Admin</span>
        </div>

        {!isAdmin ? (
          <div className="p-3 bg-blue-50/80 text-xs">
            {loginError && (
              <div className="mb-2 p-2 rounded bg-rose-100 border border-rose-300 text-rose-800 font-semibold text-[11px]">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="1234"
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded shadow transition text-xs flex items-center justify-center gap-1.5"
              >
                <UserLock className="w-3.5 h-3.5" /> Masuk Sebagai Admin
              </button>
            </form>

            <div className="mt-2.5 pt-2 border-t border-blue-200/80 text-[11px] text-slate-600 bg-white/70 p-2 rounded border border-blue-100">
              <span className="font-bold text-blue-900 block mb-0.5">Demo Kredensial:</span>
              <p>User: <strong className="text-blue-800">admin</strong> | Pass: <strong className="text-blue-800">1234</strong></p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-blue-50/90 text-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-blue-200">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                AD
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-500 block">Status Login:</span>
                <p className="font-extrabold text-blue-950 text-xs truncate">
                  Administrator Sekolah
                </p>
              </div>
            </div>

            <div className="space-y-1 text-slate-700">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Pintasan Pengelolaan
              </span>

              <button
                onClick={() => onNavigateTab('home')}
                className="w-full text-left p-1.5 rounded bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold flex items-center gap-1.5 transition shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5" /> Kelola Berita & Konten
              </button>

              <button
                onClick={() => onNavigateTab('guru')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-blue-100 text-blue-900 font-semibold flex items-center gap-1.5 transition border border-blue-200"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-600" /> Tambah / Edit Guru
              </button>

              <button
                onClick={() => onNavigateTab('galeri')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-blue-100 text-blue-900 font-semibold flex items-center gap-1.5 transition border border-blue-200"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600" /> Unggah Foto Galeri
              </button>

              <button
                onClick={() => onNavigateTab('download')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-blue-100 text-blue-900 font-semibold flex items-center gap-1.5 transition border border-blue-200"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" /> Dokumen Download
              </button>

              <button
                onClick={onResetData}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-rose-50 text-rose-700 font-medium flex items-center gap-1.5 transition border border-rose-200 text-[11px]"
                title="Mengembalikan data simulasi ke setelan awal"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" /> Reset Data ke Setelan Awal
              </button>
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-3 rounded shadow-xs transition text-xs flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Keluar dari Admin
            </button>
          </div>
        )}
      </div>

      {/* 3. WIDGET: JAJAK PENDAPAT (POLLING) */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3.5 py-2 font-bold flex items-center gap-2 text-xs shadow-xs tracking-wide">
          <BarChart2 className="w-4 h-4 text-amber-100" />
          <span>Jajak Pendapat (Polling)</span>
        </div>
        <div className="p-3 bg-blue-50/70 text-xs text-slate-700">
          <p className="font-semibold text-slate-800 mb-2.5 leading-relaxed">
            {pollData.question}
          </p>

          {!hasVoted ? (
            <form onSubmit={handleVoteSubmit} className="space-y-2">
              {pollData.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-blue-100/60 transition cursor-pointer text-xs"
                >
                  <input
                    type="radio"
                    name="polling"
                    value={option.id}
                    checked={selectedPoll === option.id}
                    onChange={() => setSelectedPoll(option.id)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-800">{option.text}</span>
                </label>
              ))}

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded shadow transition text-xs"
              >
                Kirim Pilihan Polling
              </button>
            </form>
          ) : (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[11px] font-bold text-blue-900 border-b border-blue-200 pb-1">
                <span>Hasil Suara Pengunjung</span>
                <span>Total: {totalVotes} Suara</span>
              </div>

              {pollData.options.map((option) => {
                const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                  <div key={option.id} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">{option.text}</span>
                      <span className="font-bold text-blue-800">
                        {percent}% ({option.votes})
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 border-t border-blue-200/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Anda telah memilih
                </span>
                <button
                  type="button"
                  onClick={() => setHasVoted(false)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Ubah Pilihan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. WIDGET: STATISTIK PENGUNJUNG */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3.5 py-2 font-bold flex items-center gap-2 text-xs shadow-xs tracking-wide">
          <Users className="w-4 h-4 text-amber-100" />
          <span>Statistik Pengunjung</span>
        </div>
        <div className="p-3 bg-blue-50/70 text-xs font-mono text-slate-700 space-y-1.5">
          <div className="flex justify-between items-center py-1 border-b border-blue-200/70">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Users className="w-3.5 h-3.5 text-blue-600" /> User Online
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full text-[11px]">
              {visitorStats.online} Aktif
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-blue-200/70">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Eye className="w-3.5 h-3.5 text-blue-600" /> Hari Ini
            </span>
            <span className="font-semibold text-slate-800">{visitorStats.today}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-blue-200/70">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-blue-600" /> Bulan Ini
            </span>
            <span className="font-semibold text-slate-800">
              {visitorStats.month.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 font-bold">
            <span className="flex items-center gap-1.5 text-blue-900">
              <Globe className="w-3.5 h-3.5 text-amber-500" /> Total Kunjungan
            </span>
            <span className="text-blue-900 text-xs bg-yellow-300 px-2 py-0.5 rounded shadow-2xs">
              {visitorStats.total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
