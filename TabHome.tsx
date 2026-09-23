import React, { useState } from 'react';
import {
  Home,
  UserCheck,
  PlusCircle,
  Edit3,
  Trash2,
  Tag,
  Calendar,
  User,
  Search,
  Sparkles,
  ChevronRight,
  BookOpen,
  Award,
  BellRing
} from 'lucide-react';
import { SambutanData, BeritaItem, PengumumanItem } from '../../data/initialData';

interface TabHomeProps {
  isAdmin: boolean;
  sambutan: SambutanData;
  berita: BeritaItem[];
  pengumuman: PengumumanItem[];
  onOpenEditSambutan: () => void;
  onOpenAddBerita: () => void;
  onOpenEditBerita: (item: BeritaItem) => void;
  onDeleteBerita: (id: number) => void;
  onOpenAddPengumuman: () => void;
  onOpenEditPengumuman: (item: PengumumanItem) => void;
  onDeletePengumuman: (id: number) => void;
  onOpenDetailBerita: (item: BeritaItem) => void;
  onOpenDetailPengumuman: (item: PengumumanItem) => void;
}

export const TabHome: React.FC<TabHomeProps> = ({
  isAdmin,
  sambutan,
  berita,
  pengumuman,
  onOpenEditSambutan,
  onOpenAddBerita,
  onOpenEditBerita,
  onDeleteBerita,
  onOpenAddPengumuman,
  onOpenEditPengumuman,
  onDeletePengumuman,
  onOpenDetailBerita,
  onOpenDetailPengumuman
}) => {
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const filteredBerita = berita.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      item.content.toLowerCase().includes(newsSearch.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const categories = ['Semua', ...Array.from(new Set(berita.map((b) => b.category)))];

  return (
    <div className="space-y-6">
      {/* Title Bar & Admin Toolbar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs">
        <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg">
          <Home className="w-5 h-5 text-blue-700" />
          <span>Beranda Informasi Utama</span>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] bg-yellow-400 text-blue-950 px-2.5 py-1 rounded font-extrabold flex items-center gap-1 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5" /> Mode Administrator
            </span>
            <button
              onClick={onOpenEditSambutan}
              className="bg-blue-700 hover:bg-blue-800 text-white text-xs px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-yellow-300" /> Edit Sambutan
            </button>
            <button
              onClick={onOpenAddBerita}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Tambah Berita
            </button>
            <button
              onClick={onOpenAddPengumuman}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Tambah Pengumuman
            </button>
          </div>
        )}
      </div>

      {/* Sambutan Kepala Sekolah */}
      <div className="bg-gradient-to-br from-blue-50/90 to-white p-4 sm:p-5 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <div className="relative shrink-0 text-center">
            <div className="w-32 h-44 rounded-xl overflow-hidden shadow-md border-3 border-white bg-slate-200">
              <img
                src={sambutan.img}
                alt={sambutan.headmasterName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="block font-bold text-xs text-blue-900 leading-tight">
                {sambutan.headmasterName}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                NIP. {sambutan.nip}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-blue-200 pb-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  Pesan Pimpinan Sekolah
                </span>
                <h2 className="font-extrabold text-lg sm:text-xl text-blue-950 mt-1">
                  {sambutan.title}
                </h2>
                <p className="text-xs text-slate-600 font-medium">{sambutan.subtitle}</p>
              </div>

              {isAdmin && (
                <button
                  onClick={onOpenEditSambutan}
                  className="bg-amber-400 hover:bg-amber-500 text-blue-950 px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 shadow-xs shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Ubah Sambutan
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white/70 p-3.5 rounded-lg border border-blue-100 shadow-2xs">
              "{sambutan.text}"
            </p>

            <div className="pt-1 flex items-center justify-between text-xs text-slate-600">
              <span className="text-blue-900 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Maju Bersama SDN 305 Maluku Tengah
              </span>
              <span className="text-[11px] text-slate-500 italic">Masohi, Maluku Tengah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Berita Terkini & Pengumuman Penting */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Kolom Kiri: Berita Terkini */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3 flex-wrap gap-2">
              <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Berita Terkini Sekolah</span>
              </h3>

              {isAdmin && (
                <button
                  onClick={onOpenAddBerita}
                  className="text-xs bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 transition"
                >
                  <PlusCircle className="w-3 h-3" /> Tambah
                </button>
              )}
            </div>

            {/* Filter & Search Bar Berita */}
            <div className="space-y-2 mb-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari judul berita..."
                  value={newsSearch}
                  onChange={(e) => setNewsSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded whitespace-nowrap font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List Berita */}
            {filteredBerita.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs italic bg-slate-50 rounded border border-dashed">
                Tidak ada berita yang sesuai pencarian.
              </div>
            ) : (
              <ul className="space-y-3.5">
                {filteredBerita.map((item) => (
                  <li
                    key={item.id}
                    className="group border-b border-slate-100 pb-3 last:border-b-0 hover:bg-blue-50/40 p-1.5 rounded transition"
                  >
                    <div className="flex gap-3">
                      {item.image && (
                        <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => onOpenDetailBerita(item)}
                            className="font-bold text-xs sm:text-sm text-blue-900 hover:text-blue-700 hover:underline cursor-pointer line-clamp-2 leading-snug"
                          >
                            {item.title}
                          </h4>

                          {isAdmin && (
                            <div className="flex items-center gap-1 shrink-0 ml-1">
                              <button
                                onClick={() => onOpenEditBerita(item)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                                title="Edit Berita"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteBerita(item.id)}
                                className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-100"
                                title="Hapus Berita"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {item.content}
                        </p>

                        <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1.5">
                          <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            <Tag className="w-2.5 h-2.5" /> {item.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" /> {item.date}
                          </span>
                          <button
                            onClick={() => onOpenDetailBerita(item)}
                            className="text-blue-600 hover:underline font-bold ml-auto flex items-center"
                          >
                            Baca <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Pengumuman Penting */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3 flex-wrap gap-2">
              <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
                <BellRing className="w-4 h-4 text-rose-500" />
                <span>Pengumuman & Agenda Penting</span>
              </h3>

              {isAdmin && (
                <button
                  onClick={onOpenAddPengumuman}
                  className="text-xs bg-rose-100 text-rose-800 hover:bg-rose-200 font-bold px-2 py-0.5 rounded border border-rose-300 flex items-center gap-1 transition"
                >
                  <PlusCircle className="w-3 h-3" /> Tambah
                </button>
              )}
            </div>

            {pengumuman.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs italic bg-slate-50 rounded border border-dashed">
                Belum ada pengumuman saat ini.
              </div>
            ) : (
              <ul className="space-y-3">
                {pengumuman.map((item) => {
                  let badgeStyle = 'bg-rose-100 text-rose-800 border-rose-200';
                  if (item.color === 'blue') badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
                  if (item.color === 'yellow')
                    badgeStyle = 'bg-amber-100 text-amber-900 border-amber-200';
                  if (item.color === 'green')
                    badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';

                  return (
                    <li
                      key={item.id}
                      className="border border-slate-200/80 rounded-lg p-3 hover:shadow-xs transition bg-slate-50/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border shrink-0 mt-0.5 ${badgeStyle}`}
                          >
                            {item.tag}
                          </span>
                          <div>
                            <h4
                              onClick={() => onOpenDetailPengumuman(item)}
                              className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 cursor-pointer"
                            >
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-2.5 h-2.5" /> {item.date}
                            </span>
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => onOpenEditPengumuman(item)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                              title="Edit Pengumuman"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeletePengumuman(item.id)}
                              className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-100"
                              title="Hapus Pengumuman"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
