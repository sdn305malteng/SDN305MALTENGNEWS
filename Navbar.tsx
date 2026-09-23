import React, { useState } from 'react';
import {
  Home,
  Building2,
  GraduationCap,
  Users2,
  Users,
  Image as ImageIcon,
  Mail,
  Download,
  BookOpen,
  Menu,
  X
} from 'lucide-react';

export type TabId =
  | 'home'
  | 'profil'
  | 'guru'
  | 'siswa'
  | 'alumni'
  | 'galeri'
  | 'email'
  | 'download'
  | 'bukutamu';

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  galeriCount?: number;
  downloadCount?: number;
  alumniCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  galeriCount = 0,
  downloadCount = 0,
  alumniCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 mr-1.5" /> },
    { id: 'profil', label: 'Profil', icon: <Building2 className="w-4 h-4 mr-1.5" /> },
    { id: 'guru', label: 'Guru & Staf', icon: <GraduationCap className="w-4 h-4 mr-1.5" /> },
    { id: 'siswa', label: 'Siswa', icon: <Users2 className="w-4 h-4 mr-1.5" /> },
    {
      id: 'alumni',
      label: 'Alumni',
      icon: <Users className="w-4 h-4 mr-1.5" />,
      badge: alumniCount > 0 ? alumniCount : undefined
    },
    {
      id: 'galeri',
      label: 'Galeri Photo',
      icon: <ImageIcon className="w-4 h-4 mr-1.5" />,
      badge: galeriCount > 0 ? galeriCount : undefined
    },
    { id: 'email', label: 'Email / Kontak', icon: <Mail className="w-4 h-4 mr-1.5" /> },
    {
      id: 'download',
      label: 'Download',
      icon: <Download className="w-4 h-4 mr-1.5" />,
      badge: downloadCount > 0 ? downloadCount : undefined
    },
    { id: 'bukutamu', label: 'Buku Tamu', icon: <BookOpen className="w-4 h-4 mr-1.5" /> }
  ];

  const handleSelect = (id: TabId) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <nav className="max-w-6xl mx-auto bg-blue-600 text-white shadow-md select-none border-b border-blue-700">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center p-3 bg-blue-700">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-wider uppercase text-yellow-300">
            MENU UTAMA
          </span>
          <span className="text-[11px] bg-blue-800 px-2 py-0.5 rounded text-blue-100 capitalize">
            Tab: {activeTab}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:text-yellow-300 p-1.5 rounded border border-blue-400 bg-blue-600 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu List */}
      <ul
        className={`${
          mobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row md:flex-wrap text-xs md:text-sm font-semibold transition-all`}
      >
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between md:justify-center py-2.5 md:py-3 px-3.5 md:px-3.5 transition-all duration-200 border-b md:border-b-0 md:border-l border-blue-500/80 text-left ${
                  index === 0 ? 'md:border-l-0' : ''
                } ${
                  isActive
                    ? 'bg-yellow-400 text-blue-950 font-bold shadow-inner'
                    : 'text-white hover:bg-blue-700 hover:text-yellow-200'
                }`}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>

                {item.badge !== undefined && (
                  <span
                    className={`ml-2 text-[10px] px-1.5 py-0.2 rounded-full font-bold shadow-xs ${
                      isActive ? 'bg-blue-900 text-yellow-300' : 'bg-yellow-400 text-blue-950'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
