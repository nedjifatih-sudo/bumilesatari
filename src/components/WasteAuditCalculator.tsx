import React, { useState } from 'react';
import { Check, Copy, RotateCcw, ArrowRight } from 'lucide-react';

interface HouseholdProfile {
  id: string;
  label: string;
  members: number;
  bottlesPerWeek: number;
  sachetsPerWeek: number;
  organicKgPerWeek: number;
  takeawayPerWeek: number;
}

const PRESET_PROFILES: HouseholdProfile[] = [
  {
    id: 'individu',
    label: 'Hunian Mandiri (1 Orang)',
    members: 1,
    bottlesPerWeek: 5,
    sachetsPerWeek: 8,
    organicKgPerWeek: 2.5,
    takeawayPerWeek: 6,
  },
  {
    id: 'keluarga-muda',
    label: 'Keluarga Muda (3 Orang)',
    members: 3,
    bottlesPerWeek: 12,
    sachetsPerWeek: 22,
    organicKgPerWeek: 6.5,
    takeawayPerWeek: 9,
  },
  {
    id: 'keluarga-besar',
    label: 'Rumah Tangga Besar (5+ Orang)',
    members: 5,
    bottlesPerWeek: 20,
    sachetsPerWeek: 38,
    organicKgPerWeek: 11.0,
    takeawayPerWeek: 14,
  },
];

export const WasteAuditCalculator: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<string>('keluarga-muda');
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number>(12);
  const [sachetsPerWeek, setSachetsPerWeek] = useState<number>(22);
  const [organicKgPerWeek, setOrganicKgPerWeek] = useState<number>(6.5);
  const [takeawayPerWeek, setTakeawayPerWeek] = useState<number>(9);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'minggu-1': true,
    'minggu-2': false,
    'minggu-3': false,
    'minggu-4': false,
  });
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Newsletter / Workshop Lead Capture Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [focusTrack, setFocusTrack] = useState('Kompos Balkon & Dapur');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const applyPreset = (profile: HouseholdProfile) => {
    setActiveProfile(profile.id);
    setBottlesPerWeek(profile.bottlesPerWeek);
    setSachetsPerWeek(profile.sachetsPerWeek);
    setOrganicKgPerWeek(profile.organicKgPerWeek);
    setTakeawayPerWeek(profile.takeawayPerWeek);
  };

  const handleReset = () => {
    applyPreset(PRESET_PROFILES[1]);
  };

  // Quantitative Calculations (Annualized 52 weeks)
  const annualBottles = bottlesPerWeek * 52;
  const annualSachets = sachetsPerWeek * 52;
  const annualTakeaway = takeawayPerWeek * 52;
  const annualOrganicKg = organicKgPerWeek * 52;

  // Mass calculation: PET bottle ~24g, sachet ~4g, takeaway box+cup ~38g
  const annualPlasticKg =
    (annualBottles * 0.024) + (annualSachets * 0.004) + (annualTakeaway * 0.038);
  const totalDivertedWeightKg = annualOrganicKg * 0.85 + annualPlasticKg * 0.82;

  // Carbon calculation: 1kg organic diverted from anaerobic landfill = ~0.88 kg CO2e; 1kg plastic avoided = ~3.1 kg CO2e
  const annualCarbonSavedKg =
    annualOrganicKg * 0.85 * 0.88 + annualPlasticKg * 0.82 * 3.1;

  // Financial savings estimate (refill bulk vs sachets/bottled drinks + homemade compost humus)
  const annualRupiahSaved =
    annualBottles * 3500 + annualSachets * 650 + annualTakeaway * 2000 + annualOrganicKg * 1800;

  const transitionRoadmap = [
    {
      id: 'minggu-1',
      week: 'Minggu 01 · Eliminasi Sekali Pakai Harian',
      title: `Siapkan Tumbler & Rantang untuk Menghentikan ${annualBottles + annualTakeaway} Wadah/Tahun`,
      detail:
        'Tempatkan 1 botol minum baja tahan karat dan 2 tas katun lipat di dekat pintu keluar rumah. Tolak sedotan, kantong kresek, dan alat makan plastik saat memesan makanan.',
    },
    {
      id: 'minggu-2',
      week: 'Minggu 02 · Pemisahan Dua Fraksi Dapur',
      title: `Pisahkan ${annualOrganicKg.toFixed(0)} kg Sisa Dapur Basah dari Kemasan Kering`,
      detail:
        'Sediakan wadah tertutup 3 liter di meja dapur khusus untuk potongan sayur, kulit buah, dan ampas kopi agar kardus dan botol anorganik tetap kering dan bersih.',
    },
    {
      id: 'minggu-3',
      week: 'Minggu 03 · Transisi Belanja Curah & Sabun Padat',
      title: `Pangkas ${annualSachets} Kemasan Sachet Multilayer dengan Toples Kaca`,
      detail:
        'Gunakan kembali toples selai atau botol kaca yang sudah ada di rumah untuk membeli beras, bumbu, minyak, dan sabun curah di stasiun isi ulang atau pasar tradisional.',
    },
    {
      id: 'minggu-4',
      week: 'Minggu 04 · Aktivasi Komposter Terakota / Bokashi',
      title: `Konversi Residu Organik Menjadi ${(annualOrganicKg * 0.35).toFixed(0)} kg Humus Subur`,
      detail:
        'Mulai susun lapisan hijau (sisa dapur) dan lapisan coklat (daun kering/kardus tanpa tinta) di dalam komposter balkon untuk mencegah pembentukan gas metana.',
    },
  ];

  const handleCopyBlueprint = () => {
    const summaryText = [
      'CETAK BIRU AUDIT SAMPAH RUMAH TANGGA — LINGKAR LESTARI',
      `Potensi Reduksi Beban TPA: ${totalDivertedWeightKg.toFixed(1)} kg / tahun`,
      `Pencegahan Emisi Gas Rumah Kaca: ${annualCarbonSavedKg.toFixed(1)} kg CO2e / tahun`,
      `Estimasi Penghematan Belanja: Rp ${Math.round(annualRupiahSaved).toLocaleString('id-ID')} / tahun`,
      `Eliminasi Kemasan: ${annualBottles} botol PET, ${annualSachets} sachet multilayer, ${annualTakeaway} wadah takeaway.`,
    ].join('\n');

    navigator.clipboard?.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setFormError('Mohon masukkan nama lengkap Anda (minimal 2 karakter).');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Mohon masukkan alamat surel (email) yang valid.');
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <section
      id="kalkulator-jejak"
      aria-labelledby="heading-kalkulator"
      className="border-t border-stone-300/80 bg-[#F4F0E8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span>Instrumen Diagnostik Mandiri</span>
              <span aria-hidden="true">·</span>
              <span>Metodologi Neraca Massa Rumah Tangga</span>
            </div>
            <h2
              id="heading-kalkulator"
              className="mt-3 font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900"
            >
              Kalkulator Audit Residu & Cetak Biru Transisi 30 Hari
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm leading-relaxed text-stone-700">
              Sesuaikan parameter konsumsi mingguan di bawah ini untuk memetakan dampak nyata pengurangan sampah dari hulu.
            </p>
          </div>
        </div>

        {/* Preset Household Switcher (Segmented Interactive Filter) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-stone-300/80 py-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-200/80 p-1 rounded-lg">
            {PRESET_PROFILES.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => applyPreset(profile)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-editorial ${
                  activeProfile === profile.id
                    ? 'bg-[#1C1917] text-[#FBF9F5] shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {profile.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 whitespace-nowrap shrink-0 transition-editorial"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Atur Ulang ke Standar</span>
          </button>
        </div>

        {/* Main Calculator Split: Left Sliders (5 cols) | Right Live Output & 30-Day Plan (7 cols) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Parameter Controls */}
          <div className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8 lg:col-span-5">
            <h3 className="font-serif-display text-xl font-semibold text-stone-900">
              Parameter Timbulan Mingguan
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
              Geser indikator sesuai estimasi penggunaan di rumah Anda dalam 7 hari terakhir.
            </p>

            <div className="mt-7 space-y-6">
              {/* Control 1: Botol Plastik */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor="slider-bottles"
                    className="text-sm font-medium text-stone-900"
                  >
                    Botol Minuman Plastik (PET)
                  </label>
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D]">
                    {bottlesPerWeek} botol / minggu
                  </span>
                </div>
                <input
                  id="slider-bottles"
                  type="range"
                  min={0}
                  max={45}
                  step={1}
                  value={bottlesPerWeek}
                  onChange={(e) => {
                    setActiveProfile('custom');
                    setBottlesPerWeek(Number(e.target.value));
                  }}
                  className="mt-2.5 h-2 w-full cursor-pointer appearance-none bg-stone-300 accent-[#14532D]"
                />
                <div className="mt-1 flex justify-between font-mono-tabular text-[11px] text-stone-500">
                  <span>0 botol</span>
                  <span>Setara {annualBottles} botol / tahun</span>
                </div>
              </div>

              {/* Control 2: Kemasan Sachet */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor="slider-sachets"
                    className="text-sm font-medium text-stone-900"
                  >
                    Kemasan Sachet & Plastik Fleksibel
                  </label>
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D]">
                    {sachetsPerWeek} lembar / minggu
                  </span>
                </div>
                <input
                  id="slider-sachets"
                  type="range"
                  min={0}
                  max={70}
                  step={1}
                  value={sachetsPerWeek}
                  onChange={(e) => {
                    setActiveProfile('custom');
                    setSachetsPerWeek(Number(e.target.value));
                  }}
                  className="mt-2.5 h-2 w-full cursor-pointer appearance-none bg-stone-300 accent-[#14532D]"
                />
                <div className="mt-1 flex justify-between font-mono-tabular text-[11px] text-stone-500">
                  <span>0 sachet</span>
                  <span>Setara {annualSachets} sachet / tahun</span>
                </div>
              </div>

              {/* Control 3: Sisa Organik Dapur */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor="slider-organic"
                    className="text-sm font-medium text-stone-900"
                  >
                    Sisa Pangan & Organik Dapur Basah
                  </label>
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D]">
                    {organicKgPerWeek.toFixed(1)} kg / minggu
                  </span>
                </div>
                <input
                  id="slider-organic"
                  type="range"
                  min={0.5}
                  max={25}
                  step={0.5}
                  value={organicKgPerWeek}
                  onChange={(e) => {
                    setActiveProfile('custom');
                    setOrganicKgPerWeek(Number(e.target.value));
                  }}
                  className="mt-2.5 h-2 w-full cursor-pointer appearance-none bg-stone-300 accent-[#14532D]"
                />
                <div className="mt-1 flex justify-between font-mono-tabular text-[11px] text-stone-500">
                  <span>0,5 kg</span>
                  <span>Setara {annualOrganicKg.toFixed(0)} kg / tahun</span>
                </div>
              </div>

              {/* Control 4: Wadah Makanan / Kopi Bawa Pulang */}
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor="slider-takeaway"
                    className="text-sm font-medium text-stone-900"
                  >
                    Gelas Kopi & Kotak Makan Bawa Pulang
                  </label>
                  <span className="font-mono-tabular text-sm font-semibold text-[#14532D]">
                    {takeawayPerWeek} wadah / minggu
                  </span>
                </div>
                <input
                  id="slider-takeaway"
                  type="range"
                  min={0}
                  max={35}
                  step={1}
                  value={takeawayPerWeek}
                  onChange={(e) => {
                    setActiveProfile('custom');
                    setTakeawayPerWeek(Number(e.target.value));
                  }}
                  className="mt-2.5 h-2 w-full cursor-pointer appearance-none bg-stone-300 accent-[#14532D]"
                />
                <div className="mt-1 flex justify-between font-mono-tabular text-[11px] text-stone-500">
                  <span>0 wadah</span>
                  <span>Setara {annualTakeaway} wadah / tahun</span>
                </div>
              </div>
            </div>

            {/* Summary Callout Box */}
            <div className="mt-8 border-t border-stone-200 pt-5 text-xs leading-relaxed text-stone-600">
              Perhitungan mengacu pada koefisien konversi massa rata-rata kemasan ritel Indonesia dan faktor emisi metana TPA tropis (IPCC Waste Model).
            </div>
          </div>

          {/* Right Column: Live Impact Readout & 30-Day Interactive Checklist */}
          <div className="space-y-8 lg:col-span-7">
            {/* 3 Quantitative Proof Cards */}
            <div
              aria-live="polite"
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div className="border border-stone-300 bg-[#FBF9F5] p-5">
                <div className="text-xs text-stone-600">
                  Reduksi Beban Angkut TPA
                </div>
                <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#14532D]">
                  {totalDivertedWeightKg.toFixed(0)} kg
                </div>
                <div className="mt-1 text-xs text-stone-600">
                  Residu teralihkan per tahun
                </div>
              </div>

              <div className="border border-stone-300 bg-[#FBF9F5] p-5">
                <div className="text-xs text-stone-600">
                  Pencegahan Emisi Karbon
                </div>
                <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-semibold text-stone-900">
                  {annualCarbonSavedKg.toFixed(0)} kg
                </div>
                <div className="mt-1 text-xs text-stone-600">
                  Setara CO₂e metana & plastik / thn
                </div>
              </div>

              <div className="border border-stone-300 bg-[#FBF9F5] p-5">
                <div className="text-xs text-stone-600">
                  Efisiensi Ekonomi Rumah
                </div>
                <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#9A3412]">
                  Rp {(annualRupiahSaved / 1000000).toFixed(1)} Jt
                </div>
                <div className="mt-1 text-xs text-stone-600">
                  Penghematan curah & guna ulang / thn
                </div>
              </div>
            </div>

            {/* Interactive 4-Week Transition Protocol */}
            <div className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-serif-display text-xl font-semibold text-stone-900">
                    Rencana Transisi 4 Minggu Berdasarkan Profil Anda
                  </h3>
                  <p className="mt-1 text-xs text-stone-600">
                    Tandai langkah yang sudah mulai diterapkan di rumah Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBlueprint}
                  className="inline-flex items-center gap-2 border border-stone-300 bg-white px-3.5 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 whitespace-nowrap shrink-0 transition-editorial"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#14532D]" aria-hidden="true" />
                      <span>Tersalin ke Papan Klip</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Salin Ringkasan Audit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-5 divide-y divide-stone-200">
                {transitionRoadmap.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <div key={step.id} className="py-4 first:pt-1 last:pb-1">
                      <label className="flex cursor-pointer items-start gap-3.5 select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            setCheckedSteps((prev) => ({
                              ...prev,
                              [step.id]: !prev[step.id],
                            }))
                          }
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#14532D]"
                        />
                        <div className="flex-1">
                          <div className="font-mono-tabular text-xs font-medium text-[#14532D]">
                            {step.week}
                          </div>
                          <div
                            className={`mt-0.5 text-sm font-semibold transition-colors ${
                              isChecked
                                ? 'line-through text-stone-400'
                                : 'text-stone-900'
                            }`}
                          >
                            {step.title}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-stone-600">
                            {step.detail}
                          </p>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Community Workshop & Open Monograph Lead Capture Form */}
        <div
          id="unduh-panduan"
          className="mt-14 border border-stone-300 bg-[#FBF9F5] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="text-xs text-stone-600">
                Jaringan Praktisi & Lokakarya Warga
              </div>
              <h3 className="mt-2 font-serif-display text-2xl font-semibold text-stone-900">
                Terima Modul PDF Lengkap & Jadwal Kelas Kompos Lokal
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-stone-700">
                Kami mengirimkan satu buletin riset setiap bulan berisi peta toko curah terbaru, direktori bank sampah aktif, serta panduan meracik pembersih alami rumah tangga.
              </p>
            </div>

            <div className="lg:col-span-7">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="input-fullname"
                        className="block text-xs font-medium text-stone-700"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="input-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Mis. Nadia Pramesti"
                        className="mt-1.5 w-full border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#14532D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="input-email"
                        className="block text-xs font-medium text-stone-700"
                      >
                        Alamat Surel (Email)
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@domain.id"
                        className="mt-1.5 w-full border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#14532D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="select-city"
                        className="block text-xs font-medium text-stone-700"
                      >
                        Domisili Kota / Wilayah
                      </label>
                      <select
                        id="select-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1.5 w-full border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#14532D] focus:outline-none"
                      >
                        <option value="Jakarta">DKI Jakarta & Sekitarnya</option>
                        <option value="Bandung">Bandung Raya</option>
                        <option value="Yogyakarta">Yogyakarta & Solo</option>
                        <option value="Surabaya">Surabaya & Malang</option>
                        <option value="Bali">Denpasar & Bali</option>
                        <option value="Lainnya">Kota Lainnya di Indonesia</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="select-track"
                        className="block text-xs font-medium text-stone-700"
                      >
                        Fokus Modul Praktik Utama
                      </label>
                      <select
                        id="select-track"
                        value={focusTrack}
                        onChange={(e) => setFocusTrack(e.target.value)}
                        className="mt-1.5 w-full border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#14532D] focus:outline-none"
                      >
                        <option value="Kompos Balkon & Dapur">
                          Kompos Balkon & Pengolahan Organik
                        </option>
                        <option value="Belanja Curah & Dapur Minim Plastik">
                          Belanja Curah & Dapur Minim Plastik
                        </option>
                        <option value="Pembersih Alami & Ekologi Air">
                          Pembersih Alami & Ekologi Air Rumah
                        </option>
                        <option value="Kurikulum Komunitas RT/RW">
                          Inisiasi Bank Sampah & Komunitas RT/RW
                        </option>
                      </select>
                    </div>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[#9A3412]">
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-stone-500">
                      Bebas spam · Dapat berhenti berlangganan kapan saja.
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#14532D] px-6 py-3 text-xs font-medium text-[#FBF9F5] hover:bg-[#0F3F22] whitespace-nowrap shrink-0 transition-editorial"
                    >
                      <span>Kirim Modul & Jadwal Lokakarya</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  role="status"
                  className="border border-[#14532D]/30 bg-[#14532D]/5 p-6 text-stone-900"
                >
                  <div className="font-mono-tabular text-xs font-semibold text-[#14532D]">
                    PENDAFTARAN TERKONFIRMASI · EDISI OKTOBER 2026
                  </div>
                  <h4 className="mt-1 font-serif-display text-xl font-semibold">
                    Terima kasih, {fullName}.
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    Salinan monograf <strong>{focusTrack}</strong> serta direktori stasiun isi ulang wilayah <strong>{city}</strong> telah dikirimkan ke <strong>{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFullName('');
                      setEmail('');
                    }}
                    className="mt-4 text-xs font-medium text-[#14532D] underline underline-offset-4 hover:text-stone-900"
                  >
                    Daftarkan alamat surel lain
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
