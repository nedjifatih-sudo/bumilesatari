export interface HierarchyStep {
  id: string;
  order: string;
  term: string;
  indonesianTitle: string;
  subtitle: string;
  diversionPotential: string;
  leadEssay: string;
  secondParagraph: string;
  marginNote: {
    figureCode: string;
    citation: string;
    metricLabel: string;
    metricValue: string;
  };
  roomProtocols: {
    room: 'dapur' | 'mandi' | 'belanja';
    roomLabel: string;
    habitToReplace: string;
    circularPractice: string;
    annualImpact: string;
    difficulty: string;
  }[];
}

export interface FeaturedProject {
  id: string;
  index: string;
  tier: 'lead' | 'secondary' | 'archive';
  title: string;
  location: string;
  timeframe: string;
  readTime: string;
  category: string;
  primaryMetric: string;
  primaryMetricContext: string;
  secondaryMetric: string;
  image?: string;
  imageAlt?: string;
  aspectRatio?: '16:9' | '4:3';
  figureCaption?: string;
  summary: string;
  challenge: string;
  methodology: string[];
  outcomes: {
    label: string;
    before: string;
    after: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export interface MaterialSpecimen {
  id: string;
  accessionCode: string;
  figureNumber: string;
  category: 'kemasan' | 'dapur' | 'perawatan' | 'tekstil';
  categoryLabel: string;
  linearItem: string;
  linearDecomposition: string;
  linearDecompositionYears: number;
  circularReplacement: string;
  circularMaterial: string;
  circularLifespan: string;
  circularEndOfLife: string;
  carbonDelta: string;
  curatorialNote: string;
}

export const HERO_METRICS = [
  {
    value: '60,4%',
    unit: 'Komposisi Organik',
    context: 'Proporsi sisa pangan & biomassa dalam timbulan sampah rumah tangga nasional (SIPSN KLHK)',
  },
  {
    value: '0,68 kg',
    unit: 'Timbulan / Kapita / Hari',
    context: 'Rata-rata residu harian penduduk perkotaan sebelum intervensi pemilahan dari sumber',
  },
  {
    value: '-74%',
    unit: 'Reduksi Residu TPA',
    context: 'Penurunan beban angkut ke TPA dalam 90 hari melalui kombinasi kompos rumah & curah isi ulang',
  },
  {
    value: '42 Modul',
    unit: 'Kurikulum Terbuka',
    context: 'Panduan praktis berbasis siklus hidup material (Life Cycle Assessment) untuk rumah tangga',
  },
];

export const FIVE_R_HIERARCHY: HierarchyStep[] = [
  {
    id: 'refuse',
    order: '01',
    term: 'Refuse',
    indonesianTitle: '01. Menolak Kemasan Sekali Pakai dari Hulu',
    subtitle: 'Pencegahan masuknya material berlapis (multilayer sachet) dan plastik sekali pakai ke dalam rumah.',
    diversionPotential: 'Mencegah 35% sampah anorganik residu',
    leadEssay:
      'Kemandirian ekologis dimulai sebelum barang melewati ambang pintu rumah. Dalam arsitektur pengelolaan limbah modern, menolak (Refuse) berada di puncak piramida karena mengeliminasi kebutuhan energi pengumpulan, pencucian, hingga daur ulang hilir yang sering kali mengalami penurunan mutu material (downcycling).',
    secondParagraph:
      'Di Indonesia, tantangan terbesar rumah tangga bukanlah botol PET bening yang memiliki nilai jual di bank sampah, melainkan kemasan fleksibel berlapis aluminium-plastik (sachet), sedotan, alat makan polistirena, dan kantong kresek tipis yang tidak ekonomis untuk dipulihkan.',
    marginNote: {
      figureCode: 'CATATAN ARSIP 01.A',
      citation: 'Kajian Siklus Kemasan Fleksibel Rumah Tangga Perkotaan, 2026.',
      metricLabel: 'Eliminasi Sachet / KK',
      metricValue: '480 lembar / tahun',
    },
    roomProtocols: [
      {
        room: 'dapur',
        roomLabel: 'Dapur & Pangan',
        habitToReplace: 'Membeli bumbu instan dan kecap dalam rentengan sachet plastik berlapis.',
        circularPractice: 'Beralih ke rempah utuh pasar tradisional dengan toples kaca kedap udara.',
        annualImpact: '-210 kemasan multilayer / tahun',
        difficulty: 'Mudah · Tanpa biaya tambahan',
      },
      {
        room: 'mandi',
        roomLabel: 'Kamar Mandi & Perawatan',
        habitToReplace: 'Menerima amenity kit hotel (sikat gigi plastik & botol sampo mini 30 ml).',
        circularPractice: 'Membawa sikat gigi bambu dan sabun padat dalam kotak logam perjalanan.',
        annualImpact: '-36 botol & kemasan mini / tahun',
        difficulty: 'Mudah · Kebiasaan perjalanan',
      },
      {
        room: 'belanja',
        roomLabel: 'Belanja & Mobilitas',
        habitToReplace: 'Menerima struk kertas termal berlapis BPA dan kantong plastik ganda.',
        circularPractice: 'Meminta bukti bayar digital dan menyiapkan tas lipat katun di saku kendaraan.',
        annualImpact: '-185 kantong kresek / tahun',
        difficulty: 'Sangat Mudah · Instan',
      },
    ],
  },
  {
    id: 'reduce',
    order: '02',
    term: 'Reduce',
    indonesianTitle: '02. Mengurangi Volume & Kompleksitas Konsumsi',
    subtitle: 'Menyederhanakan inventaris bahan kimia rumah tangga dan merencanakan stok pangan secara presisi.',
    diversionPotential: 'Menurunkan 28% jejak karbon produk rumah',
    leadEssay:
      'Mengurangi (Reduce) bukan sekadar berhemat, melainkan kurasi sadar atas apa yang benar-benar dibutuhkan untuk menopang hidup yang sehat. Sebagian besar rumah tangga menyimpan lebih dari dua belas jenis cairan pembersih sintetis dalam botol plastik berbeda, padahal secara kimiawi fungsinya tumpang tindih.',
    secondParagraph:
      'Dengan menyusun daftar belanja mingguan berbasis menu terukur dan beralih ke bahan pembersih serbaguna konsentrasi tinggi (seperti asam sitrat, soda kue, dan sabun castile nabati), volume pembelian kemasan dan pemborosan bahan makanan segar di kulkas turun secara drastis.',
    marginNote: {
      figureCode: 'CATATAN ARSIP 02.B',
      citation: 'Audit Pangan Terbuang (Food Loss & Waste) Bappenas, 2025–2026.',
      metricLabel: 'Penghematan Pangan',
      metricValue: 'Rp 2,8 Juta / KK / thn',
    },
    roomProtocols: [
      {
        room: 'dapur',
        roomLabel: 'Dapur & Pangan',
        habitToReplace: 'Belanja bahan segar impulsif tanpa perencanaan menu yang berujung busuk di kulkas.',
        circularPractice: 'Menerapkan rotasi FIFO (First In, First Out) dan menyiapkan kaldu dari potongan pangkal sayur.',
        annualImpact: '-46 kg sisa pangan layak makan / tahun',
        difficulty: 'Menengah · Disiplin mingguan',
      },
      {
        room: 'mandi',
        roomLabel: 'Kamar Mandi & Perawatan',
        habitToReplace: 'Menggunakan 7 produk pembersih lantai, kaca, dan keramik dalam botol terpisah.',
        circularPractice: 'Mereduksi menjadi 2 formula dasar: sabun castile cair dan larutan asam sitrat.',
        annualImpact: '-18 botol HDPE tebal / tahun',
        difficulty: 'Mudah · Hemat ruang simpan',
      },
      {
        room: 'belanja',
        roomLabel: 'Belanja & Mobilitas',
        habitToReplace: 'Membeli pakaian fast-fashion berbahan poliester sintetis setiap pergantian tren.',
        circularPractice: 'Membangun kapsul lemari pakaian dari serat selulosa alami (katun, linen, tencel) berdaya tahan tinggi.',
        annualImpact: '-14 kg limbah tekstil sintetis / 3 tahun',
        difficulty: 'Menengah · Kurasi jangka panjang',
      },
    ],
  },
  {
    id: 'reuse',
    order: '03',
    term: 'Reuse',
    indonesianTitle: '03. Memperpanjang Umur Pakai dengan Material Tangguh',
    subtitle: 'Mengganti produk sekali buang dengan artefak fungsional dari kaca, baja tahan karat, dan tekstil tenun.',
    diversionPotential: 'Menggantikan 600+ wadah sekali pakai / tahun',
    leadEssay:
      'Prinsip guna ulang (Reuse) mengembalikan penghormatan kita terhadap ketahanan benda sehari-hari. Sebuah wadah makanan berbahan baja tahan karat 304 atau botol kaca borosilikat memiliki titik impas ekologis (environmental break-even point) hanya setelah 18 hingga 25 kali pemakaian dibandingkan wadah polipropilena tipis.',
    secondParagraph:
      'Ekosistem guna ulang juga menghidupkan kembali ekonomi reparasi lokal—mulai dari penjahit keliling, tukang sol sepatu, hingga stasiun pengisian ulang kebutuhan pokok yang memungkinkan warga membeli minyak goreng, beras, dan deterjen menggunakan wadah milik sendiri.',
    marginNote: {
      figureCode: 'CATATAN ARSIP 03.C',
      citation: 'Analisis Titik Impas Siklus Hidup Wadah Guna Ulang, ITB Press.',
      metricLabel: 'Titik Impas Wadah Baja',
      metricValue: '22 kali pemakaian',
    },
    roomProtocols: [
      {
        room: 'dapur',
        roomLabel: 'Dapur & Pangan',
        habitToReplace: 'Membungkus sisa potongan buah atau mangkuk dengan plastik cling wrap sekali pakai.',
        circularPractice: 'Menggunakan kain pembungkus lilin lebah (beeswax wrap) yang dapat dicuci hingga 150 kali.',
        annualImpact: '-4 gulung plastik wrap (120 meter) / tahun',
        difficulty: 'Mudah · Perawatan air dingin',
      },
      {
        room: 'mandi',
        roomLabel: 'Kamar Mandi & Perawatan',
        habitToReplace: 'Membuang pisau cukur plastik dan kapas wajah sekali pakai setiap hari.',
        circularPractice: 'Beralih ke pisau cukur safety razor logam seumur hidup dan kapas kain bambu cuci-ulang.',
        annualImpact: '-365 kapas & -24 cukur plastik / tahun',
        difficulty: 'Mudah · Investasi satu kali',
      },
      {
        room: 'belanja',
        roomLabel: 'Belanja & Mobilitas',
        habitToReplace: 'Membeli kopi es dan makan siang dengan gelas plastik PP serta kotak styrofoam.',
        circularPractice: 'Membawa tumbler insulasi vakum dan rantang tingkat stainless saat memesan makanan.',
        annualImpact: '-240 gelas & wadah takeaway / tahun',
        difficulty: 'Mudah · Kebiasaan harian',
      },
    ],
  },
  {
    id: 'recycle',
    order: '04',
    term: 'Recycle',
    indonesianTitle: '04. Memilah Material Anorganik Bersih dan Kering',
    subtitle: 'Menjaga kemurnian kaca, aluminium, kertas karton, dan polimer tunggal agar layak masuk sirkuit daur ulang.',
    diversionPotential: 'Memulihkan 90% nilai ekonomi anorganik',
    leadEssay:
      'Daur ulang (Recycle) baru dapat berfungsi apabila material dipilah dalam keadaan bersih dan kering sejak dari dapur rumah tangga. Kontaminasi sisa makanan berminyak pada kardus atau botol plastik menyebabkan hingga 65% material yang sebenarnya dapat didaur ulang berakhir ditolak oleh fasilitas pemulihan material (MRF).',
    secondParagraph:
      'Fokuskan pemilahan pada empat fraksi bernilai pemulihan tertinggi: kaleng aluminium (yang dapat didaur ulang tanpa batas kualitas), botol kaca, kertas/kardus bebas minyak, serta plastik polimer tunggal berkode 1 (PET) dan 2 (HDPE) untuk disalurkan ke Bank Sampah unit RW atau pelapak lokal.',
    marginNote: {
      figureCode: 'CATATAN ARSIP 04.D',
      citation: 'Pedoman Standar Kualitas Bahan Baku Daur Ulang ADUPI, 2026.',
      metricLabel: 'Efisiensi Energi Aluminium',
      metricValue: '-95% vs bijih bauksit',
    },
    roomProtocols: [
      {
        room: 'dapur',
        roomLabel: 'Dapur & Pangan',
        habitToReplace: 'Mencampur botol kecap, kaleng sarden, dan sisa nasi basah dalam satu tempat sampah.',
        circularPractice: 'Membilas cepat botol dan kaleng dengan air bekas cucian beras, mengeringkan, lalu memisahkan.',
        annualImpact: '+42 kg material bersih terselamatkan / tahun',
        difficulty: 'Mudah · Butuh 2 keranjang pilah',
      },
      {
        room: 'mandi',
        roomLabel: 'Kamar Mandi & Perawatan',
        habitToReplace: 'Membuang botol sampo HDPE lengkap dengan pompa pegas logam yang menyulitkan pencacahan.',
        circularPractice: 'Melepas tutup pompa untuk digunakan kembali, membilas botol HDPE, dan menyetorkannya ke Bank Sampah.',
        annualImpact: '100% polimer HDPE murni terdaur ulang',
        difficulty: 'Mudah · 1 menit per bulan',
      },
      {
        room: 'belanja',
        roomLabel: 'Belanja & Mobilitas',
        habitToReplace: 'Membiarkan kardus paket belanja daring menumpuk basah terkena hujan di teras.',
        circularPractice: 'Melepas lakban plastik, melipat rata kardus bergelombang (corrugated), dan mengikatnya per bulan.',
        annualImpact: '+28 kg serat selulosa kertas pulih / tahun',
        difficulty: 'Sangat Mudah · Rutinitas bulanan',
      },
    ],
  },
  {
    id: 'rot',
    order: '05',
    term: 'Rot',
    indonesianTitle: '05. Mengomposkan Sisa Organik Kembali ke Tanah',
    subtitle: 'Menutup siklus biologis di rumah untuk mencegah emisi gas metana (CH₄) di tempat pemrosesan akhir.',
    diversionPotential: 'Mengolah 100% fraksi organik dapur di sumber',
    leadEssay:
      'Mengomposkan (Rot) adalah intervensi iklim paling berdampak yang dapat dilakukan setiap rumah tangga di Indonesia. Ketika sisa sayur, kulit buah, dan nasi terkubur secara anaerobik (tanpa oksigen) di bawah tumpukan plastik di TPA, bakteri menghasilkan gas metana (CH₄) yang memiliki potensi pemanasan global 28 kali lebih kuat dibandingkan karbon dioksida.',
    secondParagraph:
      'Baik Anda tinggal di rumah tapak dengan halaman maupun apartemen berlantai tinggi, teknologi pengomposan tropis—mulai dari pot terakota bertingkat, ember Bokashi fermentasi anaerob, hingga biopori dan budidaya maggot BSF—memungkinkan pengolahan organik tanpa bau dan menghasilkan humus subur dalam 30 hingga 45 hari.',
    marginNote: {
      figureCode: 'CATATAN ARSIP 05.E',
      citation: 'Inventarisasi Gas Rumah Kaca Sektor Limbah Tropis, 2026.',
      metricLabel: 'Cegah Emisi Metana',
      metricValue: '310 kg CO₂e / KK / thn',
    },
    roomProtocols: [
      {
        room: 'dapur',
        roomLabel: 'Dapur & Pangan',
        habitToReplace: 'Membuang kulit buah, ampas kopi, dan potongan sayur ke kantong plastik sampah harian.',
        circularPractice: 'Menampung sisa organik di wadah kompos meja kedap udara untuk dimasukkan ke komposter terakota.',
        annualImpact: '-195 kg sampah basah ke TPA / tahun',
        difficulty: 'Menengah · 5 menit per hari',
      },
      {
        room: 'mandi',
        roomLabel: 'Kamar Mandi & Perawatan',
        habitToReplace: 'Membuang sikat gigi bambu aus, spons oyong (loofah) tua, dan potongan rambut ke tempat sampah.',
        circularPractice: 'Mencabut bulu sikat atau memotong tipis spons oyong alami untuk dikomposkan bersama daun kering.',
        annualImpact: 'Siklus 100% kembali menjadi tanah',
        difficulty: 'Mudah · Setiap 3 bulan',
      },
      {
        room: 'belanja',
        roomLabel: 'Belanja & Mobilitas',
        habitToReplace: 'Membuang bungkus daun pisang, kulit jagung, dan tangkai singkong ke tong sampah jalanan.',
        circularPractice: 'Memotong kecil bungkus daun tradisional sebagai lapisan coklat-hijau penyimpan kelembapan kompos.',
        annualImpact: '+35 kg humus subur untuk tanaman balkon',
        difficulty: 'Mudah · Kebiasaan organik',
      },
    ],
  },
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'stasiun-curah-nusantara',
    index: '01',
    tier: 'lead',
    title: '01. Koperasi Stasiun Isi Ulang & Distribusi Curah Sirkular',
    location: 'Jakarta Selatan & Bandung',
    timeframe: 'Studi Longitudinal 18 Bulan (2025–2026)',
    readTime: '7 mnt baca',
    category: 'Infrastruktur Guna Ulang',
    primaryMetric: '-78% Kemasan Sachet & Botol',
    primaryMetricContext: 'Reduksi limbah kemasan rumah tangga pada 1.240 keluarga anggota koperasi dalam 6 bulan pertama',
    secondaryMetric: '18.400 Liter Produk Tersalurkan Tanpa Botol Baru',
    image: '/images/project-bulk-refill.svg',
    imageAlt: 'Dokumentasi interior stasiun isi ulang kebutuhan pokok curah dengan tabung kaca gravitasi dan timbangan digital tare',
    aspectRatio: '16:9',
    figureCaption: 'Fig. 01 — Sistem dispenser gravitasi kaca borosilikat dan timbangan tare otomatis di Koperasi Curah Cipete.',
    summary:
      'Mengintegrasikan rantai pasok petani beras organik Cianjur, produsen sabun nabati lokal, dan warung RW melalui sistem jeriken kembalian (closed-loop kegs) 25 liter sehingga warga dapat membeli kebutuhan pokok mulai dari 100 gram menggunakan wadah rumah sendiri.',
    challenge:
      'Harga produk ramah lingkungan sering kali 30–40% lebih mahal akibat rantai distribusi ritel modern dan biaya kemasan satuan. Sementara itu, warung pemukiman bergantung pada kemasan sachet karena daya beli harian warga.',
    methodology: [
      'Menghapus biaya kemasan ritel melalui pengadaan langsung dalam drum stainless & jeriken HDPE 25L yang disterilisasi ulang di pusat pencucian.',
      'Menerapkan sistem timbangan digital dengan fitur Tare QR: warga menimbang toples kosong satu kali, menempelkan stiker berat tara, dan membayar murni berat bersih isi.',
      'Menyediakan rak peminjaman toples kaca komunitas (Deposit Jar Library) yang telah disterilisasi uap panas bagi warga yang lupa membawa wadah.',
    ],
    outcomes: [
      {
        label: 'Limbah Kemasan per KK / Bulan',
        before: '64 lembar sachet & 6 botol HDPE',
        after: '11 lembar residu (-78% reduksi terukur)',
      },
      {
        label: 'Harga Pokok Beras & Sabun Curah',
        before: '100% harga ritel kemasan',
        after: '14% lebih hemat per kilogram bersih',
      },
      {
        label: 'Tingkat Pengembalian Jeriken Pemasok',
        before: 'Sekali pakai / jual rongsok',
        after: '99,2% berputar hingga 80 siklus',
      },
    ],
    testimonial: {
      quote:
        'Sebelum ada sistem timbangan tara di RW kami, keluarga saya membuang dua kantong besar plastik kemasan minyak, sabun cuci piring, dan bumbu setiap bulan. Sekarang kami cukup membawa empat botol kaca yang sama sejak tahun lalu dan pengeluaran belanja bulanan justru turun Rp 185.000.',
      author: 'Ratna Dewi Kartika',
      role: 'Koordinator Pokja Lingkungan RW 06',
      organization: 'Komunitas Lingkar Cipete, Jakarta Selatan',
    },
  },
  {
    id: 'kompos-terakota-balkon',
    index: '02',
    tier: 'secondary',
    title: '02. Biokonversi Organik Balkon dengan Komposter Terakota Modular',
    location: 'Surabaya & Sidoarjo',
    timeframe: 'Program Percontohan 650 Hunian Vertikal',
    readTime: '5 mnt baca',
    category: 'Siklus Biologis Perkotaan',
    primaryMetric: '-62% Beban Angkut TPA',
    primaryMetricContext: 'Pengurangan berat basah timbulan sampah rumah tangga dalam 45 hari siklus panen pertama',
    secondaryMetric: '112 Ton Sampah Dapur Terolah di Sumber / Tahun',
    image: '/images/project-urban-compost.svg',
    imageAlt: 'Diagram potongan komposter terakota tiga tingkat untuk pengolahan sisa dapur di balkon apartemen',
    aspectRatio: '4:3',
    figureCaption: 'Fig. 02 — Anatomi bejana terakota tiga tingkat dengan keran panen pupuk cair lindi aerobik.',
    summary:
      'Merancang bejana kompos tanah liat berpori (breathable terracotta) bersama pengrajin gerabah Kasongan dan Karangpilang yang menjaga sirkulasi oksigen mikroba tetap stabil di iklim tropis lembap tanpa menimbulkan bau asam maupun lalat buah.',
    challenge:
      'Penghuni apartemen dan rumah berlahan sempit enggan mengompos karena ember plastik tertutup sering mengalami pembusukan anaerobik yang berbau menyengat dan menghasilkan belatung.',
    methodology: [
      'Memanfaatkan porositas alami dinding tanah liat bakar suhu rendah untuk mengatur kelembapan ideal (55–60%) secara pasif.',
      'Menyusun rasio 1 bagian sisa sayur hijau dengan 1,5 bagian seresah daun kering kota atau cacahan kardus telur.',
      'Mengintegrasikan saringan keran kuningan di dasar modul ketiga untuk memanen pupuk organik cair setiap 14 hari.',
    ],
    outcomes: [
      {
        label: 'Berat Sampah Harian ke Tempat Sampah',
        before: '1,95 kg / KK / hari',
        after: '0,74 kg / KK / hari (-62%)',
      },
      {
        label: 'Durasi Pematangan Kompos Tropis',
        before: '90–120 hari (tumpukan konvensional)',
        after: '38–45 hari siap semai',
      },
    ],
    testimonial: {
      quote:
        'Di balkon apartemen ukuran 2x1 meter, pot terakota bertingkat ini tampak seperti pot tanaman biasa. Tidak ada bau sama sekali, dan setiap enam minggu saya memanen tanah humus hitam untuk kebun cabai dan kemangi dapur.',
      author: 'Ir. Hendra Wijaya, M.T.',
      role: 'Peneliti Ekologi Permukiman',
      organization: 'Konsorsium Kota Sirkular Surabaya',
    },
  },
  {
    id: 'tekstil-sirkular-pasar',
    index: '03',
    tier: 'secondary',
    title: '03. Substitusi Kantong Kresek Pasar dengan Serat Nabati & Lilin Lebah',
    location: 'Yogyakarta & Sleman',
    timeframe: 'Kolaborasi 8 Pasar Tradisional & 140 Pedagang',
    readTime: '6 mnt baca',
    category: 'Desain Material Nabati',
    primaryMetric: '31.500 Kresek Dicegah / Bulan',
    primaryMetricContext: 'Substitusi terukur di Pasar Kranggan dan Pasar Sentul melalui kantong jaring katun tara ringan',
    secondaryMetric: '100% Serat Biodegradable Tanpa Mikroplastik',
    image: '/images/project-circular-textiles.svg',
    imageAlt: 'Studi material kantong katun organik pewarna indigo alami, pembungkus lilin lebah, dan anyaman pandan',
    aspectRatio: '4:3',
    figureCaption: 'Fig. 03 — Kantong katun organik 18 gram dan lembar katun berlapis lilin lebah hutan (Apis dorsata).',
    summary:
      'Menggantikan plastik kresek sekali pakai dan lembaran plastik pembungkus basah dengan kantong jaring katun mentah (unbleached cotton) bertuliskan berat tara resmi serta kain pembungkus lilin lebah untuk tempe, tahu, dan rempah segar.',
    challenge:
      'Pedagang pasar tradisional enggan menimbang barang di dalam wadah kain pembeli karena khawatir berat kain mengurangi takaran, sementara pembeli kesulitan membawa wadah kaku yang berat.',
    methodology: [
      'Menstandarkan kantong katun organik dengan berat presisi 18 gram dan 30 gram yang dicetak langsung pada label kain untuk memudahkan pedagang mengurangi tara.',
      'Melatih kelompok ibu pengrajin Sleman memproduksi beeswax wrap menggunakan lilin lebah hutan lokal, damar pinus, dan minyak kelapa.',
      'Memberikan insentif potongan Rp 500–Rp 1.000 per transaksi bagi pembeli yang membawa set kantong pasar sirkular.',
    ],
    outcomes: [
      {
        label: 'Konsumsi Kantong Kresek per Pedagang Sayur',
        before: '120–150 lembar / hari',
        after: '38 lembar / hari (-71% dalam 4 bulan)',
      },
      {
        label: 'Daya Tahan Pakai Kantong Katun Tenun',
        before: '1 kali pakai (kantong HDPE tipis)',
        after: '400+ siklus cuci dan belanja',
      },
    ],
  },
  {
    id: 'audit-mikroplastik-deterjen',
    index: '04',
    tier: 'archive',
    title: '04. Formulasi Deterjen Biji Lerak & Reduksi Fosfat Air Limbah Domestik',
    location: 'DAS Citarum & Bogor',
    timeframe: 'Riset Laboratorium & Uji Komunitas 2026',
    readTime: '4 mnt baca',
    category: 'Ekologi Air & Kimia Hijau',
    primaryMetric: '-89% Beban Surfaktan Sintetis',
    primaryMetricContext: 'Penurunan kadar residu kimia pada air buangan cucian rumah tangga (greywater)',
    secondaryMetric: 'Aman untuk Siram Tanaman Kebun',
    summary:
      'Pemanfaatan saponin alami dari buah lerak (Sapindus rarak) yang dikombinasikan dengan natrium karbonat (washing soda) untuk menggantikan deterjen bubuk bersurfaktan minyak bumi (LAS/SLS) yang memicu eutrofikasi sungai.',
    challenge:
      'Air limbah cucian rumah tangga (greywater) menyumbang lebih dari 60% pencemaran organik dan fosfat di saluran drainase perkotaan Indonesia.',
    methodology: [
      'Mengekstraksi saponin dari 15 butir buah lerak kering yang direbus dalam 1,5 liter air untuk 30 kali siklus pencucian mesin.',
      'Menggunakan natrium perkarbonat (oxygen bleach) yang terurai menjadi oksigen, air, dan soda abu alami untuk pemutihan pakaian tanpa klorin.',
      'Menyalurkan air bilasan kedua langsung ke petak resapan tanaman hias tanpa merusak struktur mikrobioma tanah.',
    ],
    outcomes: [
      {
        label: 'Biodegradabilitas Air Cucian (28 Hari)',
        before: '42% (Deterjen Sintetis Konvensional)',
        after: '98,5% terurai sempurna dalam 7 hari',
      },
      {
        label: 'Biaya per Siklus Cuci (Beban 6 Kg)',
        before: 'Rp 2.400 / siklus',
        after: 'Rp 650 / siklus (buah lerak curah)',
      },
    ],
  },
  {
    id: 'kaca-logam-sirkular',
    index: '05',
    tier: 'archive',
    title: '05. Standarisasi Botol Kaca Kembalian untuk Industri Rumah Tangga Pangan',
    location: 'Malang & Batu',
    timeframe: 'Implementasi 34 UMKM Minuman Herbal & Madu',
    readTime: '5 mnt baca',
    category: 'Standarisasi Kemasan Sirkular',
    primaryMetric: '84% Tingkat Kembali Botol',
    primaryMetricContext: 'Rasio pengembalian botol kaca standar 350 ml melalui skema deposit Rp 3.000 per botol',
    secondaryMetric: '-68% Emisi Karbon per Kemasan Mulai Siklus Ke-4',
    summary:
      'Menyatukan desain botol kaca 350 ml dan 600 ml lintas 34 produsen jamu, kombucha, dan susu lokal di Malang Raya agar botol bekas dari merek apa pun dapat dikembalikan, dicuci uap, dan diisi kembali di titik koleksi terdekat.',
    challenge:
      'Setiap UMKM sebelumnya menggunakan bentuk botol unik berlabel lem permanen sehingga botol tidak dapat dipertukarkan dan berakhir pecah di tempat sampah.',
    methodology: [
      'Menetapkan 2 cetakan botol kaca standar berdinding tebal 3,2 mm yang tahan hingga 50 kali siklus pencucian industri suhu 85°C.',
      'Menggunakan perekat label berbasis kasein/pati singkong yang larut sempurna dalam air hangat dalam 90 detik tanpa residu pelarut kimia.',
    ],
    outcomes: [
      {
        label: 'Biaya Pengadaan Botol per UMKM',
        before: 'Rp 4.200 (beli botol baru tiap produksi)',
        after: 'Rp 950 (biaya cuci & sterilisasi botol kembali)',
      },
      {
        label: 'Pecahan Kaca di TPS Lokal',
        before: '1,4 ton / bulan',
        after: '0,22 ton / bulan (-84%)',
      },
    ],
  },
];

export const MATERIAL_SPECIMENS: MaterialSpecimen[] = [
  {
    id: 'spec-spons-loofah',
    accessionCode: 'ACC. LL-2026.01',
    figureNumber: 'Fig. 01',
    category: 'dapur',
    categoryLabel: 'Dapur & Pencucian',
    linearItem: 'Spons Cuci Piring Busa Poliuretan & Sabut Nilon',
    linearDecomposition: '400–500 Tahun (terfragmentasi menjadi mikroplastik)',
    linearDecompositionYears: 450,
    circularReplacement: 'Serat Oyong Kering Alami (Luffa aegyptiaca) & Sikat Sabut Kelapa',
    circularMaterial: '100% Selulosa Tanaman Merambat Lokal',
    circularLifespan: '6–8 Minggu pemakaian intensif harian',
    circularEndOfLife: 'Terurai sempurna dalam 30 hari di komposter rumah tangga',
    carbonDelta: '-94% jejak karbon manufaktur',
    curatorialNote:
      'Spons busa sintetis melepaskan ribuan serat mikroplastik ke saluran air setiap kali tergores peralatan masak logam. Oyong kering mengembang lembut saat terkena air hangat, tidak menggores kaca/keramik, dan kembali menjadi humus.',
  },
  {
    id: 'spec-wrap-beeswax',
    accessionCode: 'ACC. LL-2026.02',
    figureNumber: 'Fig. 02',
    category: 'kemasan',
    categoryLabel: 'Penyimpanan Pangan',
    linearItem: 'Plastik Cling Wrap (LDPE / PVDC Sekali Pakai)',
    linearDecomposition: '250–400 Tahun di TPA (sulit didaur ulang karena tipis)',
    linearDecompositionYears: 300,
    circularReplacement: 'Kain Pembungkus Lilin Lebah (Beeswax Food Wrap)',
    circularMaterial: 'Katun Organik, Lilin Lebah Hutan, Damar Pinus, Minyak Jojoba',
    circularLifespan: '120–150 kali siklus pakai (12–18 bulan)',
    circularEndOfLife: 'Dapat dilapisi ulang dengan lilin lebah atau dipotong sebagai pemantik kompos',
    carbonDelta: '-88% limbah polimer fleksibel',
    curatorialNote:
      'Sifat antibakteri alami dari propolis lilin lebah dan damar pinus menjaga kesegaran sayuran daun, keju, dan potongan buah lebih lama dibandingkan plastik kedap udara yang memicu pengembunan berlebih.',
  },
  {
    id: 'spec-sikat-bambu',
    accessionCode: 'ACC. LL-2026.03',
    figureNumber: 'Fig. 03',
    category: 'perawatan',
    categoryLabel: 'Perawatan Diri',
    linearItem: 'Sikat Gigi Gagang Polipropilena & Karet TPE',
    linearDecomposition: '450 Tahun (tidak bernilai ekonomis bagi pemulung)',
    linearDecompositionYears: 450,
    circularReplacement: 'Sikat Gigi Bambu Moso Tanpa Lapisan Pernis Sintetis',
    circularMaterial: 'Bambu Moso Pertumbuhan Cepat & Bulu Biopolimer Minyak Jarak',
    circularLifespan: '3 Bulan (sesuai rekomendasi higienitas dokter gigi)',
    circularEndOfLife: 'Gagang bambu terurai dalam 4–6 bulan di tanah kebun atau pot kompos',
    carbonDelta: '-82% massa plastik kamar mandi',
    curatorialNote:
      'Setiap orang rata-rata menggunakan 300 sikat gigi sepanjang hidupnya. Mengganti gagang polipropilena dengan bambu tanpa pemutih klorin menghentikan akumulasi plastik keras berukuran kecil yang lolos dari saringan mesin daur ulang.',
  },
  {
    id: 'spec-sabun-padat',
    accessionCode: 'ACC. LL-2026.04',
    figureNumber: 'Fig. 04',
    category: 'perawatan',
    categoryLabel: 'Perawatan Diri',
    linearItem: 'Sabun Cair & Sampo dalam Botol HDPE / PET Berpompa',
    linearDecomposition: '450 Tahun (pompa multi-material mustahil didaur ulang utuh)',
    linearDecompositionYears: 450,
    circularReplacement: 'Sabun & Sampo Padat Cold-Pressed Tanpa Kemasan Plastik',
    circularMaterial: 'Minyak Kelapa Murni, Minyak Zaitun, Lindi Alami, Kertas Kraft Daur Ulang',
    circularLifespan: '1 Batang (120g) setara dengan 2,5 botol cair 250 ml (60–75 kali pakai)',
    circularEndOfLife: 'Nol residu fisik; pembungkus kertas terurai dalam 2–4 minggu',
    carbonDelta: '-91% emisi transportasi (tanpa mengangkut 80% bobot air)',
    curatorialNote:
      'Produk pembersih cair konvensional terdiri atas 80% air yang dikemas dalam plastik tebal dan diangkut menggunakan bahan bakar fosil. Formulasi padat mengeliminasi botol sekaligus menghemat ruang simpan.',
  },
  {
    id: 'spec-kantong-katun',
    accessionCode: 'ACC. LL-2026.05',
    figureNumber: 'Fig. 05',
    category: 'tekstil',
    categoryLabel: 'Tekstil & Belanja',
    linearItem: 'Kantong Kresek HDPE Tipis & Kantong Spunbond Polipropilena',
    linearDecomposition: '100–300 Tahun (kantong spunbond adalah plastik non-anyaman)',
    linearDecompositionYears: 200,
    circularReplacement: 'Tas Jaring & Kantong Serut Katun Mentah (Unbleached Cotton)',
    circularMaterial: 'Serat Kapas Alami Tanpa Pemutih Optik & Benang Jahit Katun 100%',
    circularLifespan: '400–600 kali siklus belanja (5+ tahun)',
    circularEndOfLife: 'Dapat diperbaiki (visible mending) atau dikomposkan setelah 5 tahun',
    carbonDelta: 'Impas ekologis tercapai setelah 52 kali pemakaian rutin',
    curatorialNote:
      'Banyak konsumen keliru mengira tas "kain" spunbond adalah bahan alami, padahal spunbond terbuat dari serat plastik polipropilena yang mudah rapuh menjadi debu mikroplastik. Pilih tenun katun mentah, rami, atau anyaman pandan.',
  },
  {
    id: 'spec-sedotan-wadah-baja',
    accessionCode: 'ACC. LL-2026.06',
    figureNumber: 'Fig. 06',
    category: 'dapur',
    categoryLabel: 'Dapur & Pencucian',
    linearItem: 'Kotak Makan Styrofoam (EPS) & Gelas Kopi Kertas Berlapis PE',
    linearDecomposition: '500+ Tahun (styrofoam tidak dapat didaur ulang secara ekonomis)',
    linearDecompositionYears: 500,
    circularReplacement: 'Rantang & Tumbler Baja Tahan Karat (Food-Grade Austenitic 304)',
    circularMaterial: 'Baja Nirkarat 18/8 Tanpa Lapisan Resin Epoksi Dalam',
    circularLifespan: '15–25 Tahun (ribuan siklus pakai & tahan benturan)',
    circularEndOfLife: '100% dapat dilebur kembali di tanur logam tanpa penurunan mutu',
    carbonDelta: '-96% limbah kemasan makanan siap saji dalam 2 tahun',
    curatorialNote:
      'Gelas kertas kopi sekali pakai dilapisi film polietilena cair di bagian dalam agar tidak bocor, sehingga sangat sulit dipulihkan oleh pabrik kertas biasa. Tumbler baja tahan karat mengeliminasi masalah ini sekaligus menjaga suhu minuman.',
  },
];
