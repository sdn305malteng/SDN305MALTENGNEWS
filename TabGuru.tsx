import React, { useState } from 'react';
import {
  GraduationCap,
  PlusCircle,
  Edit3,
  Trash2,
  Search,
  BookOpen,
  Mail,
  UserCheck
} from 'lucide-react';
import { GuruItem } from '../../data/initialData';

interface TabGuruProps {
  isAdmin: boolean;
  guruList: GuruItem[];
  onOpenAddGuru: () => void;
  onOpenEditGuru: (item: GuruItem) => void;
  onDeleteGuru: (id: number) => void;
}

export const TabGuru: React.FC<TabGuruProps> = ({
  isAdmin,
  guruList,
  onOpenAddGuru,
  onOpenEditGuru,
  onDeleteGuru
}) => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('Semua');

  const filtered = guruList.filter((g) => {
    const matchSearch =
      g.nama.toLowerCase().includes(search.toLowerCase()) ||
      g.jabatan.toLowerCase().includes(search.toLowerCase()) ||
      g.nip.includes(search);
    const matchCat = filterCat === 'Semua' || g.kategori === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Title Bar & Admin Toolbar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs">
        <div className="flex items-center gap-2 font-extrabold text-base sm:text-lg">
          <GraduationCap className="w-5 h-5 text-blue-700" />
          <span>Tenaga Pendidik & Kependidikan</span>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAddGuru}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" /> Tambah Guru / Staf
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama guru atau mata pelajaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          {['Semua', 'Guru Kelas', 'Guru Mapel', 'Tenaga Kependidikan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition whitespace-nowrap ${
                filterCat === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed text-slate-400 text-xs">
          Tidak ada data guru yang sesuai dengan kriteria pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-24 h-24 rounded-full object-cover border-3 border-blue-400/80 shadow group-hover:scale-105 transition"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 mb-1.5">
                  {item.kategori}
                </span>

                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                  {item.nama}
                </h4>
                <p className="text-xs text-blue-600 font-bold mt-0.5">{item.jabatan}</p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                  <p className="font-mono text-[10px] font-semibold text-slate-600">
                    NIP: {item.nip}
                  </p>
                  <p className="text-[10px] text-slate-500 italic truncate" title={item.pendidikan}>
                    {item.pendidikan}
                  </p>
                </div>
              </div>

              {isAdmin && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-2">
                  <button
                    onClick={() => onOpenEditGuru(item)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded text-xs transition flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => onDeleteGuru(item.id)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold px-2.5 py-1 rounded text-xs transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
