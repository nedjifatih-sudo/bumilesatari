import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Menu,
  Search,
  X,
} from 'lucide-react';
import {
  HERO_METRICS,
  FIVE_R_HIERARCHY,
  FEATURED_PROJECTS,
  MATERIAL_SPECIMENS,
  FeaturedProject,
} from './data/sustainabilityData';
import { EditorialImage } from './components/EditorialImage';
import { ProjectModal } from './components/ProjectModal';
import { WasteAuditCalculator } from './components/WasteAuditCalculator';
import { N8nChatbot } from './components/N8nChatbot';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Section 1: 5R Hierarchy interactive state
  const [activeHierarchyId, setActiveHierarchyId] = useState<string>('refuse');
  const [activeRoomFilter, setActiveRoomFilter] = useState<
    'all' | 'dapur' | 'mandi' | 'belanja'
  >('all');

  // Section 2: Case study modal state
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);

  // Section 3: Material Atlas interactive filter & search state
  const [materialCategory, setMaterialCategory] = useState<
    'all' | 'dapur' | 'kemasan' | 'perawatan' | 'tekstil'
  >('all');
  const [materialSearch, setMaterialSearch] = useState<string>('');

  const activeHierarchy = useMemo(
    () =>
      FIVE_R_HIERARCHY.find((item) => item.id === activeHierarchyId) ||
      FIVE_R_HIERARCHY[0],
    [activeHierarchyId]
  );

  const filteredRoomProtocols = useMemo(() => {
    if (activeRoomFilter === 'all') return activeHierarchy.roomProtocols;
    return activeHierarchy.roomProtocols.filter(
      (p) => p.room === activeRoomFilter
    );
  }, [activeHierarchy, activeRoomFilter]);

  const leadProject = useMemo(
    () => FEATURED_PROJECTS.find((p) => p.tier === 'lead')!,
    []
  );
  const secondaryProjects = useMemo(
    () => FEATURED_PROJECTS.filter((p) => p.tier === 'secondary'),
    []
  );
  const archiveProjects = useMemo(
    () => FEATURED_PROJECTS.filter((p) => p.tier === 'archive'),
    []
  );

  const filteredSpecimens = useMemo(() => {
    return MATERIAL_SPECIMENS.filter((spec) => {
      const matchesCat =
        materialCategory === 'all' || spec.category === materialCategory;
      const q = materialSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        spec.linearItem.toLowerCase().includes(q) ||
        spec.circularReplacement.toLowerCase().includes(q) ||
        spec.circularMaterial.toLowerCase().includes(q) ||
        spec.curatorialNote.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [materialCategory, materialSearch]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#14532D] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-[#FBF9F5]"
      >
        Langsung ke konten utama
      </a>

      {/* Strict 3-Zone Top Bar Contract (Height <= 64px for <15% mobile sticky cap) */}
      <header className="sticky top-0 z-40 h-16 border-b border-stone-300/80 bg-[#FBF9F5]/95 backdrop-blur-xs">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-8 px-6 sm:px-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-display text-lg font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            Lingkar Lestari
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700"
          >
            <a
              href="#prinsip-5r"
              className="hover:text-stone-950 hover:underline hover:underline-offset-8 transition-editorial whitespace-nowrap shrink-0"
            >
              Prinsip 5R
            </a>
            <a
              href="#studi-kasus"
              className="hover:text-stone-950 hover:underline hover:underline-offset-8 transition-editorial whitespace-nowrap shrink-0"
            >
              Studi Kasus
            </a>
            <a
              href="#atlas-material"
              className="hover:text-stone-950 hover:underline hover:underline-offset-8 transition-editorial whitespace-nowrap shrink-0"
            >
              Atlas Material
            </a>
            <a
              href="#kalkulator-jejak"
              className="hover:text-stone-950 hover:underline hover:underline-offset-8 transition-editorial whitespace-nowrap shrink-0"
            >
              Kalkulator Jejak
            </a>
          </nav>

          {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#kalkulator-jejak"
              className="hidden sm:inline-flex items-center justify-center bg-[#14532D] px-4 py-2 text-xs font-medium text-[#FBF9F5] hover:bg-[#0F3F22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] whitespace-nowrap shrink-0 transition-editorial"
            >
              Mulai Audit Sampah
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-800 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-stone-300 bg-[#FBF9F5] px-6 py-5 md:hidden">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-stone-800">
              <button
                type="button"
                onClick={() => scrollToSection('prinsip-5r')}
                className="py-1.5 text-left hover:text-[#14532D]"
              >
                01. Prinsip 5R & Protokol Ruang
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('studi-kasus')}
                className="py-1.5 text-left hover:text-[#14532D]"
              >
                02. Studi Kasus Komunitas Sirkular
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('atlas-material')}
                className="py-1.5 text-left hover:text-[#14532D]"
              >
                03. Atlas Dekomposisi & Siklus Material
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('kalkulator-jejak')}
                className="py-1.5 text-left hover:text-[#14532D]"
              >
                04. Kalkulator Audit Residu Rumah Tangga
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('kalkulator-jejak')}
                className="mt-2 w-full bg-[#14532D] py-2.5 text-center text-xs font-medium text-[#FBF9F5]"
              >
                Mulai Audit Sampah Sekarang
              </button>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {/* Operational Utility Strip (Editorial Pattern A) */}
        <div className="border-b border-stone-200/90 bg-[#F4F0E8] px-6 py-2.5 sm:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tabular font-medium text-stone-800">
                MONOGRAF EDUKASI PUBLIK · VOL. IV / 2026
              </span>
              <span aria-hidden="true">·</span>
              <span>Kurikulum Hidup Minim Sampah & Ekologi Rumah Tangga</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono-tabular text-[11px] text-stone-600">
              <span>Akses Terbuka</span>
              <span aria-hidden="true">·</span>
              <span>Basis Data LCA Nusantara</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION — Light Editorial Archival Paper */}
        <section
          aria-labelledby="hero-headline"
          className="mx-auto max-w-[1200px] px-6 pt-12 pb-16 sm:px-8 lg:pt-20 lg:pb-24"
        >
          {/* 2-Column Asymmetric Editorial Split */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Editorial Proposition (5 cols) */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span>Praktik Keberlanjutan Sehari-hari</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero-Waste Lifestyle</span>
                </div>

                <h1
                  id="hero-headline"
                  className="mt-4 font-serif-display text-[clamp(2.25rem,4vw,3.55rem)] font-semibold leading-[1.08] tracking-tight text-stone-900"
                >
                  Merancang Rumah Tangga Tanpa Residu dari Hulu.
                </h1>

                <p className="mt-5 max-w-[60ch] text-base leading-[1.7] text-stone-700">
                  Lebih dari 60% beban tempat pemrosesan akhir di Indonesia berasal dari dapur dan konsumsi domestik. Pelajari metode terukur untuk memangkas kemasan sekali pakai, mengomposkan organik tanpa bau, dan membangun siklus material yang lestari.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-300/80">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#kalkulator-jejak"
                    className="inline-flex items-center gap-2.5 bg-[#14532D] px-6 py-3.5 text-xs font-medium text-[#FBF9F5] hover:bg-[#0F3F22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] whitespace-nowrap shrink-0 transition-editorial"
                  >
                    <span>Hitung Audit Sampah Rumah</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#prinsip-5r"
                    className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-semibold text-stone-800 hover:text-[#14532D] whitespace-nowrap shrink-0 transition-editorial"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Pelajari Hierarki 5R</span>
                  </a>
                </div>
                <p className="mt-3 text-xs text-stone-500">
                  Disusun bersama praktisi pengomposan perkotaan, koperasi curah, dan peneliti siklus hidup material.
                </p>
              </div>
            </div>

            {/* Right Column: Dominant 16:9 Showcase Plate (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <EditorialImage
                src="/images/hero-zero-waste.svg"
                alt="Anatomi ruang dapur minim sampah dengan dispenser kaca amber isi ulang, keranjang serat bambu, sabun padat, dan tanaman terakota"
                aspectRatio="16:9"
                caption="Plate I — Ekosistem dapur sirkular: wadah kaca kedap udara, sabun castile curah, serat selulosa alami, dan pot biokonversi terakota."
              />
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div className="mt-14 grid grid-cols-1 gap-px border border-stone-300/90 bg-stone-300/90 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_METRICS.map((metric, idx) => (
              <div key={idx} className="bg-[#FBF9F5] p-6">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-stone-900">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#14532D]">
                  {metric.unit}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {metric.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: LIGHT EDITORIAL — PRINSIP 5R & PROTOKOL RUANG RUMAH TANGGA */}
        <section
          id="prinsip-5r"
          aria-labelledby="heading-5r"
          className="border-t border-stone-300/80 bg-[#FBF9F5] py-20 lg:py-28"
        >
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
            {/* Section Header */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span>Bab 01 · Metodologi Fondasional</span>
                  <span aria-hidden="true">·</span>
                  <span>Piramida Terbalik Pengelolaan Residu</span>
                </div>
                <h2
                  id="heading-5r"
                  className="mt-3 font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900"
                >
                  Lima Tahap Hierarki Hidup Minim Sampah
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm leading-relaxed text-stone-700">
                  Urutan pelaksanaan menentukan keberhasilan: pencegahan di hulu selalu jauh lebih efektif daripada mendaur ulang di hilir.
                </p>
              </div>
            </div>

            {/* Interactive Chapter Navigation Rail (Pattern E) */}
            <div
              role="tablist"
              aria-label="Tahapan Hierarki 5R"
              className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-5 border-b border-stone-300 pb-4"
            >
              {FIVE_R_HIERARCHY.map((step) => {
                const isActive = step.id === activeHierarchyId;
                return (
                  <button
                    key={step.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveHierarchyId(step.id)}
                    className={`flex flex-col items-start border p-4 text-left transition-editorial ${
                      isActive
                        ? 'border-[#14532D] bg-[#14532D] text-[#FBF9F5]'
                        : 'border-stone-300/80 bg-[#F4F0E8]/60 text-stone-800 hover:border-stone-400 hover:bg-[#F4F0E8]'
                    }`}
                  >
                    <span
                      className={`font-mono-tabular text-xs ${
                        isActive ? 'text-[#A7F3D0]' : 'text-stone-500'
                      }`}
                    >
                      TAHAP {step.order}
                    </span>
                    <span className="mt-1 font-serif-display text-lg font-semibold whitespace-nowrap">
                      {step.term}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Asymmetric Reading Canvas (70% Main Essay / 30% Margin Notes — Pattern D) */}
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left 8 Columns: Long-form Editorial Essay with Drop Cap & Optimal 65ch Measure */}
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                  <span className="font-mono-tabular font-semibold text-[#14532D]">
                    PRINSIP {activeHierarchy.order} / 05
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeHierarchy.diversionPotential}</span>
                </div>

                <h3 className="mt-2 font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900">
                  {activeHierarchy.indonesianTitle}
                </h3>
                <p className="mt-2 text-sm font-medium text-stone-600">
                  {activeHierarchy.subtitle}
                </p>

                <div className="mt-6 max-w-[68ch] space-y-4 text-base leading-[1.78] text-stone-800">
                  <p className="editorial-dropcap">{activeHierarchy.leadEssay}</p>
                  <p>{activeHierarchy.secondParagraph}</p>
                </div>
              </div>

              {/* Right 4 Columns: Archival Margin Citation & Quantitative Callout */}
              <aside
                aria-label="Catatan Margin Riset"
                className="lg:col-span-4 flex flex-col justify-between border border-stone-300/90 bg-[#F4F0E8] p-6"
              >
                <div>
                  <div className="font-mono-tabular text-xs font-semibold tracking-wider text-stone-500">
                    {activeHierarchy.marginNote.figureCode}
                  </div>
                  <div className="mt-4 border-t border-stone-300 pt-4">
                    <div className="text-xs text-stone-600">
                      {activeHierarchy.marginNote.metricLabel}
                    </div>
                    <div className="mt-1 font-mono-tabular text-2xl font-semibold text-[#14532D]">
                      {activeHierarchy.marginNote.metricValue}
                    </div>
                  </div>
                  <p className="mt-4 font-serif-display text-xs italic leading-relaxed text-stone-600">
                    Sumber: {activeHierarchy.marginNote.citation}
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-300 pt-4 text-xs text-stone-600">
                  Gunakan filter ruang di bawah untuk melihat substitusi kebiasaan secara spesifik di dalam hunian Anda.
                </div>
              </aside>
            </div>

            {/* Room-by-Room Actionable Protocols */}
            <div className="mt-12 border-t border-stone-300/80 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h4 className="font-serif-display text-xl font-semibold text-stone-900">
                  Protokol Substitusi Kebiasaan Rumah Tangga ({activeHierarchy.term})
                </h4>

                {/* Interactive Room Filter Buttons */}
                <div className="flex flex-wrap items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
                  {(
                    [
                      { id: 'all', label: 'Semua Ruang' },
                      { id: 'dapur', label: 'Dapur & Pangan' },
                      { id: 'mandi', label: 'Kamar Mandi' },
                      { id: 'belanja', label: 'Belanja & Mobilitas' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveRoomFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-editorial ${
                        activeRoomFilter === tab.id
                          ? 'bg-white text-stone-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-950'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {filteredRoomProtocols.map((protocol, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col justify-between border border-stone-300 bg-[#FBF9F5] p-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-semibold text-stone-800">
                          {protocol.roomLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{protocol.difficulty}</span>
                      </div>

                      <div className="mt-4">
                        <div className="text-[11px] font-medium text-[#9A3412]">
                          Pola Linear yang Dihentikan:
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-stone-600">
                          {protocol.habitToReplace}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-stone-200 pt-4">
                        <div className="text-[11px] font-medium text-[#14532D]">
                          Intervensi Sirkular:
                        </div>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-stone-900">
                          {protocol.circularPractice}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-stone-200 pt-3 flex items-center justify-between text-xs">
                      <span className="text-stone-500">Estimasi Reduksi:</span>
                      <span className="font-mono-tabular font-semibold text-[#14532D]">
                        {protocol.annualImpact}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CINEMATIC DARK SECTION — STUDI KASUS & INFRASTRUKTUR KOMUNITAS */}
        <section
          id="studi-kasus"
          aria-labelledby="heading-studi-kasus"
          className="bg-[#111613] py-24 lg:py-32 text-[#F4F1EA] tracking-[0.01em]"
        >
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
            {/* Dark Section Header */}
            <div className="grid grid-cols-1 gap-6 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                  <span>Bab 02 · Bukti Empiris Lapangan</span>
                  <span aria-hidden="true">·</span>
                  <span>Dokumentasi Proyek Sirkular 2025–2026</span>
                </div>
                <h2
                  id="heading-studi-kasus"
                  className="mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.65rem] font-medium leading-[1.12] text-[#F4F1EA]"
                >
                  Studi Kasus & Infrastruktur Komunitas Minim Sampah
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm leading-relaxed text-[#C7C2B8]">
                  Klik pada setiap dokumentasi studi kasus untuk membaca rincian metodologi, neraca massa sebelum dan sesudah intervensi, serta cetak biru replikasi.
                </p>
              </div>
            </div>

            {/* 3-Tier Editorial Salience & Asymmetric Bento Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
              {/* TIER 1: Lead Flagship Case Study (7 Columns) */}
              <article className="flex flex-col justify-between border border-white/12 bg-[#171E1A] p-6 sm:p-8 lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8A29E]">
                    <span className="font-mono-tabular text-[#86EFAC]">
                      LAPORAN UTAMA · {leadProject.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{leadProject.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadProject.readTime}</span>
                  </div>

                  <h3 className="mt-3 font-serif-display text-2xl sm:text-3xl font-medium leading-snug text-[#F4F1EA]">
                    {leadProject.title}
                  </h3>

                  <div className="mt-6">
                    <EditorialImage
                      src={leadProject.image!}
                      alt={leadProject.imageAlt!}
                      aspectRatio="16:9"
                      caption={leadProject.figureCaption}
                      darkSurface
                    />
                  </div>

                  <p className="mt-6 max-w-[65ch] text-sm sm:text-base leading-[1.75] text-[#D6D1C7]">
                    {leadProject.summary}
                  </p>

                  {/* Quantitative Impact Strip inside Lead Card */}
                  <div className="mt-6 grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:grid-cols-2">
                    <div>
                      <div className="text-xs text-[#A8A29E]">
                        Capaian Primer (6 Bulan)
                      </div>
                      <div className="mt-1 font-mono-tabular text-xl sm:text-2xl font-semibold text-[#86EFAC]">
                        {leadProject.primaryMetric}
                      </div>
                      <p className="mt-1 text-xs text-[#A8A29E]">
                        {leadProject.primaryMetricContext}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs text-[#A8A29E]">
                        Volume Sirkulasi Kemasan
                      </div>
                      <div className="mt-1 font-mono-tabular text-lg font-semibold text-[#F4F1EA]">
                        {leadProject.secondaryMetric}
                      </div>
                      <p className="mt-1 text-xs text-[#A8A29E]">
                        Melalui sistem jeriken tertutup 25L dan pinjam toples RW.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Claim-to-Proof Adjacency: Attributable Testimonial & Modal Trigger */}
                <div className="mt-6 pt-2">
                  {leadProject.testimonial && (
                    <blockquote className="mb-6 border border-white/10 bg-[#131916] p-5">
                      <p className="font-serif-display text-sm italic leading-relaxed text-[#E7E2D8]">
                        “{leadProject.testimonial.quote}”
                      </p>
                      <footer className="mt-2.5 text-xs text-[#A8A29E]">
                        <strong className="font-medium text-[#F4F1EA]">
                          {leadProject.testimonial.author}
                        </strong>{' '}
                        · {leadProject.testimonial.role},{' '}
                        {leadProject.testimonial.organization}
                      </footer>
                    </blockquote>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(leadProject)}
                    className="inline-flex items-center gap-2 bg-[#F4F1EA] px-5 py-3 text-xs font-semibold text-[#111613] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86EFAC] whitespace-nowrap shrink-0 transition-editorial"
                  >
                    <span>Buka Metodologi & Matriks Data</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>

              {/* TIER 2: Secondary Featured Projects (5 Columns Stacked) */}
              <div className="flex flex-col justify-between gap-8 lg:col-span-5">
                {secondaryProjects.map((project) => (
                  <article
                    key={project.id}
                    className="flex flex-1 flex-col justify-between border border-white/12 bg-[#171E1A] p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8A29E]">
                        <span className="font-mono-tabular text-[#86EFAC]">
                          STUDI {project.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.readTime}</span>
                      </div>

                      <h3 className="mt-2.5 font-serif-display text-xl font-medium leading-snug text-[#F4F1EA]">
                        {project.title}
                      </h3>

                      {project.image && (
                        <div className="mt-4">
                          <EditorialImage
                            src={project.image}
                            alt={project.imageAlt || project.title}
                            aspectRatio="4:3"
                            caption={project.figureCaption}
                            darkSurface
                          />
                        </div>
                      )}

                      <p className="mt-4 text-sm leading-relaxed text-[#C7C2B8]">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <div>
                        <div className="font-mono-tabular text-base font-semibold text-[#86EFAC]">
                          {project.primaryMetric}
                        </div>
                        <div className="text-[11px] text-[#A8A29E]">
                          {project.category}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-2 text-xs font-medium text-[#F4F1EA] hover:border-white hover:bg-white/5 whitespace-nowrap shrink-0 transition-editorial"
                      >
                        <span>Baca Kajian</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* TIER 3: Compact Archive & Department Research Rows */}
            <div className="mt-12 border-t border-white/12 pt-8">
              <div className="text-xs font-medium text-[#A8A29E]">
                Arsip Riset Terapan Lainnya (Klik untuk membuka protokol lengkap)
              </div>
              <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {archiveProjects.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8A29E]">
                        <span className="font-mono-tabular text-[#86EFAC]">
                          ARSIP {item.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h4 className="mt-1 font-serif-display text-lg font-medium text-[#F4F1EA]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#C7C2B8]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                      <div className="sm:text-right">
                        <div className="font-mono-tabular text-sm font-semibold text-[#86EFAC]">
                          {item.primaryMetric}
                        </div>
                        <div className="text-[11px] text-[#A8A29E]">
                          {item.secondaryMetric}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(item)}
                        className="inline-flex items-center gap-1.5 border border-white/20 px-3.5 py-2 text-xs font-medium text-[#F4F1EA] hover:border-white hover:bg-white/5 whitespace-nowrap shrink-0 transition-editorial"
                      >
                        <span>Buka Data</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: LIGHT EDITORIAL — ATLAS DEKOMPOSISI & SIKLUS HIDUP MATERIAL */}
        <section
          id="atlas-material"
          aria-labelledby="heading-atlas"
          className="border-t border-stone-300/80 bg-[#FBF9F5] py-20 lg:py-28"
        >
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
            {/* Section Header */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span>Bab 03 · Katalog Spesimen & Durasi Urai</span>
                  <span aria-hidden="true">·</span>
                  <span>Perbandingan Produk Sekali Pakai vs Alternatif Sirkular</span>
                </div>
                <h2
                  id="heading-atlas"
                  className="mt-3 font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900"
                >
                  Atlas Siklus Hidup Material Rumah Tangga
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm leading-relaxed text-stone-700">
                  Setiap benda yang kita beli memiliki masa tinggal ekologis. Bandingkan usia dekomposisi polimer sintetis terhadap serat hayati alami.
                </p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="mt-10 flex flex-col gap-4 border-y border-stone-300/80 py-4 md:flex-row md:items-center md:justify-between">
              {/* Interactive Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
                {(
                  [
                    { id: 'all', label: 'Semua Spesimen (6)' },
                    { id: 'dapur', label: 'Dapur & Pencucian' },
                    { id: 'kemasan', label: 'Penyimpanan Pangan' },
                    { id: 'perawatan', label: 'Perawatan Diri' },
                    { id: 'tekstil', label: 'Tekstil & Belanja' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setMaterialCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-editorial ${
                      materialCategory === cat.id
                        ? 'bg-[#1C1917] text-[#FBF9F5] shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={materialSearch}
                  onChange={(e) => setMaterialSearch(e.target.value)}
                  placeholder="Cari material (mis. bambu, loofah)..."
                  aria-label="Cari spesimen di dalam atlas material"
                  className="w-full border border-stone-300 bg-white pl-9 pr-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#14532D] focus:outline-none"
                />
              </div>
            </div>

            {/* Asymmetric Catalog Layout: Left 4 Cols Monograph Portrait | Right 8 Cols Specimen Cards */}
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
              {/* Left 4 Columns: 3:4 Botanical/Material Monograph Plate */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <EditorialImage
                  src="/images/editorial-material-lifecycle.svg"
                  alt="Ilustrasi monograf spesimen material biodegradable: serat oyong kering, sikat bambu sisal, dan sabun minyak zaitun di atas batu travertine"
                  aspectRatio="3:4"
                  caption="Plate IV — Koleksi spesimen organik dan logam tahan karat yang menggantikan lebih dari 400 kemasan plastik rumah tangga per tahun."
                />

                <div className="mt-6 border border-stone-300 bg-[#F4F0E8] p-5">
                  <div className="font-mono-tabular text-xs font-semibold text-stone-800">
                    PRINSIP KURASI MATERIAL
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-700">
                    Sebelum membeli produk berlabel “ramah lingkungan”, ajukan satu pertanyaan uji: <em>“Ketika benda ini rusak pada akhir masa pakainya, apakah ia dapat kembali ke tanah kompos atau dilebur utuh di pabrik logam/kaca?”</em>
                  </p>
                </div>
              </div>

              {/* Right 8 Columns: Specimen Accession Cards */}
              <div className="lg:col-span-8 space-y-6">
                {filteredSpecimens.length === 0 ? (
                  <div className="border border-stone-300 bg-[#F4F0E8] p-10 text-center">
                    <p className="font-serif-display text-lg text-stone-800">
                      Tidak ditemukan spesimen yang cocok dengan kata kunci “{materialSearch}”.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setMaterialCategory('all');
                        setMaterialSearch('');
                      }}
                      className="mt-4 border border-stone-400 bg-white px-4 py-2 text-xs font-medium text-stone-900 hover:bg-stone-100"
                    >
                      Tampilkan Semua Spesimen
                    </button>
                  </div>
                ) : (
                  filteredSpecimens.map((specimen) => (
                    <article
                      key={specimen.id}
                      className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-7"
                    >
                      {/* Unboxed Metadata Line */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3 text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tabular font-semibold text-stone-800">
                            {specimen.accessionCode}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{specimen.figureNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>{specimen.categoryLabel}</span>
                        </div>
                        <span className="font-mono-tabular font-medium text-[#14532D]">
                          {specimen.carbonDelta}
                        </span>
                      </div>

                      {/* Comparison Grid */}
                      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Linear Single-Use Column */}
                        <div className="bg-[#F5EFE6] p-4 border border-stone-200/80">
                          <div className="text-[11px] font-semibold text-[#9A3412]">
                            RESIDU LINEAR (DIHENTIKAN)
                          </div>
                          <h3 className="mt-1 font-serif-display text-base font-semibold text-stone-900">
                            {specimen.linearItem}
                          </h3>
                          <dl className="mt-3 space-y-1.5 text-xs">
                            <div>
                              <dt className="text-stone-500">Usia Dekomposisi di TPA:</dt>
                              <dd className="font-mono-tabular font-semibold text-[#9A3412]">
                                {specimen.linearDecomposition}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Circular Zero-Waste Column */}
                        <div className="bg-[#EFF5F1] p-4 border border-[#14532D]/20">
                          <div className="text-[11px] font-semibold text-[#14532D]">
                            SUBSTITUSI SIRKULAR LESTARI
                          </div>
                          <h3 className="mt-1 font-serif-display text-base font-semibold text-stone-900">
                            {specimen.circularReplacement}
                          </h3>
                          <dl className="mt-3 space-y-1.5 text-xs">
                            <div>
                              <dt className="text-stone-500">Komposisi Material:</dt>
                              <dd className="font-medium text-stone-800">
                                {specimen.circularMaterial}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-stone-500">Masa Pakai & Akhir Siklus:</dt>
                              <dd className="font-mono-tabular font-medium text-[#14532D]">
                                {specimen.circularLifespan} · {specimen.circularEndOfLife}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      {/* Curatorial Note */}
                      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-700">
                        {specimen.curatorialNote}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Editorial Pull Quote (Top & Bottom Hairline Rules, No Thick Left Border) */}
            <blockquote className="mt-20 border-y border-stone-300 py-10 text-center">
              <p className="mx-auto max-w-3xl font-serif-display text-2xl sm:text-3xl italic leading-relaxed text-stone-800">
                “Hidup minim sampah bukanlah perlombaan memamerkan toples kosong di media sosial, melainkan kesadaran tenang untuk mengembalikan nutrisi organik ke tanah dan menghormati energi di balik setiap benda yang kita pakai.”
              </p>
              <footer className="mt-4 text-xs tracking-wider uppercase text-stone-500">
                Catatan Redaksi Lingkar Lestari · Pedoman Transisi Rumah Tangga Nusantara
              </footer>
            </blockquote>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE WASTE AUDIT CALCULATOR & COMMUNITY SIGNUP */}
        <WasteAuditCalculator />
      </main>

      {/* Quiet Editorial Footer (No telemetry tickers or fake system statuses) */}
      <footer className="border-t border-stone-300 bg-[#EFECE4] py-14 text-xs text-stone-600">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-serif-display text-lg font-semibold text-stone-900">
                Lingkar Lestari
              </div>
              <p className="mt-2 max-w-sm leading-relaxed text-stone-600">
                Inisiatif edukasi publik dan dokumentasi riset terbuka untuk mempercepat transisi gaya hidup minim sampah (zero-waste) serta pengomposan rumah tangga di Indonesia.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="font-semibold text-stone-900">Indeks Bab Monograf</div>
              <ul className="mt-2.5 space-y-2">
                <li>
                  <a href="#prinsip-5r" className="hover:text-stone-950 hover:underline">
                    01. Hierarki Prinsip 5R & Protokol Ruang
                  </a>
                </li>
                <li>
                  <a href="#studi-kasus" className="hover:text-stone-950 hover:underline">
                    02. Studi Kasus Koperasi Curah & Kompos Perkotaan
                  </a>
                </li>
                <li>
                  <a href="#atlas-material" className="hover:text-stone-950 hover:underline">
                    03. Atlas Dekomposisi & Siklus Hidup Material
                  </a>
                </li>
                <li>
                  <a href="#kalkulator-jejak" className="hover:text-stone-950 hover:underline">
                    04. Kalkulator Audit Residu & Rencana 30 Hari
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="font-semibold text-stone-900">Lisensi & Referensi Data</div>
              <p className="mt-2.5 leading-relaxed text-stone-600">
                Seluruh modul edukasi dan tabel siklus material dapat digandakan secara bebas untuk keperluan penyuluhan warga, sekolah, dan Bank Sampah (CC BY-NC-SA 4.0).
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300/80 pt-6 text-stone-500">
            <span>© 2026 Lingkar Lestari. Publikasi Edukasi Ekologi Rumah Tangga.</span>
            <span>Jakarta · Bandung · Yogyakarta · Surabaya</span>
          </div>
        </div>
      </footer>

      {/* Accessible Case Study Monograph Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onJumpToAudit={() => scrollToSection('kalkulator-jejak')}
      />

      {/* Interactive n8n Webhook Assistant Drawer */}
      <N8nChatbot />
    </div>
  );
}
