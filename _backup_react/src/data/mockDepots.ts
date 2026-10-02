import { Depot } from '../types';

export const INITIAL_USER_LOCATION = {
  lat: -7.2758,
  lng: 112.7562,
  label: 'Gubeng / Kertajaya, Surabaya (Lokasi Anda)',
};

export const HOTSPOT_LOCATIONS = [
  { lat: -7.2758, lng: 112.7562, label: 'Gubeng / Kertajaya, Surabaya Pusat' },
  { lat: -7.2845, lng: 112.7932, label: 'Sukolilo / Kampus ITS, Surabaya Timur' },
  { lat: -7.3260, lng: 112.7795, label: 'Rungkut Madya / SIER, Surabaya Timur' },
  { lat: -7.2940, lng: 112.7345, label: 'Darmo / Wonokromo, Surabaya Selatan' },
  { lat: -7.2625, lng: 112.7390, label: 'Tunjungan / Tegalsari, Surabaya Pusat' },
  { lat: -7.3180, lng: 112.7480, label: 'Jemursari, Wonocolo, Surabaya Selatan' },
];

export const MOCK_DEPOTS: Depot[] = [
  {
    id: 'damiu-sby-01',
    name: 'Depot Tirta Sehat Kertajaya',
    tagline: 'Air Minum RO 8 Tahap Bersertifikat Dinkes Surabaya & Uji BBLK',
    address: 'Jl. Kertajaya No. 88, RT.03/RW.05, Kel. Airlangga',
    district: 'Gubeng',
    city: 'Surabaya',
    lat: -7.2785,
    lng: 112.7590,
    phone: '0812-3131-4455',
    whatsapp: '6281231314455',
    openHours: '06:30 - 21:30 WIB',
    isOpen: true,
    rating: 4.9,
    reviewCount: 164,
    coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: true,
      slhsNumber: 'SLHS-3578/08/DINKES-SBY/2025',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '10 Januari 2025',
      expiryDate: '10 Januari 2028',
      grade: 'A (Sangat Baik)',
      status: 'AKTIF'
    },
    labTest: {
      lastTestedDate: '18 Agustus 2026',
      labName: 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
      tds: 16,
      ph: 7.4,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: true
    },
    facilities: [
      'Membran RO Filmtec 0.0001 Mikron',
      'Sterilisasi Sinar UV Philips 12 GPM',
      'Ozon Generator (O3) Pembunuh Mikroba',
      'Pencucian Sikat Otomatis High-Pressure',
      'Segel Tutup Higienis & Plastik Pelindung'
    ],
    products: [
      {
        id: 'prod-sby-01',
        name: 'Isi Ulang Reverse Osmosis (RO) Murni',
        type: 'ro',
        price: 8000,
        description: 'TDS super rendah 16 ppm, sangat segar, murni bebas kapur dan logam.',
        tdsAvg: 16
      },
      {
        id: 'prod-sby-02',
        name: 'Isi Ulang Mineral Pegunungan Segar',
        type: 'mineral',
        price: 6000,
        description: 'Air mineral steril higienis dengan mineral esensial seimbang.',
        tdsAvg: 60
      },
      {
        id: 'prod-sby-03',
        name: 'Isi Ulang Bio-Alkali Sehat (pH 8.5)',
        type: 'alkali',
        price: 12000,
        description: 'Air alkali kaya antioksidan menyeimbangkan asam tubuh.',
        tdsAvg: 80
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri (Tukar)',
        description: 'Galon lama dicuci dan disterilkan secara gratis sebelum diisi.'
      },
      newGallon: {
        enabled: true,
        fee: 35000,
        name: 'Beli Galon Baru (Food Grade PET)',
        description: 'Galon baru 19L 100% BPA Free bersertifikat SNI.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-01',
        userName: 'Bayu Wicaksono',
        date: '19 September 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 5,
        serviceRating: 5,
        comment: 'Airnya jernih pol! TDS dites di depan mata cuma 16 ppm. Galon dicuci luar dalam pakai semprotan ozon. Lokasi dekat kampus Unair & RSUD Dr. Soetomo.',
        tags: ['Air Sangat Jernih', 'TDS Rendah', 'Tutup Disegel', 'Surabaya Timur'],
        verifiedPurchase: true
      },
      {
        id: 'rev-sby-02',
        userName: 'Nadia Salsabila',
        date: '12 September 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 4.9,
        serviceRating: 5,
        comment: 'Order pickup lewat Minum.in praktis banget. Pas ambil galon sudah terisi dan disegel rapi. Sertifikat Dinkes Surabaya dipajang jelas.',
        tags: ['Pickup Cepat', 'Higienis', 'Rasa Segar'],
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'damiu-sby-02',
    name: 'Depot AquaPure Rungkut Madya',
    tagline: 'Pelopor Depot Air Minum Higienis di Kawasan Rungkut & SIER Surabaya',
    address: 'Jl. Rungkut Madya No. 45, Rungkut Kidul',
    district: 'Rungkut',
    city: 'Surabaya',
    lat: -7.3260,
    lng: 112.7795,
    phone: '0813-5566-7788',
    whatsapp: '6281355667788',
    openHours: '06:00 - 22:00 WIB',
    isOpen: true,
    rating: 4.8,
    reviewCount: 118,
    coverImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: true,
      slhsNumber: 'SLHS-3578/11/DINKES-SBY/2024',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '15 November 2024',
      expiryDate: '15 November 2027',
      grade: 'A (Sangat Baik)',
      status: 'AKTIF'
    },
    labTest: {
      lastTestedDate: '02 Agustus 2026',
      labName: 'Laboratorium Kesehatan Daerah (Labkesda) Kota Surabaya',
      tds: 20,
      ph: 7.2,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: true
    },
    facilities: [
      'Double Filter Katrid Sedimen 1 Mikron',
      'Sistem Sterilisasi UV 2 Chamber',
      'Pembersih Ozon Tutup Galon',
      'Tangki Stainless SUS-304 Food Grade'
    ],
    products: [
      {
        id: 'prod-sby-04',
        name: 'Isi Ulang RO Ultra-Pure',
        type: 'ro',
        price: 8500,
        description: 'Penyaringan nano-filter, rasa segar murni tanpa endapan.',
        tdsAvg: 20
      },
      {
        id: 'prod-sby-05',
        name: 'Isi Ulang Mineral Steril',
        type: 'mineral',
        price: 6500,
        description: 'Air minum mineral bersih berstandar SNI.',
        tdsAvg: 68
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri (Tukar)',
        description: 'Bawa galon kosong Anda untuk diisi ulang.'
      },
      newGallon: {
        enabled: true,
        fee: 38000,
        name: 'Beli Galon Polikarbonat (PC Kuat)',
        description: 'Galon PC tebal anti pecah dan higienis.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-03',
        userName: 'Hendro Prasetyo',
        date: '04 September 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 4.8,
        serviceRating: 5,
        comment: 'Langganan kosan daerah UPN dan Rungkut. Airnya tawar seger, tidak ada bau kaporit sama sekali. Pelayanan sat-set.',
        tags: ['Segar Alami', 'UPN Rungkut', 'TDS Terukur'],
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'damiu-sby-03',
    name: 'Depot Barokah Tirta Sukolilo',
    tagline: 'Favorit Mahasiswa & Warga Sekitar Kampus ITS Surabaya',
    address: 'Jl. Gebang Putih No. 16, Sukolilo',
    district: 'Sukolilo',
    city: 'Surabaya',
    lat: -7.2845,
    lng: 112.7932,
    phone: '0857-3344-9900',
    whatsapp: '6285733449900',
    openHours: '07:00 - 22:00 WIB',
    isOpen: true,
    rating: 4.8,
    reviewCount: 95,
    coverImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: true,
      slhsNumber: 'SLHS-3578/04/DINKES-SBY/2024',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '12 April 2024',
      expiryDate: '12 April 2027',
      grade: 'A (Sangat Baik)',
      status: 'AKTIF'
    },
    labTest: {
      lastTestedDate: '24 Juli 2026',
      labName: 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
      tds: 22,
      ph: 7.3,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: true
    },
    facilities: [
      'Filter Karbon Aktif Granular Batok Kelapa',
      'Sterilisator Sinar Ultraviolet',
      'Penyemprotan Nozzle Otomatis',
      'Tutup Segel Higienis'
    ],
    products: [
      {
        id: 'prod-sby-06',
        name: 'Isi Ulang RO Sehat Murni',
        type: 'ro',
        price: 7500,
        description: 'Kemurnian tinggi bebas bakteri, ramah di kantong mahasiswa.',
        tdsAvg: 22
      },
      {
        id: 'prod-sby-07',
        name: 'Isi Ulang Mineral Pegunungan',
        type: 'mineral',
        price: 5000,
        description: 'Pilihan hemat dan segar untuk anak kos & keluarga.',
        tdsAvg: 55
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri (Tukar)',
        description: 'Gratis semprot ozon dan pencucian bagian luar dalam.'
      },
      newGallon: {
        enabled: true,
        fee: 32000,
        name: 'Beli Galon Baru',
        description: 'Galon baru siap pakai.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-04',
        userName: 'Rizky Pratama (Mhs ITS)',
        date: '28 Agustus 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 4.8,
        serviceRating: 5,
        comment: 'Dekat banget sama kosan Gebang. Airnya jernih, murah 5rb-an tapi kualitas sertifikat Dinkes resmi. Pas lewat tinggal ambil pakai fitur pickup.',
        tags: ['Murah', 'Anak Kos ITS', 'Bersih'],
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'damiu-sby-04',
    name: 'Depot HydroLife Darmo',
    tagline: 'Spesialis Air Reverse Osmosis & Bio-Alkali Hexagonal Standar Medis',
    address: 'Jl. Raya Darmo Permai I No. 24, Wonokromo',
    district: 'Wonokromo',
    city: 'Surabaya',
    lat: -7.2940,
    lng: 112.7345,
    phone: '0812-7788-2211',
    whatsapp: '6281277882211',
    openHours: '07:00 - 21:00 WIB',
    isOpen: true,
    rating: 4.9,
    reviewCount: 142,
    coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: true,
      slhsNumber: 'SLHS-3578/02/DINKES-SBY/2026',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '15 Februari 2026',
      expiryDate: '15 Februari 2029',
      grade: 'A (Sangat Baik)',
      status: 'AKTIF'
    },
    labTest: {
      lastTestedDate: '20 Agustus 2026',
      labName: 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
      tds: 12,
      ph: 7.6,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: true
    },
    facilities: [
      'Penyaringan RO 7 Tahap Made in USA',
      'Filter Remineralisasi Alkali Alami pH 8.5',
      'Sterilisator Tabung Stainless 4 Lampu UV',
      'Nozzle Pengisian Stainless Food Grade 316'
    ],
    products: [
      {
        id: 'prod-sby-08',
        name: 'Isi Ulang RO Ultra-Pure',
        type: 'ro',
        price: 10000,
        description: 'TDS hanya 12 ppm, kemurnian maksimal standar laboratorium.',
        tdsAvg: 12
      },
      {
        id: 'prod-sby-09',
        name: 'Isi Ulang Bio-Alkali Hexagonal',
        type: 'alkali',
        price: 15000,
        description: 'Air micro-cluster berenergi, mudah diserap sel tubuh.',
        tdsAvg: 55
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri (Tukar)',
        description: 'Gratis sterilisasi ozon luar dalam.'
      },
      newGallon: {
        enabled: true,
        fee: 40000,
        name: 'Beli Galon Tebal Premium',
        description: 'Galon bahan PC tebal anti benturan.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-05',
        userName: 'dr. Satria Nugroho',
        date: '10 September 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 5,
        serviceRating: 5,
        comment: 'Rekomendasi untuk pasien dan keluarga yang butuh air kemurnian tinggi. Uji lab BBLK Surabaya sangat teratur dan tempatnya higienis.',
        tags: ['Rekomendasi Dokter', 'RO Murni', 'Darmo Surabaya'],
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'damiu-sby-05',
    name: 'Depot Tirta Manyar (Proses Uji Ulang)',
    tagline: 'Depot Air Minum Isi Ulang Biasa & Galon Bermerek',
    address: 'Jl. Manyar Kertoarjo V No. 9, Mulyorejo',
    district: 'Mulyorejo',
    city: 'Surabaya',
    lat: -7.2730,
    lng: 112.7660,
    phone: '0878-9900-1122',
    whatsapp: '6287899001122',
    openHours: '08:00 - 19:00 WIB',
    isOpen: true,
    rating: 3.9,
    reviewCount: 38,
    coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: false,
      slhsNumber: 'DALAM PENGAJUAN PERPANJANGAN',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '10 Mei 2022',
      expiryDate: '10 Mei 2025 (Kedaluwarsa)',
      grade: 'C (Cukup)',
      status: 'PROSES_RENEWAL'
    },
    labTest: {
      lastTestedDate: '10 April 2025 (Perlu Uji Ulang)',
      labName: 'Labkesda Surabaya',
      tds: 120,
      ph: 6.9,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: false
    },
    facilities: [
      'Filter Karbon Biasa',
      '1 Lampu UV Standar'
    ],
    products: [
      {
        id: 'prod-sby-10',
        name: 'Isi Ulang Mineral Standar',
        type: 'mineral',
        price: 4500,
        description: 'Air minum mineral biasa terfilter standar.',
        tdsAvg: 120
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri',
        description: 'Bawa galon sendiri tanpa biaya tambahan.'
      },
      newGallon: {
        enabled: false,
        fee: 0,
        name: 'Galon Baru Habis',
        description: 'Stok galon baru sedang tidak tersedia.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-06',
        userName: 'Guruh S.',
        date: '05 Agustus 2026',
        rating: 3.8,
        waterClarityRating: 3.8,
        tasteRating: 3.9,
        gallonCleanlinessRating: 3.7,
        serviceRating: 4.0,
        comment: 'Harga murah, tapi perlu segera diperpanjang sertifikat Dinkesnya agar pelanggan merasa lebih aman.',
        tags: ['Perlu Sertifikasi Ulang', 'Harga Terjangkau'],
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'damiu-sby-06',
    name: 'Depot Crystal Clear Jemursari',
    tagline: 'DAMIU Resmi Bersertifikat Laik Sehat Dinkes Surabaya Grade A',
    address: 'Jl. Raya Jemursari No. 112, Wonocolo',
    district: 'Wonocolo',
    city: 'Surabaya',
    lat: -7.3180,
    lng: 112.7480,
    phone: '0812-9988-1122',
    whatsapp: '6281299881122',
    openHours: '06:00 - 21:00 WIB',
    isOpen: true,
    rating: 4.9,
    reviewCount: 104,
    coverImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
    ],
    certification: {
      isCertified: true,
      slhsNumber: 'SLHS-3578/06/DINKES-SBY/2025',
      dinkesRegion: 'Dinas Kesehatan Kota Surabaya',
      issuedDate: '18 Juni 2025',
      expiryDate: '18 Juni 2028',
      grade: 'A (Sangat Baik)',
      status: 'AKTIF'
    },
    labTest: {
      lastTestedDate: '01 September 2026',
      labName: 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
      tds: 14,
      ph: 7.5,
      eColiStatus: 'Negatif (0 CFU/100ml)',
      coliformStatus: 'Negatif (0 CFU/100ml)',
      isPassed: true
    },
    facilities: [
      'Membran RO Dow Filmtec 500 GPD',
      'Penyaringan Bio Keramik Mineral',
      'Sterilisator Ozon 500mg/jam',
      'Mesin Cuci Dalam Galon Otomatis High-Pressure'
    ],
    products: [
      {
        id: 'prod-sby-11',
        name: 'Isi Ulang Reverse Osmosis (RO)',
        type: 'ro',
        price: 8500,
        description: 'Air murni hasil pemfilteran membran nano, bebas kuman dan kerak mineral.',
        tdsAvg: 14
      },
      {
        id: 'prod-sby-12',
        name: 'Isi Ulang Mineral Segar',
        type: 'mineral',
        price: 6000,
        description: 'Air mineral steril higienis dengan kesegaran alami.',
        tdsAvg: 55
      }
    ],
    gallonOptions: {
      bringOwn: {
        enabled: true,
        fee: 0,
        name: 'Bawa Galon Sendiri (Tukar)',
        description: 'Gratis cuci dan sterilisasi tutup galon.'
      },
      newGallon: {
        enabled: true,
        fee: 35000,
        name: 'Beli Galon Baru Food Grade',
        description: 'Galon baru 19L higienis berstandar SNI.'
      }
    },
    reviews: [
      {
        id: 'rev-sby-07',
        userName: 'Siti Aminah',
        date: '08 September 2026',
        rating: 5,
        waterClarityRating: 5,
        tasteRating: 5,
        gallonCleanlinessRating: 5,
        serviceRating: 4.9,
        comment: 'Airnya jernih banget, tidak ada aftertaste aneh. Tempat depotnya bersih dan rapi sekali. Sangat recommended untuk area Jemursari & Wonocolo!',
        tags: ['Sangat Bersih', 'Air Segar', 'Dinkes Grade A'],
        verifiedPurchase: true
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'MINUM-SBY-001',
    queueNumber: '#A-06',
    depotId: 'damiu-sby-01',
    depotName: 'Depot Tirta Sehat Kertajaya',
    depotAddress: 'Jl. Kertajaya No. 88, Gubeng, Surabaya',
    depotPhone: '0812-3131-4455',
    depotLat: -7.2785,
    depotLng: 112.7590,
    customerName: 'Leroy',
    customerPhone: '0812-3456-7890',
    waterType: 'ro' as const,
    waterProductName: 'Isi Ulang Reverse Osmosis (RO) Murni',
    unitPrice: 8000,
    quantity: 2,
    gallonOption: 'bring_own' as const,
    gallonOptionName: 'Bawa Galon Sendiri (Tukar)',
    gallonFee: 0,
    totalAmount: 16000,
    pickupTimeEstimated: '17:15 WIB (15 Menit lagi)',
    status: 'SEDANG_DIISI' as const,
    createdAt: '2026-09-22T11:45:00.000Z',
    notes: 'Tolong disemprot ozon tutupnya ya mas',
    pickupPin: '4921'
  }
];
