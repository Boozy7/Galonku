export type WaterType = 'mineral' | 'ro' | 'alkali' | 'branded';

export interface CertificationInfo {
  isCertified: boolean;
  slhsNumber?: string; // Nomor Sertifikat Laik Higiene Sanitasi
  dinkesRegion?: string;
  issuedDate?: string;
  expiryDate?: string;
  grade?: 'A (Sangat Baik)' | 'B (Baik)' | 'C (Cukup)';
  status: 'AKTIF' | 'PROSES_RENEWAL' | 'BELUM_TERSERTIFIKASI';
}

export interface LabTestInfo {
  lastTestedDate: string;
  labName: string;
  tds: number; // Total Dissolved Solids in PPM (<300 safe, <100 ideal, <20 RO)
  ph: number; // 6.5 - 8.5 ideal
  eColiStatus: 'Negatif (0 CFU/100ml)' | 'Positif';
  coliformStatus: 'Negatif (0 CFU/100ml)' | 'Positif';
  isPassed: boolean;
  certificateDocUrl?: string;
}

export interface WaterProduct {
  id: string;
  name: string;
  type: WaterType;
  price: number; // refill price per gallon
  description: string;
  tdsAvg: number;
}

export interface GallonOptions {
  bringOwn: {
    enabled: boolean;
    fee: number;
    name: string;
    description: string;
  };
  newGallon: {
    enabled: boolean;
    fee: number;
    name: string;
    description: string;
  };
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar?: string;
  date: string;
  rating: number; // 1 - 5
  waterClarityRating: number; // Kejernihan Air (1-5)
  tasteRating: number; // Rasa & Kesegaran Air (1-5)
  gallonCleanlinessRating: number; // Kebersihan Galon & Tutup (1-5)
  serviceRating: number; // Keramahan & Kecepatan Depot (1-5)
  comment: string;
  tags: string[];
  verifiedPurchase: boolean;
}

export interface Depot {
  id: string;
  name: string;
  tagline: string;
  address: string;
  district: string; // Kecamatan/Kelurahan
  city: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  openHours: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  certification: CertificationInfo;
  labTest: LabTestInfo;
  facilities: string[];
  products: WaterProduct[];
  gallonOptions: GallonOptions;
  gallery: string[];
  coverImage: string;
  reviews: ReviewItem[];
  distanceKm?: number; // Calculated dynamically from user location
}

export type OrderStatus = 'DITERIMA' | 'SEDANG_DIISI' | 'SIAP_DIAMBIL' | 'SELESAI' | 'BATAL';

export interface PickupOrder {
  id: string;
  queueNumber: string;
  depotId: string;
  depotName: string;
  depotAddress: string;
  depotPhone: string;
  depotLat: number;
  depotLng: number;
  customerName: string;
  customerPhone: string;
  waterType: WaterType;
  waterProductName: string;
  unitPrice: number;
  quantity: number;
  gallonOption: 'bring_own' | 'new_gallon';
  gallonOptionName: string;
  gallonFee: number;
  totalAmount: number;
  pickupTimeEstimated: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  pickupPin: string;
}

export type ComplaintIssueType = 
  | 'air_berbau' 
  | 'air_keruh' 
  | 'ada_endapan' 
  | 'galon_kotor' 
  | 'tutup_bocor' 
  | 'rasa_tidak_wajar' 
  | 'lainnya';

export type ComplaintStatus = 
  | 'TERKIRIM_KE_DINKES' 
  | 'SEDANG_INVESTIGASI' 
  | 'INSPEKSI_LAPANGAN' 
  | 'SELESAI';

export interface ComplaintReport {
  id: string;
  depotId: string;
  depotName: string;
  reporterName: string;
  reporterPhone: string;
  issueType: ComplaintIssueType;
  issueTitle: string;
  description: string;
  photoUrl?: string;
  purchaseDate: string;
  createdAt: string;
  status: ComplaintStatus;
  dinkesNotes?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  label: string;
  isCustomGps?: boolean;
  accuracy?: number; // in meters
}
