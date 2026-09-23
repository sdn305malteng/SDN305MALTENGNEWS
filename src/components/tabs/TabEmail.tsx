import React, { useState } from 'react';
import {
  Mail,
  Send,
  MapPin,
  Phone,
  Globe,
  Clock,
  MessageSquare,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface TabEmailProps {
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TabEmail: React.FC<TabEmailProps> = ({ onShowToast }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim() || !pesan.trim()) {
      onShowToast('Harap lengkapi nama, email, dan pesan Anda.', 'error');
      return;
    }

    setSentSuccess(true);
    onShowToast(`Pesan dari ${nama} berhasil dikirim ke sekretariat SDN 305!`, 'success');

    // Reset after delay
    setTimeout(() => {
      setNama('');
      setEmail('');
      setTelepon('');
      setSubjek('');
      setPesan('');
      setSentSuccess(false);
    }, 4000);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo SDN 305 Maluku Tengah, saya ${nama || 'Wali Murid'} ingin menanyakan informasi sekolah: ${subjek || ''}`
    );
    window.open(`https://wa.me/6281248000000?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-950 p-3.5 rounded-lg border border-blue-200 flex items-center gap-2 shadow-2xs font-extrabold text-base sm:text-lg">
        <Mail className="w-5 h-5 text-blue-700" />
        <span>Hubungi Kami / Layanan Surat & Email</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Kolom Kiri: Form Kirim Pesan */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3.5">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-extrabold text-blue-950 text-sm sm:text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" />
              <span>Kirim Pesan Ke Sekretariat Sekolah</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Silakan kirimkan saran, pertanyaan, atau permohonan informasi kepada pihak sekolah.
            </p>
          </div>

          {sentSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
              <p className="text-slate-600">
                Terima kasih telah menghubungi SDN 305 Maluku Tengah. Tim administrasi kami akan segera menindaklanjuti pesan Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap Pengirim *
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda atau Orang Tua Siswa"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    No. Handphone / WA
                  </label>
                  <input
                    type="tel"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Perihal / Subjek Pesan *
                </label>
                <input
                  type="text"
                  required
                  value={subjek}
                  onChange={(e) => setSubjek(e.target.value)}
                  placeholder="Contoh: Pertanyaan PPDB Siswa Pindahan"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Uraian Isi Pesan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tuliskan pesan Anda secara lengkap dan jelas..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                </button>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-lg shadow-sm transition text-xs flex items-center justify-center gap-1.5"
                  title="Hubungi langsung via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" /> Chat WA
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Kolom Kanan: Informasi Alamat & Layanan */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm space-y-3.5 text-xs text-slate-700">
            <h4 className="font-extrabold text-blue-950 text-sm border-b border-blue-200 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Alamat & Kontak Resmi</span>
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">SDN 305 Maluku Tengah</strong>
                  <span>Jl. Nuri, Kelurahan Namaelo, Kecamatan Masohi</span>
                  <span className="block text-slate-500">Kabupaten Maluku Tengah, Maluku - Kode Pos 97511</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Email Resmi:</strong>
                  <span className="text-blue-700 font-medium">info@sdn305malteng.sch.id</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Portal Website:</strong>
                  <span>http://www.sdn305malteng.sch.id</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Layanan Sekretariat:</strong>
                  <span>(0914) 21102 / 0812-4800-0000</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200 space-y-1">
              <div className="flex items-center gap-2 text-blue-950 font-bold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Jam Pelayanan Tata Usaha & Tamu:</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-600 pl-1 space-y-0.5">
                <li>Senin - Kamis : 07.15 - 13.00 WIT</li>
                <li>Jumat : 07.15 - 11.00 WIT</li>
                <li>Sabtu : 07.15 - 12.00 WIT</li>
                <li>Minggu & Libur Nasional : Tutup</li>
              </ul>
            </div>
          </div>

          {/* Lokasi Peta Mockup Masohi */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-xs">
            <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" /> Denah Wilayah Masohi
            </h5>
            <div className="w-full h-36 bg-blue-100 rounded-lg flex flex-col items-center justify-center text-center p-3 border border-blue-200 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:12px_12px]"></div>
              <div className="relative z-10 space-y-1">
                <span className="font-extrabold text-blue-950 text-sm block">
                  Jl. Nuri Kel. Namaelo, Masohi
                </span>
                <span className="text-[11px] text-slate-600 block">
                  Dekat Pusat Kota Masohi - Akses Jalan Strategis
                </span>
                <span className="inline-block mt-1 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-2xs">
                  Titik Koordinat: -3.3102, 128.9564
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
