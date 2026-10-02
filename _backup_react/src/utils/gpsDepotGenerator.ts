import { Depot } from '../types';

/**
 * Generates realistic certified DAMIU depots around a given GPS coordinate
 */
export function generateDepotsNearCoordinates(
  userLat: number,
  userLng: number,
  districtName: string = 'Sekitar Anda',
  cityName: string = 'Surabaya'
): Depot[] {
  return [
    {
      id: 'gps-depot-01',
      name: `Depot Tirta Sehat ${districtName}`,
      tagline: 'Air Minum RO 8 Tahap Bersertifikat Dinkes & Sterilisasi Ozon',
      address: `Jl. Raya ${districtName} No. 28`,
      district: districtName,
      city: cityName,
      lat: userLat + 0.0035, // ~380m utara-timur
      lng: userLng + 0.0028,
      phone: '0812-3456-7891',
      whatsapp: '6281234567891',
      openHours: '06:30 - 21:30 WIB',
      isOpen: true,
      rating: 4.9,
      reviewCount: 128,
      coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
      ],
      certification: {
        isCertified: true,
        slhsNumber: `SLHS-${cityName.toUpperCase().slice(0, 3)}/08/DINKES/2025`,
        dinkesRegion: `Dinas Kesehatan ${cityName}`,
        issuedDate: '12 Januari 2025',
        expiryDate: '12 Januari 2028',
        grade: 'A (Sangat Baik)',
        status: 'AKTIF'
      },
      labTest: {
        lastTestedDate: '15 Agustus 2026',
        labName: `Balai Besar Laboratorium Kesehatan (BBLK) ${cityName}`,
        tds: 16,
        ph: 7.4,
        eColiStatus: 'Negatif (0 CFU/100ml)',
        coliformStatus: 'Negatif (0 CFU/100ml)',
        isPassed: true
      },
      facilities: [
        'Membran Reverse Osmosis 0.0001 Mikron',
        'Sterilisasi Lampu UV Philips 12 GPM',
        'Ozon Generator (O3) Pembasmi Bakteri',
        'Cuci Galon Jet Spray Otomatis'
      ],
      products: [
        {
          id: 'prod-gps-01',
          name: 'Isi Ulang Reverse Osmosis (RO) Murni',
          type: 'ro',
          price: 8000,
          description: 'Penyaringan ultra murni TDS 16 ppm, segar dan ringan.',
          tdsAvg: 16
        },
        {
          id: 'prod-gps-02',
          name: 'Isi Ulang Air Mineral Alami',
          type: 'mineral',
          price: 6000,
          description: 'Air mineral steril terfiltrasi karbon aktif berkualitas.',
          tdsAvg: 58
        }
      ],
      gallonOptions: {
        bringOwn: {
          enabled: true,
          fee: 0,
          name: 'Bawa Galon Sendiri (Tukar)',
          description: 'Gratis cuci dan sterilisasi ozon sebelum pengisian.'
        },
        newGallon: {
          enabled: true,
          fee: 35000,
          name: 'Beli Galon Baru Food Grade',
          description: 'Galon baru 19L BPA Free berstandar SNI.'
        }
      },
      reviews: [
        {
          id: 'rev-gps-01',
          userName: 'Rendra Wibowo',
          date: '16 September 2026',
          rating: 5,
          waterClarityRating: 5,
          tasteRating: 5,
          gallonCleanlinessRating: 5,
          serviceRating: 5,
          comment: 'Airnya jernih banget, pas diukur TDS nya terbukti rendah. Dekat dari rumah, pesan pickup tinggal ambil tanpa nunggu lama.',
          tags: ['Air Jernih', 'TDS Rendah', 'Pickup Cepat'],
          verifiedPurchase: true
        }
      ]
    },
    {
      id: 'gps-depot-02',
      name: `Depot AquaPure ${districtName}`,
      tagline: 'Depot Air Minum Higienis Berizin Resmi Dinkes & Uji Lab Berkala',
      address: `Jl. Flamboyan / ${districtName} Timur No. 12`,
      district: districtName,
      city: cityName,
      lat: userLat - 0.0042, // ~450m selatan
      lng: userLng + 0.0031,
      phone: '0813-9876-5432',
      whatsapp: '6281398765432',
      openHours: '06:00 - 22:00 WIB',
      isOpen: true,
      rating: 4.8,
      reviewCount: 94,
      coverImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
      ],
      certification: {
        isCertified: true,
        slhsNumber: `SLHS-${cityName.toUpperCase().slice(0, 3)}/11/DINKES/2024`,
        dinkesRegion: `Dinas Kesehatan ${cityName}`,
        issuedDate: '20 November 2024',
        expiryDate: '20 November 2027',
        grade: 'A (Sangat Baik)',
        status: 'AKTIF'
      },
      labTest: {
        lastTestedDate: '28 Juli 2026',
        labName: `Laboratorium Kesehatan Daerah (Labkesda) ${cityName}`,
        tds: 20,
        ph: 7.3,
        eColiStatus: 'Negatif (0 CFU/100ml)',
        coliformStatus: 'Negatif (0 CFU/100ml)',
        isPassed: true
      },
      facilities: [
        'Sistem Filter Katrid Sedimen 1 Mikron',
        'Sterilisasi Sinar UV 2 Chamber',
        'Tangki Stainless Steel Food Grade SUS-304'
      ],
      products: [
        {
          id: 'prod-gps-03',
          name: 'Isi Ulang RO Ultra-Pure',
          type: 'ro',
          price: 8500,
          description: 'Penyaringan nano murni bebas bakteri dan endapan.',
          tdsAvg: 20
        },
        {
          id: 'prod-gps-04',
          name: 'Isi Ulang Air Mineral Segar',
          type: 'mineral',
          price: 6000,
          description: 'Air mineral steril segar untuk konsumsi harian.',
          tdsAvg: 65
        }
      ],
      gallonOptions: {
        bringOwn: {
          enabled: true,
          fee: 0,
          name: 'Bawa Galon Sendiri (Tukar)',
          description: 'Bawa galon kosong Anda untuk isi ulang langsung.'
        },
        newGallon: {
          enabled: true,
          fee: 38000,
          name: 'Beli Galon Polikarbonat (PC Kuat)',
          description: 'Galon bahan PC tebal anti pecah berstandar SNI.'
        }
      },
      reviews: [
        {
          id: 'rev-gps-02',
          userName: 'Siti Rahmawati',
          date: '05 September 2026',
          rating: 4.8,
          waterClarityRating: 5,
          tasteRating: 4.8,
          gallonCleanlinessRating: 4.8,
          serviceRating: 5,
          comment: 'Rasa airnya segar murni, tutup galon selalu disemprot disinfektan. Recommended!',
          tags: ['Segar Alami', 'Pelayanan Cepat'],
          verifiedPurchase: true
        }
      ]
    },
    {
      id: 'gps-depot-03',
      name: `Depot Bio-Alkali Sehat ${districtName}`,
      tagline: 'Spesialis Air Reverse Osmosis & Bio-Alkali Hexagonal pH 8.5',
      address: `Jl. Melati / ${districtName} Barat No. 55`,
      district: districtName,
      city: cityName,
      lat: userLat - 0.0025, // ~600m barat
      lng: userLng - 0.0055,
      phone: '0812-7711-2233',
      whatsapp: '6281277112233',
      openHours: '07:00 - 21:00 WIB',
      isOpen: true,
      rating: 4.9,
      reviewCount: 110,
      coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
      ],
      certification: {
        isCertified: true,
        slhsNumber: `SLHS-${cityName.toUpperCase().slice(0, 3)}/02/DINKES/2026`,
        dinkesRegion: `Dinas Kesehatan ${cityName}`,
        issuedDate: '15 Februari 2026',
        expiryDate: '15 Februari 2029',
        grade: 'A (Sangat Baik)',
        status: 'AKTIF'
      },
      labTest: {
        lastTestedDate: '20 Agustus 2026',
        labName: `Sucofindo Water Testing Laboratory`,
        tds: 12,
        ph: 8.2,
        eColiStatus: 'Negatif (0 CFU/100ml)',
        coliformStatus: 'Negatif (0 CFU/100ml)',
        isPassed: true
      },
      facilities: [
        'Membran RO 7 Tahap Standar Medis',
        'Filter Remineralisasi Bio-Alkali Alami',
        'Sterilisator Tabung Stainless 4 Lampu UV'
      ],
      products: [
        {
          id: 'prod-gps-05',
          name: 'Isi Ulang Bio-Alkali Hexagonal (pH 8.5)',
          type: 'alkali',
          price: 14000,
          description: 'Air micro-cluster kaya antioksidan ramah metabolisme tubuh.',
          tdsAvg: 50
        },
        {
          id: 'prod-gps-06',
          name: 'Isi Ulang RO Ultra-Pure',
          type: 'ro',
          price: 9000,
          description: 'TDS murni 12 ppm tanpa kontaminan.',
          tdsAvg: 12
        }
      ],
      gallonOptions: {
        bringOwn: {
          enabled: true,
          fee: 0,
          name: 'Bawa Galon Sendiri (Tukar)',
          description: 'Gratis sterilisasi tabung luar dan dalam.'
        },
        newGallon: {
          enabled: true,
          fee: 40000,
          name: 'Beli Galon Tebal Premium',
          description: 'Galon bahan PC tebal premium tahan benturan.'
        }
      },
      reviews: [
        {
          id: 'rev-gps-03',
          userName: 'Dimas Kurniawan',
          date: '10 September 2026',
          rating: 5,
          waterClarityRating: 5,
          tasteRating: 5,
          gallonCleanlinessRating: 5,
          serviceRating: 5,
          comment: 'Air alkalinya berasa enteng di tenggorokan. Uji lab Sucofindo dipajang jelas.',
          tags: ['Bio Alkali', 'RO Murni', 'Standar Medis'],
          verifiedPurchase: true
        }
      ]
    },
    {
      id: 'gps-depot-04',
      name: `Depot Sumber Barokah ${districtName}`,
      tagline: 'Air Minum Higienis Terjangkau & Segar Bersertifikat Dinkes',
      address: `Jl. Kenanga No. 19, ${districtName}`,
      district: districtName,
      city: cityName,
      lat: userLat + 0.0062, // ~750m utara
      lng: userLng - 0.0035,
      phone: '0857-1122-3344',
      whatsapp: '6285711223344',
      openHours: '07:00 - 21:00 WIB',
      isOpen: true,
      rating: 4.7,
      reviewCount: 78,
      coverImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
      ],
      certification: {
        isCertified: true,
        slhsNumber: `SLHS-${cityName.toUpperCase().slice(0, 3)}/04/DINKES/2024`,
        dinkesRegion: `Dinas Kesehatan ${cityName}`,
        issuedDate: '10 April 2024',
        expiryDate: '10 April 2027',
        grade: 'A (Sangat Baik)',
        status: 'AKTIF'
      },
      labTest: {
        lastTestedDate: '05 Juni 2026',
        labName: `Labkesda ${cityName}`,
        tds: 24,
        ph: 7.2,
        eColiStatus: 'Negatif (0 CFU/100ml)',
        coliformStatus: 'Negatif (0 CFU/100ml)',
        isPassed: true
      },
      facilities: [
        'Filter Karbon Aktif Batok Kelapa',
        'Sterilisator Sinar Ultraviolet',
        'Penyemprotan Nozzle Otomatis'
      ],
      products: [
        {
          id: 'prod-gps-07',
          name: 'Isi Ulang Mineral Pegunungan Segar',
          type: 'mineral',
          price: 5000,
          description: 'Pilihan hemat dan segar, dijamin higienis bebas bakteri.',
          tdsAvg: 48
        },
        {
          id: 'prod-gps-08',
          name: 'Isi Ulang RO Sehat',
          type: 'ro',
          price: 7500,
          description: 'Air murni hasil pemfilteran membran nano.',
          tdsAvg: 24
        }
      ],
      gallonOptions: {
        bringOwn: {
          enabled: true,
          fee: 0,
          name: 'Bawa Galon Sendiri (Tukar)',
          description: 'Gratis pencucian dan nozzle spray.'
        },
        newGallon: {
          enabled: true,
          fee: 32000,
          name: 'Beli Galon Baru',
          description: 'Galon polos baru siap pakai.'
        }
      },
      reviews: [
        {
          id: 'rev-gps-04',
          userName: 'Arif Hidayat',
          date: '28 Agustus 2026',
          rating: 4.8,
          waterClarityRating: 4.9,
          tasteRating: 4.8,
          gallonCleanlinessRating: 4.7,
          serviceRating: 4.9,
          comment: 'Harga cuma 5rb tapi airnya jernih dan ada sertifikat Dinkes resmi. Mantap!',
          tags: ['Hemat', 'Jernih', 'Bersih'],
          verifiedPurchase: true
        }
      ]
    },
    {
      id: 'gps-depot-05',
      name: `Depot Tirta Mandiri ${districtName} (Proses Uji Ulang)`,
      tagline: 'Depot Air Minum Biasa & Galon Bermerek',
      address: `Jl. Mawar No. 8, ${districtName}`,
      district: districtName,
      city: cityName,
      lat: userLat - 0.0075, // ~900m selatan-barat
      lng: userLng - 0.0042,
      phone: '0878-3344-5566',
      whatsapp: '6287833445566',
      openHours: '08:00 - 18:00 WIB',
      isOpen: true,
      rating: 3.8,
      reviewCount: 32,
      coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
      ],
      certification: {
        isCertified: false,
        slhsNumber: 'DALAM PENGAJUAN PERPANJANGAN',
        dinkesRegion: `Dinas Kesehatan ${cityName}`,
        issuedDate: '10 Mei 2022',
        expiryDate: '10 Mei 2025 (Kedaluwarsa)',
        grade: 'C (Cukup)',
        status: 'PROSES_RENEWAL'
      },
      labTest: {
        lastTestedDate: '10 April 2025 (Perlu Uji Ulang)',
        labName: `Labkesda ${cityName}`,
        tds: 130,
        ph: 6.8,
        eColiStatus: 'Negatif (0 CFU/100ml)',
        coliformStatus: 'Negatif (0 CFU/100ml)',
        isPassed: false
      },
      facilities: ['Filter Karbon Biasa', '1 Lampu UV Standar'],
      products: [
        {
          id: 'prod-gps-09',
          name: 'Isi Ulang Mineral Biasa',
          type: 'mineral',
          price: 4500,
          description: 'Air minum mineral biasa dengan filter standar.',
          tdsAvg: 130
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
          name: 'Stok Habis',
          description: 'Stok galon baru sedang kosong.'
        }
      },
      reviews: [
        {
          id: 'rev-gps-05',
          userName: 'Bambang U.',
          date: '15 Agustus 2026',
          rating: 3.7,
          waterClarityRating: 3.7,
          tasteRating: 3.8,
          gallonCleanlinessRating: 3.5,
          serviceRating: 4.0,
          comment: 'Harga murah, tapi perlu segera diperpanjang sertifikat Dinkesnya agar pelanggan merasa lebih aman.',
          tags: ['Perlu Sertifikasi Ulang', 'Harga Terjangkau'],
          verifiedPurchase: true
        }
      ]
    }
  ];
}
