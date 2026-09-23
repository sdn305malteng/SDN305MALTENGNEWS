export interface SambutanData {
  title: string;
  subtitle: string;
  headmasterName: string;
  nip: string;
  img: string;
  text: string;
}

export interface BeritaItem {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image?: string;
  content: string;
}

export interface PengumumanItem {
  id: number;
  tag: 'INFO' | 'AGENDA' | 'PENTING' | 'PPDB';
  color: 'red' | 'blue' | 'yellow' | 'green';
  title: string;
  date: string;
  content: string;
}

export interface GuruItem {
  id: number;
  nama: string;
  jabatan: string;
  kategori: 'Guru Kelas' | 'Guru Mapel' | 'Tenaga Kependidikan';
  nip: string;
  pendidikan: string;
  foto: string;
}

export interface SiswaRekap {
  kelas: string;
  waliKelas: string;
  laki: number;
  perempuan: number;
}

export interface AlumniItem {
  id: number;
  nama: string;
  tahunLulus: number;
  pekerjaan: string;
  kontak: string;
  kesan: string;
  tanggalDaftar: string;
}

export interface GaleriItem {
  id: number;
  title: string;
  kategori: string;
  src: string;
  tanggal: string;
}

export interface DownloadItem {
  id: number;
  nama: string;
  kategori: string;
  ukuran: string;
  tanggal: string;
  tipe: string;
  isiKonten: string;
}

export interface BukuTamuItem {
  id: number;
  nama: string;
  status: string; // misal: Orang Tua Murid, Alumni, Pengunjung Umum
  email: string;
  pesan: string;
  tanggal: string;
  likes: number;
}

export interface PollData {
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
}

export const initialSambutan: SambutanData = {
  title: "Sambutan Kepala Sekolah",
  subtitle: "SD Negeri 305 Maluku Tengah - Masohi",
  headmasterName: "Drs. H. M. Latuconsina, M.Pd",
  nip: "19680815 199303 1 008",
  img: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  text: "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua. Selamat datang di situs resmi SD Negeri 305 Maluku Tengah. Sebagai salah satu lembaga pendidikan dasar unggulan di Masohi, kami senantiasa berkomitmen menghadirkan iklim pembelajaran yang islami, berakhlak mulia, berprestasi, dan tanggap terhadap perkembangan teknologi era digital. Website ini kami dedikasikan sebagai jembatan informasi dan komunikasi antara sekolah, bapak/ibu orang tua siswa, alumni, serta masyarakat luas. Mari bersama kita bina putra-putri generasi penerus Maluku Tengah menjadi insan cerdas, berbudi pekerti luhur, dan cinta tanah air. Tabea!"
};

export const initialBerita: BeritaItem[] = [
  {
    id: 1,
    title: "Pelaksanaan ANBK (Asesmen Nasional Berbasis Komputer) Berjalan Lancar",
    category: "Terbaru",
    date: "18 September 2026",
    author: "Tim Humas SDN 305",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    content: "Sebanyak 30 siswa kelas 5 SDN 305 Maluku Tengah mengikuti Asesmen Nasional Berbasis Komputer (ANBK) di ruang laboratorium digital sekolah. Kegiatan terbagi dalam dua sesi dan berlangsung secara tertib dengan pengawasan silang guru tingkat gugus Masohi."
  },
  {
    id: 2,
    title: "Siswa SDN 305 Raih Juara 1 Lomba Cipta & Baca Puisi Tingkat Kabupaten",
    category: "Prestasi",
    date: "12 September 2026",
    author: "Kesiswaan",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    content: "Ananda Nurul Aulia (Kelas 6) berhasil menyabet Juara Pertama pada Festival Lomba Seni Siswa Nasional (FLS2N) cabang Baca Puisi tingkat Maluku Tengah yang diselenggarakan di Masohi. Prestasi ini membuktikan bakat seni literasi siswa yang terus dibina melalui bimbingan intensif."
  },
  {
    id: 3,
    title: "Gerakan Sekolah Sehat: Senam Bersama dan Sarapan Bergizi Setiap Jumat",
    category: "Kegiatan",
    date: "05 September 2026",
    author: "Pembina UKS",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    content: "Mewujudkan pola hidup sehat sejak dini, seluruh dewan guru dan siswa melaksanakan senam kebugaran jasmani di lapangan sekolah dilanjutkan dengan kegiatan 'Sarapan Sehat Bergizi' bersama di teras ruang kelas masing-masing."
  }
];

export const initialPengumuman: PengumumanItem[] = [
  {
    id: 1,
    tag: "PPDB",
    color: "green",
    title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran Baru",
    date: "Berlaku hingga 10 Juli",
    content: "Pendaftaran siswa baru kelas 1 dapat dilakukan langsung di sekretariat panitia PPDB Jl. Nuri Masohi dengan membawa Akta Kelahiran, Kartu Keluarga, dan pas foto 3x4."
  },
  {
    id: 2,
    tag: "AGENDA",
    color: "blue",
    title: "Rapat Pertemuan Orang Tua & Sosialisasi Program Sekolah",
    date: "Sabtu Depan, 08.30 WIT",
    content: "Diharapkan kehadiran seluruh orang tua/wali murid kelas 1 s.d 6 bertempat di Gedung Pertemuan SDN 305 Maluku Tengah guna membahas kurikulum dan tata tertib."
  },
  {
    id: 3,
    tag: "PENTING",
    color: "red",
    title: "Pembaruan Data Dapodik & Bantuan Program Indonesia Pintar (PIP)",
    date: "Batas Akhir: Akhir Bulan",
    content: "Bagi wali murid penerima KIP/PKH harap segera memverifikasi kelengkapan berkas ke Bagian Tata Usaha (Bpk. Usman Patty)."
  }
];

export const initialGuru: GuruItem[] = [
  {
    id: 1,
    nama: "Siti Rahmawati, S.Pd",
    jabatan: "Wali Kelas VI",
    kategori: "Guru Kelas",
    nip: "19820512 200604 2 003",
    pendidikan: "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    nama: "Ahmad Latuconsina, S.Pd",
    jabatan: "Guru Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)",
    kategori: "Guru Mapel",
    nip: "19850110 200902 1 004",
    pendidikan: "S1 Pendidikan Jasmani & Kesehatan",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    nama: "Mariana Wattimena, S.Pd.I",
    jabatan: "Guru Pendidikan Agama Islam & Budi Pekerti",
    kategori: "Guru Mapel",
    nip: "19881120 201101 2 008",
    pendidikan: "S1 Tarbiyah & Ilmu Keguruan",
    foto: "https://images.unsplash.com/photo-1580894732413-a70d2a801fef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    nama: "Dewi Tuasikal, S.Pd",
    jabatan: "Wali Kelas III",
    kategori: "Guru Kelas",
    nip: "19910405 201503 2 001",
    pendidikan: "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    nama: "Usman Patty, A.Md",
    jabatan: "Kepala Urusan Tata Usaha & Dapodik",
    kategori: "Tenaga Kependidikan",
    nip: "19800214 200801 1 005",
    pendidikan: "D3 Administrasi Perkantoran",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 6,
    nama: "Nurhayati Leuly, S.Pd",
    jabatan: "Guru Seni Budaya & Pembina Tari Daerah",
    kategori: "Guru Mapel",
    nip: "19930712 201903 2 011",
    pendidikan: "S1 Seni Budaya & Kerajinan",
    foto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 7,
    nama: "Faisal Marasabessy, S.Pd",
    jabatan: "Wali Kelas V",
    kategori: "Guru Kelas",
    nip: "19900318 201402 1 002",
    pendidikan: "S1 PGSD Universitas Pattimura",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 8,
    nama: "Halimah Tomagola, S.Pd",
    jabatan: "Wali Kelas I",
    kategori: "Guru Kelas",
    nip: "19940924 202012 2 015",
    pendidikan: "S1 Pendidikan Guru Usia Dasar",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

export const initialSiswaRekap: SiswaRekap[] = [
  { kelas: "Kelas 1", waliKelas: "Halimah Tomagola, S.Pd", laki: 15, perempuan: 13 },
  { kelas: "Kelas 2", waliKelas: "Hasanudin Talaohu, S.Pd", laki: 14, perempuan: 16 },
  { kelas: "Kelas 3", waliKelas: "Dewi Tuasikal, S.Pd", laki: 18, perempuan: 12 },
  { kelas: "Kelas 4", waliKelas: "Rosita Lessy, S.Pd", laki: 12, perempuan: 15 },
  { kelas: "Kelas 5", waliKelas: "Faisal Marasabessy, S.Pd", laki: 16, perempuan: 14 },
  { kelas: "Kelas 6", waliKelas: "Siti Rahmawati, S.Pd", laki: 15, perempuan: 15 }
];

export const initialAlumni: AlumniItem[] = [
  {
    id: 1,
    nama: "Rizky Firmansyah Patty",
    tahunLulus: 2017,
    pekerjaan: "Mahasiswa Fakultas Kedokteran Unpatti",
    kontak: "081248xxxxxx",
    kesan: "Bimbingan bapak dan ibu guru di SDN 305 Masohi sangat berharga bagi pondasi karakter dan kedisiplinan belajar saya.",
    tanggalDaftar: "10 Agustus 2026"
  },
  {
    id: 2,
    nama: "Fadilah Putri Latuconsina",
    tahunLulus: 2019,
    pekerjaan: "Siswa SMAN 1 Maluku Tengah",
    kontak: "085244xxxxxx",
    kesan: "Kenangan terindah saat juara lomba drumband dan upacara hari Senin. Sukses selalu untuk sekolah tercinta!",
    tanggalDaftar: "18 Agustus 2026"
  },
  {
    id: 3,
    nama: "Ibrahim Salampessy",
    tahunLulus: 2015,
    pekerjaan: "Wiraswasta / Pegawai BUMN Masohi",
    kontak: "082199xxxxxx",
    kesan: "SDN 305 tempat terbaik menimba ilmu dasar. Semoga fasilitas digitalnya semakin maju pesat.",
    tanggalDaftar: "02 September 2026"
  }
];

export const initialGaleri: GaleriItem[] = [
  {
    id: 1,
    title: "Kegiatan Belajar Mengajar Aktif di Kelas",
    kategori: "Belajar Mengajar",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "15 September 2026"
  },
  {
    id: 2,
    title: "Membaca Buku di Pojok Literasi Perpustakaan Sekolah",
    kategori: "Lingkungan",
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "10 September 2026"
  },
  {
    id: 3,
    title: "Upacara Peringatan Hari Pendidikan di Halaman Sekolah",
    kategori: "Upacara",
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "02 Mei 2026"
  },
  {
    id: 4,
    title: "Praktik Komputer dan Pengenalan Literasi Digital",
    kategori: "Belajar Mengajar",
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "28 Agustus 2026"
  },
  {
    id: 5,
    title: "Latihan Ekstrakurikuler Tari Tradisional Maluku",
    kategori: "Ekstrakurikuler",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "22 Agustus 2026"
  },
  {
    id: 6,
    title: "Kebun Sekolah dan Gerakan Peduli Lingkungan Hidup",
    kategori: "Lingkungan",
    src: "https://images.unsplash.com/photo-1544207959-c290132db740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tanggal: "14 Agustus 2026"
  }
];

export const initialDownloads: DownloadItem[] = [
  {
    id: 1,
    nama: "Formulir Pendaftaran Siswa Baru (PPDB) Resmi 2026.pdf",
    kategori: "Formulir",
    ukuran: "245 KB",
    tanggal: "15 Juni 2026",
    tipe: "PDF Document",
    isiKonten: `PEMERINTAH KABUPATEN MALUKU TENGAH
DINAS PENDIDIKAN DAN KEBUDAYAAN
SD NEGERI 305 MALUKU TENGAH
Jl. Nuri Kelurahan Namaelo, Masohi - Kode Pos 97511
================================================================

FORMULIR PENDAFTARAN PESERTA DIDIK BARU (PPDB) TAHUN AJARAN 2026/2027

A. DATA CALON SISWA:
1. Nama Lengkap           : ....................................................
2. Nama Panggilan         : ....................................................
3. Nomor Induk Kependudukan (NIK) : ............................................
4. Tempat, Tanggal Lahir  : ....................................................
5. Jenis Kelamin          : [ ] Laki-laki    [ ] Perempuan
6. Agama                  : ....................................................
7. Alamat Tempat Tinggal  : ....................................................
                            RT/RW: ........ Kelurahan: Namaelo Kec: Masohi

B. DATA ORANG TUA / WALI:
1. Nama Ayah Kandung      : ....................................................
2. NIK Ayah               : ....................................................
3. Pekerjaan Ayah         : ....................................................
4. Nama Ibu Kandung       : ....................................................
5. Pekerjaan Ibu          : ....................................................
6. Nomor Telepon / WhatsApp : ..................................................

Masohi, ......................... 2026
Tanda Tangan Orang Tua / Wali

(...........................................)`
  },
  {
    id: 2,
    nama: "Kalender Pendidikan Semester Ganjil & Genap SDN 305.pdf",
    kategori: "Kurikulum",
    ukuran: "512 KB",
    tanggal: "10 Juli 2026",
    tipe: "PDF Document",
    isiKonten: `KALENDER AKADEMIK TAHUN AJARAN 2026/2027
SD NEGERI 305 MALUKU TENGAH - MASOHI

Juli 2026      : Hari Pertama Masuk Sekolah & Masa Pengenalan Lingkungan Sekolah (MPLS)
Agustus 2026   : Peringatan HUT RI ke-81 & Lomba Kemerdekaan
September 2026 : Pelaksanaan Gladi Bersih & ANBK Utama Kelas 5
Oktober 2026   : Asesmen Tengah Semester (ATS) Ganjil
Desember 2026  : Asesmen Akhir Semester & Pembagian Rapor Semester 1
Januari 2027   : Awal Semester Genap
Mei 2027       : Ujian Sekolah Kelas VI
Juni 2027      : Pembagian Rapor & Kelulusan Kelas VI`
  },
  {
    id: 3,
    nama: "Jadwal Pelajaran Tematik & Mata Pelajaran.pdf",
    kategori: "Jadwal",
    ukuran: "180 KB",
    tanggal: "18 Juli 2026",
    tipe: "PDF Document",
    isiKonten: `JADWAL PEMBELAJARAN TATAP MUKA
SDN 305 MALUKU TENGAH

Waktu Belajar:
Senin - Kamis : 07.15 - 12.30 WIT
Jumat         : 07.15 - 11.00 WIT (Senam & Jumat Beriman)
Sabtu         : 07.15 - 11.30 WIT (Pengembangan Diri & Pramuka)

Mata Pelajaran Wajib:
1. Pendidikan Agama & Budi Pekerti
2. Pendidikan Pancasila
3. Bahasa Indonesia
4. Matematika
5. Ilmu Pengetahuan Alam dan Sosial (IPAS)
6. PJOK
7. Seni dan Budaya Maluku`
  },
  {
    id: 4,
    nama: "Buku Pedoman Tata Tertib & Kode Etik Siswa.pdf",
    kategori: "Panduan",
    ukuran: "1.2 MB",
    tanggal: "01 Juli 2026",
    tipe: "PDF Document",
    isiKonten: `BUKU PANDUAN DAN TATA TERTIB SISWA
SD NEGERI 305 MALUKU TENGAH - MASOHI

BAB I: KEHADIRAN DAN KEDISIPLINAN
1. Siswa hadir di sekolah selambat-lambatnya pukul 07.10 WIT.
2. Bel masuk berbunyi pukul 07.15 WIT diawali dengan berdoa dan menyanyikan lagu Indonesia Raya.

BAB II: SERAGAM SEKOLAH
- Senin & Selasa : Seragam Putih Merah lengkap dengan Dasi, Topi, dan Sepatu Hitam.
- Rabu & Kamis   : Seragam Batik Sekolah khas Maluku Tengah.
- Jumat          : Seragam Olahraga Sekolah.
- Sabtu          : Seragam Pramuka Lengkap dengan kacu.

Kepala Sekolah SDN 305 Maluku Tengah
Drs. H. M. Latuconsina, M.Pd`
  }
];

export const initialBukuTamu: BukuTamuItem[] = [
  {
    id: 1,
    nama: "Bapak Herman",
    status: "Orang Tua Murid Kelas 4",
    email: "herman.masohi@gmail.com",
    pesan: "Sangat bangga dengan perkembangan fasilitas dan kerapihan SDN 305 Maluku Tengah di Masohi ini. Sukses selalu untuk bapak dan ibu guru!",
    tanggal: "Kemarin, 14.30 WIT",
    likes: 8
  },
  {
    id: 2,
    nama: "Ibu Salma Wattimena",
    status: "Komite Sekolah",
    email: "salma.wattimena@yahoo.com",
    pesan: "Apresiasi yang tinggi atas terselenggaranya website resmi sekolah ini. Memudahkan kami para orang tua memantau agenda dan pengumuman sekolah.",
    tanggal: "3 hari yang lalu",
    likes: 5
  },
  {
    id: 3,
    nama: "Kapten Inf. Rahman",
    status: "Babinsa Namaelo / Tokoh Masyarakat",
    email: "koramil.masohi@tni.mil.id",
    pesan: "Semangat mendidik tunas-tunas bangsa di Maluku Tengah. SDN 305 selalu disiplin dan berprestasi!",
    tanggal: "1 minggu yang lalu",
    likes: 12
  }
];

export const initialPoll: PollData = {
  question: "Bagaimana pendapat Anda tentang tampilan website sekolah kami?",
  options: [
    { id: "opt-1", text: "Sangat Baik", votes: 85 },
    { id: "opt-2", text: "Baik", votes: 32 },
    { id: "opt-3", text: "Cukup", votes: 9 },
    { id: "opt-4", text: "Kurang", votes: 2 }
  ]
};
