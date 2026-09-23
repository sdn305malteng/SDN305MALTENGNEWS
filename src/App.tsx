/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar, TabId } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Toast, ToastInfo } from './components/Toast';

// Tab Views
import { TabHome } from './components/tabs/TabHome';
import { TabProfil } from './components/tabs/TabProfil';
import { TabGuru } from './components/tabs/TabGuru';
import { TabSiswa } from './components/tabs/TabSiswa';
import { TabAlumni } from './components/tabs/TabAlumni';
import { TabGaleri } from './components/tabs/TabGaleri';
import { TabEmail } from './components/tabs/TabEmail';
import { TabDownload } from './components/tabs/TabDownload';
import { TabBukuTamu } from './components/tabs/TabBukuTamu';

// Modals
import { ModalSambutan } from './components/modals/ModalSambutan';
import { ModalBerita } from './components/modals/ModalBerita';
import { ModalPengumuman } from './components/modals/ModalPengumuman';
import { ModalGuru } from './components/modals/ModalGuru';
import { ModalDownload } from './components/modals/ModalDownload';
import { ModalDetail } from './components/modals/ModalDetail';
import { LightboxModal } from './components/modals/LightboxModal';

// Initial Data & Storage Helpers
import {
  initialSambutan,
  initialBerita,
  initialPengumuman,
  initialGuru,
  initialSiswaRekap,
  initialAlumni,
  initialGaleri,
  initialDownloads,
  initialBukuTamu,
  initialPoll,
  SambutanData,
  BeritaItem,
  PengumumanItem,
  GuruItem,
  AlumniItem,
  GaleriItem,
  DownloadItem,
  BukuTamuItem,
  PollData
} from './data/initialData';
import { getFromStorage, saveToStorage, getVisitorStats, VisitorStats } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('sdn305_is_admin') === 'true';
  });

  // Data States with localStorage persistence
  const [sambutan, setSambutan] = useState<SambutanData>(() =>
    getFromStorage<SambutanData>('sdn305_sambutan', initialSambutan)
  );
  const [berita, setBerita] = useState<BeritaItem[]>(() =>
    getFromStorage<BeritaItem[]>('sdn305_berita', initialBerita)
  );
  const [pengumuman, setPengumuman] = useState<PengumumanItem[]>(() =>
    getFromStorage<PengumumanItem[]>('sdn305_pengumuman', initialPengumuman)
  );
  const [guruList, setGuruList] = useState<GuruItem[]>(() =>
    getFromStorage<GuruItem[]>('sdn305_guru', initialGuru)
  );
  const [siswaRekap] = useState(initialSiswaRekap);
  const [alumniList, setAlumniList] = useState<AlumniItem[]>(() =>
    getFromStorage<AlumniItem[]>('sdn305_alumni', initialAlumni)
  );
  const [galeriList, setGaleriList] = useState<GaleriItem[]>(() =>
    getFromStorage<GaleriItem[]>('sdn305_galeri', initialGaleri)
  );
  const [downloads, setDownloads] = useState<DownloadItem[]>(() =>
    getFromStorage<DownloadItem[]>('sdn305_downloads', initialDownloads)
  );
  const [bukuTamuList, setBukuTamuList] = useState<BukuTamuItem[]>(() =>
    getFromStorage<BukuTamuItem[]>('sdn305_bukutamu', initialBukuTamu)
  );
  const [pollData, setPollData] = useState<PollData>(() =>
    getFromStorage<PollData>('sdn305_poll', initialPoll)
  );
  const [visitorStats] = useState<VisitorStats>(() => getVisitorStats());

  // Modal States
  const [isSambutanModalOpen, setIsSambutanModalOpen] = useState(false);
  const [isBeritaModalOpen, setIsBeritaModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<BeritaItem | null>(null);

  const [isPengumumanModalOpen, setIsPengumumanModalOpen] = useState(false);
  const [editingPengumuman, setEditingPengumuman] = useState<PengumumanItem | null>(null);

  const [isGuruModalOpen, setIsGuruModalOpen] = useState(false);
  const [editingGuru, setEditingGuru] = useState<GuruItem | null>(null);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const [detailBerita, setDetailBerita] = useState<BeritaItem | null>(null);
  const [detailPengumuman, setDetailPengumuman] = useState<PengumumanItem | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Toast State
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      id: Date.now().toString(),
      message,
      type
    });
  };

  // Sync state changes to storage
  useEffect(() => {
    saveToStorage('sdn305_sambutan', sambutan);
  }, [sambutan]);

  useEffect(() => {
    saveToStorage('sdn305_berita', berita);
  }, [berita]);

  useEffect(() => {
    saveToStorage('sdn305_pengumuman', pengumuman);
  }, [pengumuman]);

  useEffect(() => {
    saveToStorage('sdn305_guru', guruList);
  }, [guruList]);

  useEffect(() => {
    saveToStorage('sdn305_alumni', alumniList);
  }, [alumniList]);

  useEffect(() => {
    saveToStorage('sdn305_galeri', galeriList);
  }, [galeriList]);

  useEffect(() => {
    saveToStorage('sdn305_downloads', downloads);
  }, [downloads]);

  useEffect(() => {
    saveToStorage('sdn305_bukutamu', bukuTamuList);
  }, [bukuTamuList]);

  useEffect(() => {
    saveToStorage('sdn305_poll', pollData);
  }, [pollData]);

  // Auth Handlers
  const handleLogin = (user: string, pass: string): boolean => {
    if (user === 'admin' && pass === '1234') {
      setIsAdmin(true);
      sessionStorage.setItem('sdn305_is_admin', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sdn305_is_admin');
    showToast('Anda telah keluar dari mode Administrator.', 'info');
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data simulasi sekolah ke setelan awal?')) {
      localStorage.removeItem('sdn305_sambutan');
      localStorage.removeItem('sdn305_berita');
      localStorage.removeItem('sdn305_pengumuman');
      localStorage.removeItem('sdn305_guru');
      localStorage.removeItem('sdn305_alumni');
      localStorage.removeItem('sdn305_galeri');
      localStorage.removeItem('sdn305_downloads');
      localStorage.removeItem('sdn305_bukutamu');
      localStorage.removeItem('sdn305_poll');
      localStorage.removeItem('sdn305_poll_voted');

      setSambutan(initialSambutan);
      setBerita(initialBerita);
      setPengumuman(initialPengumuman);
      setGuruList(initialGuru);
      setAlumniList(initialAlumni);
      setGaleriList(initialGaleri);
      setDownloads(initialDownloads);
      setBukuTamuList(initialBukuTamu);
      setPollData(initialPoll);

      showToast('Seluruh data berhasil diatur ulang ke kondisi awal.', 'success');
    }
  };

  // Polling vote handler
  const handleVotePoll = (optionId: string) => {
    setPollData((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));
  };

  // Sambutan Handler
  const handleSaveSambutan = (updated: SambutanData) => {
    setSambutan(updated);
    showToast('Sambutan Kepala Sekolah berhasil diperbarui!', 'success');
  };

  // Berita Handlers
  const handleSaveBerita = (data: {
    id?: number;
    title: string;
    category: string;
    content: string;
    image?: string;
  }) => {
    const today = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    if (data.id) {
      setBerita((prev) =>
        prev.map((b) =>
          b.id === data.id
            ? { ...b, title: data.title, category: data.category, content: data.content, image: data.image }
            : b
        )
      );
      showToast('Berita berhasil diperbarui!', 'success');
    } else {
      const newItem: BeritaItem = {
        id: Date.now(),
        title: data.title,
        category: data.category,
        date: today,
        author: 'Administrator SDN 305',
        image: data.image,
        content: data.content
      };
      setBerita((prev) => [newItem, ...prev]);
      showToast('Berita baru berhasil diterbitkan!', 'success');
    }
  };

  const handleDeleteBerita = (id: number) => {
    if (window.confirm('Hapus berita ini?')) {
      setBerita((prev) => prev.filter((b) => b.id !== id));
      showToast('Berita telah dihapus.', 'info');
    }
  };

  // Pengumuman Handlers
  const handleSavePengumuman = (data: {
    id?: number;
    tag: 'INFO' | 'AGENDA' | 'PENTING' | 'PPDB';
    color: 'red' | 'blue' | 'yellow' | 'green';
    title: string;
    date?: string;
    content: string;
  }) => {
    if (data.id) {
      setPengumuman((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? { ...p, tag: data.tag, color: data.color, title: data.title, date: data.date || p.date, content: data.content }
            : p
        )
      );
      showToast('Pengumuman berhasil diperbarui!', 'success');
    } else {
      const newItem: PengumumanItem = {
        id: Date.now(),
        tag: data.tag,
        color: data.color,
        title: data.title,
        date: data.date || 'Berlaku Segera',
        content: data.content
      };
      setPengumuman((prev) => [newItem, ...prev]);
      showToast('Pengumuman baru berhasil diterbitkan!', 'success');
    }
  };

  const handleDeletePengumuman = (id: number) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      setPengumuman((prev) => prev.filter((p) => p.id !== id));
      showToast('Pengumuman telah dihapus.', 'info');
    }
  };

  // Guru Handlers
  const handleSaveGuru = (data: {
    id?: number;
    nama: string;
    jabatan: string;
    kategori: 'Guru Kelas' | 'Guru Mapel' | 'Tenaga Kependidikan';
    nip: string;
    pendidikan: string;
    foto?: string;
  }) => {
    if (data.id) {
      setGuruList((prev) =>
        prev.map((g) => (g.id === data.id ? { ...g, ...data, foto: data.foto || g.foto } : g))
      );
      showToast('Data guru berhasil diperbarui!', 'success');
    } else {
      const newItem: GuruItem = {
        id: Date.now(),
        nama: data.nama,
        jabatan: data.jabatan,
        kategori: data.kategori,
        nip: data.nip,
        pendidikan: data.pendidikan,
        foto: data.foto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      };
      setGuruList((prev) => [...prev, newItem]);
      showToast('Guru / Staf baru berhasil ditambahkan!', 'success');
    }
  };

  const handleDeleteGuru = (id: number) => {
    if (window.confirm('Hapus data guru ini?')) {
      setGuruList((prev) => prev.filter((g) => g.id !== id));
      showToast('Data guru telah dihapus.', 'info');
    }
  };

  // Alumni Handlers
  const handleAddAlumni = (data: Omit<AlumniItem, 'id' | 'tanggalDaftar'>) => {
    const today = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    const newItem: AlumniItem = {
      id: Date.now(),
      ...data,
      tanggalDaftar: today
    };

    setAlumniList((prev) => [newItem, ...prev]);
    showToast(`Data alumni an. ${data.nama} berhasil tersimpan!`, 'success');
  };

  const handleDeleteAlumni = (id: number) => {
    if (window.confirm('Hapus data alumni ini?')) {
      setAlumniList((prev) => prev.filter((a) => a.id !== id));
      showToast('Data alumni telah dihapus.', 'info');
    }
  };

  // Galeri Handlers
  const handleAddFoto = (data: Omit<GaleriItem, 'id' | 'tanggal'>) => {
    const today = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    const newItem: GaleriItem = {
      id: Date.now(),
      ...data,
      tanggal: today
    };

    setGaleriList((prev) => [newItem, ...prev]);
  };

  const handleDeleteFoto = (id: number) => {
    if (window.confirm('Hapus foto ini dari galeri?')) {
      setGaleriList((prev) => prev.filter((g) => g.id !== id));
      showToast('Foto berhasil dihapus.', 'info');
    }
  };

  const handleOpenLightbox = (item: GaleriItem, index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Download Handlers
  const handleSaveDownload = (data: Omit<DownloadItem, 'id'>) => {
    const newItem: DownloadItem = {
      id: Date.now(),
      ...data
    };
    setDownloads((prev) => [newItem, ...prev]);
    showToast(`Berkas "${data.nama}" berhasil ditambahkan ke pusat unduhan!`, 'success');
  };

  const handleDeleteDownload = (id: number) => {
    if (window.confirm('Hapus dokumen ini dari pusat unduhan?')) {
      setDownloads((prev) => prev.filter((d) => d.id !== id));
      showToast('Dokumen telah dihapus dari pusat unduhan.', 'info');
    }
  };

  // Buku Tamu Handlers
  const handleAddBukuTamu = (data: Omit<BukuTamuItem, 'id' | 'tanggal' | 'likes'>) => {
    const newItem: BukuTamuItem = {
      id: Date.now(),
      ...data,
      tanggal: 'Baru Saja',
      likes: 0
    };
    setBukuTamuList((prev) => [newItem, ...prev]);
  };

  const handleLikeBukuTamu = (id: number) => {
    setBukuTamuList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
    showToast('Terima kasih atas apresiasi Anda!', 'success');
  };

  const handleDeleteBukuTamu = (id: number) => {
    if (window.confirm('Hapus pesan buku tamu ini?')) {
      setBukuTamuList((prev) => prev.filter((b) => b.id !== id));
      showToast('Pesan buku tamu telah dihapus.', 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-800 antialiased p-2 sm:p-4">
      {/* Container Card */}
      <div className="w-full">
        {/* Header */}
        <Header
          isAdmin={isAdmin}
          onLoginClick={() => {
            const loginEl = document.getElementById('login-area');
            if (loginEl) {
              loginEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onLogoutClick={handleLogout}
        />

        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          galeriCount={galeriList.length}
          downloadCount={downloads.length}
          alumniCount={alumniList.length}
        />

        {/* Main Content Layout with Sidebar */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-blue-50/70 p-3 sm:p-4 gap-4 shadow-xl border-x border-slate-200">
          {/* Left Sidebar */}
          <Sidebar
            isAdmin={isAdmin}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigateTab={setActiveTab}
            pollData={pollData}
            onVotePoll={handleVotePoll}
            visitorStats={visitorStats}
            onResetData={handleResetData}
            onShowToast={showToast}
          />

          {/* Right Main Content Pane */}
          <main className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 border-t-4 border-t-blue-600 min-h-[580px]">
              {activeTab === 'home' && (
                <TabHome
                  isAdmin={isAdmin}
                  sambutan={sambutan}
                  berita={berita}
                  pengumuman={pengumuman}
                  onOpenEditSambutan={() => setIsSambutanModalOpen(true)}
                  onOpenAddBerita={() => {
                    setEditingBerita(null);
                    setIsBeritaModalOpen(true);
                  }}
                  onOpenEditBerita={(item) => {
                    setEditingBerita(item);
                    setIsBeritaModalOpen(true);
                  }}
                  onDeleteBerita={handleDeleteBerita}
                  onOpenAddPengumuman={() => {
                    setEditingPengumuman(null);
                    setIsPengumumanModalOpen(true);
                  }}
                  onOpenEditPengumuman={(item) => {
                    setEditingPengumuman(item);
                    setIsPengumumanModalOpen(true);
                  }}
                  onDeletePengumuman={handleDeletePengumuman}
                  onOpenDetailBerita={(item) => setDetailBerita(item)}
                  onOpenDetailPengumuman={(item) => setDetailPengumuman(item)}
                />
              )}

              {activeTab === 'profil' && <TabProfil />}

              {activeTab === 'guru' && (
                <TabGuru
                  isAdmin={isAdmin}
                  guruList={guruList}
                  onOpenAddGuru={() => {
                    setEditingGuru(null);
                    setIsGuruModalOpen(true);
                  }}
                  onOpenEditGuru={(item) => {
                    setEditingGuru(item);
                    setIsGuruModalOpen(true);
                  }}
                  onDeleteGuru={handleDeleteGuru}
                />
              )}

              {activeTab === 'siswa' && <TabSiswa rekapData={siswaRekap} />}

              {activeTab === 'alumni' && (
                <TabAlumni
                  isAdmin={isAdmin}
                  alumniList={alumniList}
                  onAddAlumni={handleAddAlumni}
                  onDeleteAlumni={handleDeleteAlumni}
                />
              )}

              {activeTab === 'galeri' && (
                <TabGaleri
                  isAdmin={isAdmin}
                  galeriList={galeriList}
                  onAddFoto={handleAddFoto}
                  onDeleteFoto={handleDeleteFoto}
                  onOpenLightbox={handleOpenLightbox}
                  onShowToast={showToast}
                />
              )}

              {activeTab === 'email' && <TabEmail onShowToast={showToast} />}

              {activeTab === 'download' && (
                <TabDownload
                  isAdmin={isAdmin}
                  downloads={downloads}
                  onOpenAddDownload={() => setIsDownloadModalOpen(true)}
                  onDeleteDownload={handleDeleteDownload}
                  onShowToast={showToast}
                />
              )}

              {activeTab === 'bukutamu' && (
                <TabBukuTamu
                  isAdmin={isAdmin}
                  bukuTamuList={bukuTamuList}
                  onAddBukuTamu={handleAddBukuTamu}
                  onLikeBukuTamu={handleLikeBukuTamu}
                  onDeleteBukuTamu={handleDeleteBukuTamu}
                  onShowToast={showToast}
                />
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer onNavigateTab={setActiveTab} />
      </div>

      {/* MODALS */}
      <ModalSambutan
        isOpen={isSambutanModalOpen}
        onClose={() => setIsSambutanModalOpen(false)}
        data={sambutan}
        onSave={handleSaveSambutan}
      />

      <ModalBerita
        isOpen={isBeritaModalOpen}
        onClose={() => {
          setIsBeritaModalOpen(false);
          setEditingBerita(null);
        }}
        editingItem={editingBerita}
        onSave={handleSaveBerita}
      />

      <ModalPengumuman
        isOpen={isPengumumanModalOpen}
        onClose={() => {
          setIsPengumumanModalOpen(false);
          setEditingPengumuman(null);
        }}
        editingItem={editingPengumuman}
        onSave={handleSavePengumuman}
      />

      <ModalGuru
        isOpen={isGuruModalOpen}
        onClose={() => {
          setIsGuruModalOpen(false);
          setEditingGuru(null);
        }}
        editingItem={editingGuru}
        onSave={handleSaveGuru}
      />

      <ModalDownload
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSave={handleSaveDownload}
      />

      <ModalDetail
        isOpen={Boolean(detailBerita || detailPengumuman)}
        onClose={() => {
          setDetailBerita(null);
          setDetailPengumuman(null);
        }}
        berita={detailBerita}
        pengumuman={detailPengumuman}
      />

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={galeriList}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
