import React, { useState, useEffect } from 'react';
import { X, Save, GraduationCap } from 'lucide-react';
import { GuruItem } from '../../data/initialData';

interface ModalGuruProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: GuruItem | null;
  onSave: (data: {
    id?: number;
    nama: string;
    jabatan: string;
    kategori: 'Guru Kelas' | 'Guru Mapel' | 'Tenaga Kependidikan';
    nip: string;
    pendidikan: string;
    foto?: string;
  }) => void;
}

export const ModalGuru: React.FC<ModalGuruProps> = ({
  isOpen,
  onClose,
  editingItem,
  onSave
}) => {
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [kategori, setKategori] = useState<'Guru Kelas' | 'Guru Mapel' | 'Tenaga Kependidikan'>('Guru Kelas');
  const [nip, setNip] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (editingItem) {
      setNama(editingItem.nama);
      setJabatan(editingItem.jabatan);
      setKategori(editingItem.kategori);
      setNip(editingItem.nip);
      setPendidikan(editingItem.pendidikan);
      setFoto(editingItem.foto);
    } else {
      setNama('');
      setJabatan('Wali Kelas');
      setKategori('Guru Kelas');
      setNip('19900101 201501 1 001');
      setPendidikan('S1 Pendidikan Guru Sekolah Dasar (PGSD)');
      setFoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !jabatan.trim()) return;

    onSave({
      id: editingItem ? editingItem.id : undefined,
      nama: nama.trim(),
      jabatan: jabatan.trim(),
      kategori,
      nip: nip.trim() || '-',
      pendidikan: pendidikan.trim() || '-',
      foto: foto.trim() || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border-t-4 border-blue-600 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>{editingItem ? 'Edit Data Tenaga Pendidik' : 'Tambah Guru / Staf Baru'}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Rahmadani Talaohu, S.Pd"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Tugas *</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Guru Kelas">Guru Kelas</option>
                <option value="Guru Mapel">Guru Mata Pelajaran</option>
                <option value="Tenaga Kependidikan">Tenaga Kependidikan / TU</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jabatan Spesifik *</label>
              <input
                type="text"
                required
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Contoh: Wali Kelas IV / Guru PJOK"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">NIP Pegawai</label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="19850110 200902 1 004"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Pendidikan Terakhir</label>
              <input
                type="text"
                value={pendidikan}
                onChange={(e) => setPendidikan(e.target.value)}
                placeholder="S1 PGSD Unpatti"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              placeholder="https://images.unsplash..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" /> Simpan Data Guru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
