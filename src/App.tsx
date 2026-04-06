import { useState } from 'react';
import { ExternalLink, Mail, MapPin, ArrowLeft, Menu, X } from 'lucide-react';

// Komponen SVG kustom untuk GitHub
const GithubIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

// --- DATA DUMMY (Silakan sesuaikan dengan data asli Anda) ---

const PERSONAL_INFO = {
  name: "Adam Yanuar",
  role: "Mobile Developer",
  email: "yadam7195@gmail.com",
  location: "Banyuwangi, Indonesia",
  bio: "Saya adalah seorang Mobile Developer yang berfokus pada pembuatan aplikasi mobile yang bersih, responsif, dan mudah diakses. Saya senang mengubah masalah kompleks menjadi desain yang sederhana dan intuitif. Dengan pengalaman dalam berbagai proyek, saya selalu berusaha untuk meningkatkan keterampilan saya dan mengikuti perkembangan terbaru dalam teknologi mobile.",
  aboutDetailed: "Saya memulai perjalanan saya di dunia pengembangan mobile sejak tahun 2024, dengan fokus utama pada Flutter untuk dapat membuat aplikasi lintas platform dengan performa tinggi. Saya percaya bahwa aplikasi yang baik tidak hanya harus berfungsi dengan baik, tetapi juga harus memberikan pengalaman pengguna yang menyenangkan dan mudah digunakan.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
};

const SKILLS = [
  {
    category: "Mobile Development",
    items: ["Dart (Flutter)", "Kotlin (Android)", "Java (Android)"]
  },
  {
    category: "Backend & Database",
    items: ["MySQL", "PostgreSQL", "Supabase", "Firebase", "REST API"]
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Vercel", "Docker"]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Smart Greenhouse Coffee",
    description: "Sistem pintar berbasis IoT dan AI untuk pemantauan, kontrol, dan deteksi penyakit pada greenhouse kopi melalui aplikasi mobile.",
    longDescription: "Proyek Smart Greenhouse Coffee ini bertujuan untuk mengoptimalkan perawatan tanaman kopi menggunakan integrasi teknologi modern. Melalui aplikasi berbasis Flutter, pengguna dapat memantau kondisi lingkungan seperti suhu, kelembapan, dan soil moisture secara real-time, serta mengontrol perangkat keras (pump, fan, humidifier) secara otomatis maupun manual. Sistem ini didukung oleh model AI ResNet50 untuk mendeteksi penyakit pada daun kopi, dipadukan dengan Google Gemini AI yang memberikan penjelasan penanganan secara otomatis. Arsitektur backend dirancang tangguh dengan menggunakan Apache IoTDB untuk manajemen data time-series sensor dan Supabase untuk penyimpanan data pengguna, gambar, serta riwayat diagnosis.",
    features: [
      "Monitoring suhu, kelembapan, dan soil moisture secara realtime",
      "Kontrol perangkat otomatis & manual (pump, fan, humidifier)",
      "Deteksi penyakit daun kopi menggunakan AI (ResNet50)",
      "Penjelasan dan solusi penyakit otomatis memakai Google Gemini AI",
      "Penyimpanan data hybrid menggunakan Apache IoTDB (time-series) dan Supabase",
      "Aplikasi mobile interaktif berbasis Flutter"],
    image: "/assets/greenhouse.jpeg",
    tags: ["Flutter", "Supabase", "IoT", "AI", "ResNet50", "MQTT"],
    demoUrl: "https://pameran-jti.polije.ac.id/product/478/sistem-monitoring-dan-kontrol-lingkungan-pada-greenhouse-serta-deteksi-dini-penyakit-daun-kopi-berbasis-mobile-menggunakan-iot-dan-cnnresnet-50",
    githubUrl: "https://github.com/Addam884/smart_farm"
  },
  {
    id: 2,
    title: "Bloomama",
    description: "Aplikasi pendamping kehamilan dan kesehatan ibu dengan fitur pelacakan perkembangan janin, manajemen janji temu medis, dan akses mentoring untuk memberikan dukungan penuh selama masa kehamilan.",
    longDescription: "Bloomama dibangun menggunakan framework Flutter untuk menghadirkan pengalaman antarmuka yang ramah dan interaktif bagi calon ibu. Aplikasi ini mengintegrasikan pemantauan kesehatan secara holistik, mulai dari pelacakan pertumbuhan janin dari minggu ke minggu menggunakan visualisasi 3D dan animasi Lottie, fitur penjadwalan konsultasi dengan dokter, hingga rekomendasi artikel harian yang dipersonalisasi berdasarkan usia kandungan pengguna.",
    features: ["Pelacak kehamilan interaktif (minggu 1-40) dengan aset visual 3D", "Sistem manajemen janji temu medis (Appointments) yang terstruktur", "Akses eksklusif ke mentor kehamilan untuk saran dan dukungan", "Pemantauan parameter kesehatan ibu dan bayi secara berkala", "Sajian artikel dan tips harian yang disesuaikan dengan usia kandungan"],
    image: "/assets/bloomama.jpg",
    tags: ["Flutter", "MySQL", "REST API", "Lottie"],
    demoUrl: "https://pameran-jti.polije.ac.id/product/300/perancangan-dan-pengembangan-aplikasi-bloomama-berbasis-web-dan-mobile-platform-terintegrasi-untuk-edukasi-konsultasi-dan-pemantauan-kehamilan",
    githubUrl: "https://github.com/Addam884/Bloomama_Mobile"
  },
  {
    id: 3,
    title: "Ma'karyo",
    description: "Aplikasi Android native pemesanan makanan dan minuman digital dengan manajemen keranjang belanja dan antarmuka yang intuitif.",
    longDescription: "Aplikasi ini dirancang untuk memberikan pengalaman belanja F&B (Food & Beverage) yang lancar dan modern langsung dari genggaman pengguna. Tantangan utamanya adalah mengelola alur data pemesanan secara efisien—mulai dari pemilihan menu, manajemen keranjang (cart), hingga pencatatan riwayat pesanan—tanpa mengorbankan performa aplikasi. Saya menggunakan Java native dengan View Binding untuk interaksi UI yang aman dan bersih, Volley untuk integrasi request jaringan yang andal, serta Glide untuk optimalisasi pemuatan aset gambar agar aplikasi tetap ringan dan responsif.",
    features: ["Sistem autentikasi pengguna (Login & Registrasi) yang aman", "Dashboard interaktif dengan kategori menu dan slider promo", "Manajemen keranjang belanja (Cart) yang dinamis", "Pencatatan dan pelacakan riwayat transaksi pengguna", "Pengelolaan profil pengguna dan pengaturan kata sandi"],
    image: "/assets/makaryo.jpeg",
    tags: ["Native Android", "Java", "Flusk"],
    githubUrl: "https://github.com/Addam884/Makaryo"
  }
];

// --- KOMPONEN UTAMA ---

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk menu mobile

  // Fungsi untuk membuka halaman detail
  const handleOpenProject = (id: number) => {
    setSelectedProjectId(id);
    window.scrollTo(0, 0); // Gulir kembali ke atas saat membuka halaman detail
  };

  // Render Halaman Detail Jika Ada Proyek yang Dipilih
  if (selectedProjectId !== null) {
    const project = PROJECTS.find(p => p.id === selectedProjectId);
    if (!project) return null;

    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200">
        {/* Navbar Halaman Detail */}
        <nav className="fixed top-0 w-full bg-zinc-50/80 backdrop-blur-md z-50 border-b border-zinc-200">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center">
            <button
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Kembali ke Beranda
            </button>
          </div>
        </nav>

        <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
          {/* Gambar Utama (Hero Detail) */}
          <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-zinc-200 shadow-sm">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Judul & Tombol Aksi */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">{project.title}</h1>
            <div className="flex items-center gap-4">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 transition-colors">
                <GithubIcon size={22} />
              </a>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                <ExternalLink size={18} />
                Kunjungi Demo
              </a>
            </div>
          </div>

          {/* Label / Tags */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-zinc-200 pb-12">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-semibold tracking-wide rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Konten Detail */}
          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Tentang Proyek</h2>
              <p className="text-lg text-zinc-700 leading-relaxed mb-8">
                {project.longDescription || project.description}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 tracking-tight">Fitur Utama</h2>
              <ul className="space-y-3">
                {project.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2.5 shrink-0"></span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-zinc-200 py-10 mt-10">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Detail Proyek.
          </div>
        </footer>
      </div>
    );
  }

  // Render Halaman Utama
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 w-full bg-zinc-50/80 backdrop-blur-md z-50 border-b border-zinc-200">
        <div className="w-full mx-auto px-8 md:px-16 lg:px-32 py-4 flex justify-between items-center">
          <span className="font-semibold text-lg tracking-tight">{PERSONAL_INFO.name}.</span>

          {/* Menu Desktop */}
          <div className="hidden sm:flex space-x-8 text-sm font-medium text-zinc-600">
            <a href="#about" className="hover:text-zinc-900 transition-colors">Profil</a>
            <a href="#skills" className="hover:text-zinc-900 transition-colors">Keahlian</a>
            <a href="#projects" className="hover:text-zinc-900 transition-colors">Proyek</a>
            <a href="#contact" className="hover:text-zinc-900 transition-colors">Kontak</a>
          </div>

          {/* Tombol Menu Mobile */}
          <button
            className="sm:hidden text-zinc-600 hover:text-zinc-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-zinc-50 border-b border-zinc-200 px-8 py-6 flex flex-col space-y-6 shadow-lg">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-600 font-medium hover:text-zinc-900 text-lg">Profil</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-600 font-medium hover:text-zinc-900 text-lg">Keahlian</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-600 font-medium hover:text-zinc-900 text-lg">Proyek</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-600 font-medium hover:text-zinc-900 text-lg">Kontak</a>
          </div>
        )}
      </nav>

      <main className="w-full mx-auto px-8 md:px-16 lg:px-32 pt-32 pb-20">
        {/* Section: Hero */}
        <section className="py-20 flex flex-col items-start min-h-[70vh] justify-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
            Halo, saya {PERSONAL_INFO.name.split(' ')[0]}.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed mb-10">
            {PERSONAL_INFO.bio}
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Lihat Pekerjaan Saya
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-6 py-3 bg-white text-zinc-900 font-medium rounded-lg border border-zinc-300 hover:bg-zinc-50 transition-colors flex items-center gap-2"
            >
              <Mail size={18} />
              Hubungi Saya
            </a>
          </div>
        </section>

        {/* Section: Profil / About */}
        <section id="about" className="py-24 border-t border-zinc-200">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Profil Detail</h2>
              <div className="w-12 h-1 bg-zinc-900 mb-6"></div>
              <div className="flex items-center gap-2 text-zinc-600 mb-2">
                <MapPin size={18} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
            <div>
              <p className="text-lg text-zinc-700 leading-relaxed">
                {PERSONAL_INFO.aboutDetailed}
              </p>
            </div>
          </div>
        </section>

        {/* Section: Skills */}
        <section id="skills" className="py-24 border-t border-zinc-200">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Keahlian Utama</h2>
              <div className="w-12 h-1 bg-zinc-900 mb-6"></div>
              <p className="text-zinc-600">Teknologi dan alat bantu yang sehari-hari saya gunakan untuk membangun produk digital.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {SKILLS.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">{skillGroup.category}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 bg-white border border-zinc-200 rounded-md text-sm font-medium text-zinc-700 shadow-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Projects */}
        <section id="projects" className="py-24 border-t border-zinc-200">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Riwayat Proyek Terpilih</h2>
            <div className="w-12 h-1 bg-zinc-900 mb-6"></div>
            <p className="text-zinc-600 max-w-2xl">Beberapa proyek komersial maupun open-source yang telah saya kembangkan. Fokus utama saya adalah pada performa dan user experience.</p>
          </div>

          <div className="space-y-24">
            {PROJECTS.map((project, index) => (
              <div key={project.id} className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                {/* Image Card - Menambahkan interaksi klik */}
                <div
                  onClick={() => handleOpenProject(project.id)}
                  className={`cursor-pointer rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-video relative group ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay subtle on hover */}
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500"></div>
                </div>

                {/* Project Info */}
                <div className={`${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                  {/* Judul juga bisa ditekan */}
                  <h3
                    onClick={() => handleOpenProject(project.id)}
                    className="text-2xl font-bold text-zinc-900 mb-4 cursor-pointer hover:text-zinc-600 transition-colors inline-block"
                  >
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 mb-6 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tombol Baca Selengkapnya */}
                  <button
                    onClick={() => handleOpenProject(project.id)}
                    className="mb-8 font-semibold text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1 group"
                  >
                    Baca selengkapnya
                    <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                  </button>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold tracking-wide uppercase rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      <GithubIcon size={20} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" className="py-32 border-t border-zinc-200 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Mari Berkolaborasi</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Apakah Anda memiliki proyek inovatif dalam pikiran, atau hanya ingin menyapa? Kotak masuk saya selalu terbuka. Saya akan berusaha membalas secepat mungkin!
          </p>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-medium text-lg rounded-xl hover:bg-zinc-800 transition-transform hover:-translate-y-1"
          >
            <Mail size={24} />
            Kirim Email Sekarang
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-10">
        <div className="w-full mx-auto px-8 md:px-16 lg:px-32 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Dibuat secara minimalis.
          </p>
          <div className="flex gap-6">
            <a href={PERSONAL_INFO.socials.github} className="text-zinc-400 hover:text-zinc-900 transition-colors">
              <GithubIcon size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={PERSONAL_INFO.socials.linkedin} className="text-zinc-400 hover:text-zinc-900 transition-colors">
              {/* Using standard text fallback since LinkedIn icon isn't standard in lucide-react basic import */}
              <span className="font-bold text-sm">in</span>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}