<?php

namespace Database\Seeders;

use App\Models\Depot;
use App\Models\WaterProduct;
use App\Models\Review;
use App\Models\Order;
use Illuminate\Database\Seeder;

class DepotSeeder extends Seeder
{
    public function run(): void
    {
        // Get the depot user created in DatabaseSeeder
        $depotUserId = \App\Models\User::where('role', 'depot')->first()->id ?? null;

        // 1. Depot Tirta Sehat Kertajaya (Gubeng)
        $d1 = Depot::create([
            'user_id' => $depotUserId,
            'slug' => 'depot-tirta-sehat-kertajaya',
            'name' => 'Depot Tirta Sehat Kertajaya',
            'tagline' => 'Air Minum RO 8 Tahap Bersertifikat Dinkes Surabaya & Uji BBLK',
            'address' => 'Jl. Kertajaya No. 88, RT.03/RW.05, Kel. Airlangga',
            'district' => 'Gubeng',
            'city' => 'Surabaya',
            'lat' => -7.2785,
            'lng' => 112.7590,
            'phone' => '0812-3131-4455',
            'whatsapp' => '6281231314455',
            'open_hours' => '06:30 - 21:30 WIB',
            'is_open' => true,
            'rating' => 4.9,
            'review_count' => 164,
            'cover_image' => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
            'is_certified' => true,
            'slhs_number' => 'SLHS-3578/08/DINKES-SBY/2025',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '10 Januari 2025',
            'expiry_date' => '10 Januari 2028',
            'grade' => 'A (Sangat Baik)',
            'certification_status' => 'AKTIF',
            'last_tested_date' => '18 Agustus 2026',
            'lab_name' => 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
            'tds_ppm' => 16,
            'ph_level' => 7.4,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => true,
            'new_gallon_fee' => 35000,
            'facilities' => [
                'Membran Reverse Osmosis 0.0001 Mikron',
                'Sterilisasi Lampu UV Philips 12 GPM',
                'Ozon Generator (O3) Pembunuh Spora',
                'Pencucian Sikat & Jet Spray Otomatis',
                'Segel Tutup Higienis & Plastik Pelindung'
            ]
        ]);

        WaterProduct::create([
            'depot_id' => $d1->id,
            'name' => 'Isi Ulang Reverse Osmosis (RO) Murni',
            'type' => 'ro',
            'price' => 8000,
            'description' => 'TDS super rendah 16 ppm, sangat segar, murni bebas kapur dan logam.',
            'tds_avg' => 16,
        ]);
        WaterProduct::create([
            'depot_id' => $d1->id,
            'name' => 'Isi Ulang Mineral Pegunungan Segar',
            'type' => 'mineral',
            'price' => 6000,
            'description' => 'Air mineral steril higienis dengan mineral esensial seimbang.',
            'tds_avg' => 60,
        ]);
        WaterProduct::create([
            'depot_id' => $d1->id,
            'name' => 'Isi Ulang Bio-Alkali Sehat (pH 8.5)',
            'type' => 'alkali',
            'price' => 12000,
            'description' => 'Air alkali kaya antioksidan menyeimbangkan asam tubuh.',
            'tds_avg' => 80,
        ]);

        Review::create([
            'depot_id' => $d1->id,
            'user_name' => 'Bayu Wicaksono',
            'rating' => 5,
            'clarity_rating' => 5,
            'taste_rating' => 5,
            'cleanliness_rating' => 5,
            'service_rating' => 5,
            'comment' => 'Airnya jernih pol! TDS dites di depan mata cuma 16 ppm. Galon dicuci luar dalam pakai semprotan ozon. Lokasi dekat kampus Unair & RSUD Dr. Soetomo.',
            'tags' => ['Air Sangat Jernih', 'TDS Rendah', 'Tutup Disegel', 'Surabaya Timur'],
            'is_verified_purchase' => true
        ]);
        Review::create([
            'depot_id' => $d1->id,
            'user_name' => 'Nadia Salsabila',
            'rating' => 5,
            'clarity_rating' => 5,
            'taste_rating' => 5,
            'cleanliness_rating' => 5,
            'service_rating' => 5,
            'comment' => 'Order pickup lewat Minum.in praktis banget. Pas ambil galon sudah terisi dan disegel rapi. Sertifikat Dinkes Surabaya dipajang jelas.',
            'tags' => ['Pickup Cepat', 'Higienis', 'Rasa Segar'],
            'is_verified_purchase' => true
        ]);

        // 2. Depot AquaPure Rungkut Madya (Rungkut)
        $d2 = Depot::create([
            'slug' => 'depot-aquapure-rungkut-madya',
            'name' => 'Depot AquaPure Rungkut Madya',
            'tagline' => 'Pelopor Depot Air Minum Higienis di Kawasan Rungkut & SIER Surabaya',
            'address' => 'Jl. Rungkut Madya No. 45, Rungkut Kidul',
            'district' => 'Rungkut',
            'city' => 'Surabaya',
            'lat' => -7.3260,
            'lng' => 112.7795,
            'phone' => '0813-5566-7788',
            'whatsapp' => '6281355667788',
            'open_hours' => '06:00 - 22:00 WIB',
            'is_open' => true,
            'rating' => 4.8,
            'review_count' => 118,
            'cover_image' => 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
            'is_certified' => true,
            'slhs_number' => 'SLHS-3578/11/DINKES-SBY/2024',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '15 November 2024',
            'expiry_date' => '15 November 2027',
            'grade' => 'A (Sangat Baik)',
            'certification_status' => 'AKTIF',
            'last_tested_date' => '02 Agustus 2026',
            'lab_name' => 'Laboratorium Kesehatan Daerah (Labkesda) Kota Surabaya',
            'tds_ppm' => 20,
            'ph_level' => 7.2,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => true,
            'new_gallon_fee' => 38000,
            'facilities' => [
                'Double Filter Katrid Sedimen 1 Mikron',
                'Sistem Sterilisasi UV 2 Chamber',
                'Pembersih Ozon Tutup Galon',
                'Tangki Stainless SUS-304 Food Grade'
            ]
        ]);

        WaterProduct::create([
            'depot_id' => $d2->id,
            'name' => 'Isi Ulang RO Ultra-Pure',
            'type' => 'ro',
            'price' => 8500,
            'description' => 'Penyaringan nano-filter, rasa segar murni tanpa endapan.',
            'tds_avg' => 20,
        ]);
        WaterProduct::create([
            'depot_id' => $d2->id,
            'name' => 'Isi Ulang Mineral Steril',
            'type' => 'mineral',
            'price' => 6500,
            'description' => 'Air minum mineral bersih berstandar SNI.',
            'tds_avg' => 68,
        ]);

        // 3. Depot Barokah Tirta Sukolilo (ITS)
        $d3 = Depot::create([
            'slug' => 'depot-barokah-tirta-sukolilo',
            'name' => 'Depot Barokah Tirta Sukolilo',
            'tagline' => 'Favorit Mahasiswa & Warga Sekitar Kampus ITS Surabaya',
            'address' => 'Jl. Gebang Putih No. 16, Sukolilo',
            'district' => 'Sukolilo',
            'city' => 'Surabaya',
            'lat' => -7.2845,
            'lng' => 112.7932,
            'phone' => '0857-3344-9900',
            'whatsapp' => '6285733449900',
            'open_hours' => '07:00 - 22:00 WIB',
            'is_open' => true,
            'rating' => 4.8,
            'review_count' => 95,
            'cover_image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
            'is_certified' => true,
            'slhs_number' => 'SLHS-3578/04/DINKES-SBY/2024',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '12 April 2024',
            'expiry_date' => '12 April 2027',
            'grade' => 'A (Sangat Baik)',
            'certification_status' => 'AKTIF',
            'last_tested_date' => '24 Juli 2026',
            'lab_name' => 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
            'tds_ppm' => 22,
            'ph_level' => 7.3,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => true,
            'new_gallon_fee' => 32000,
            'facilities' => [
                'Filter Karbon Aktif Granular Batok Kelapa',
                'Sterilisator Sinar Ultraviolet',
                'Penyemprotan Nozzle Otomatis'
            ]
        ]);

        WaterProduct::create([
            'depot_id' => $d3->id,
            'name' => 'Isi Ulang RO Sehat Murni',
            'type' => 'ro',
            'price' => 7500,
            'description' => 'Kemurnian tinggi bebas bakteri, ramah di kantong mahasiswa.',
            'tds_avg' => 22,
        ]);
        WaterProduct::create([
            'depot_id' => $d3->id,
            'name' => 'Isi Ulang Mineral Pegunungan',
            'type' => 'mineral',
            'price' => 5000,
            'description' => 'Pilihan hemat dan segar untuk anak kos & keluarga.',
            'tds_avg' => 55,
        ]);

        // 4. Depot HydroLife Darmo (Wonokromo)
        $d4 = Depot::create([
            'slug' => 'depot-hydrolife-darmo',
            'name' => 'Depot HydroLife Darmo',
            'tagline' => 'Spesialis Air Reverse Osmosis & Bio-Alkali Hexagonal Standar Medis',
            'address' => 'Jl. Raya Darmo Permai I No. 24, Wonokromo',
            'district' => 'Wonokromo',
            'city' => 'Surabaya',
            'lat' => -7.2940,
            'lng' => 112.7345,
            'phone' => '0812-7788-2211',
            'whatsapp' => '6281277882211',
            'open_hours' => '07:00 - 21:00 WIB',
            'is_open' => true,
            'rating' => 4.9,
            'review_count' => 142,
            'cover_image' => 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
            'is_certified' => true,
            'slhs_number' => 'SLHS-3578/02/DINKES-SBY/2026',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '15 Februari 2026',
            'expiry_date' => '15 Februari 2029',
            'grade' => 'A (Sangat Baik)',
            'certification_status' => 'AKTIF',
            'last_tested_date' => '20 Agustus 2026',
            'lab_name' => 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
            'tds_ppm' => 12,
            'ph_level' => 7.6,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => true,
            'new_gallon_fee' => 40000,
            'facilities' => [
                'Penyaringan RO 7 Tahap Standar Medis',
                'Filter Remineralisasi Bio-Alkali Alami pH 8.5',
                'Sterilisator Tabung Stainless 4 Lampu UV'
            ]
        ]);

        WaterProduct::create([
            'depot_id' => $d4->id,
            'name' => 'Isi Ulang RO Ultra-Pure',
            'type' => 'ro',
            'price' => 10000,
            'description' => 'TDS hanya 12 ppm, kemurnian maksimal standar laboratorium.',
            'tds_avg' => 12,
        ]);
        WaterProduct::create([
            'depot_id' => $d4->id,
            'name' => 'Isi Ulang Bio-Alkali Hexagonal',
            'type' => 'alkali',
            'price' => 15000,
            'description' => 'Air micro-cluster berenergi, mudah diserap sel tubuh.',
            'tds_avg' => 55,
        ]);

        // 5. Depot Tirta Manyar (Proses Uji Ulang)
        $d5 = Depot::create([
            'slug' => 'depot-tirta-manyar',
            'name' => 'Depot Tirta Manyar (Proses Uji Ulang)',
            'tagline' => 'Depot Air Minum Isi Ulang Biasa & Galon Bermerek',
            'address' => 'Jl. Manyar Kertoarjo V No. 9, Mulyorejo',
            'district' => 'Mulyorejo',
            'city' => 'Surabaya',
            'lat' => -7.2730,
            'lng' => 112.7660,
            'phone' => '0878-9900-1122',
            'whatsapp' => '6287899001122',
            'open_hours' => '08:00 - 19:00 WIB',
            'is_open' => true,
            'rating' => 3.9,
            'review_count' => 38,
            'cover_image' => 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
            'is_certified' => false,
            'slhs_number' => 'DALAM PENGAJUAN PERPANJANGAN',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '10 Mei 2022',
            'expiry_date' => '10 Mei 2025 (Kedaluwarsa)',
            'grade' => 'C (Cukup)',
            'certification_status' => 'PROSES_RENEWAL',
            'last_tested_date' => '10 April 2025 (Perlu Uji Ulang)',
            'lab_name' => 'Labkesda Surabaya',
            'tds_ppm' => 120,
            'ph_level' => 6.9,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => false,
            'new_gallon_fee' => 0,
            'facilities' => ['Filter Karbon Biasa', '1 Lampu UV Standar']
        ]);

        WaterProduct::create([
            'depot_id' => $d5->id,
            'name' => 'Isi Ulang Mineral Standar',
            'type' => 'mineral',
            'price' => 4500,
            'description' => 'Air minum mineral biasa terfilter standar.',
            'tds_avg' => 120,
        ]);

        // 6. Depot Crystal Clear Jemursari
        $d6 = Depot::create([
            'slug' => 'depot-crystal-clear-jemursari',
            'name' => 'Depot Crystal Clear Jemursari',
            'tagline' => 'DAMIU Resmi Bersertifikat Laik Sehat Dinkes Surabaya Grade A',
            'address' => 'Jl. Raya Jemursari No. 112, Wonocolo',
            'district' => 'Wonocolo',
            'city' => 'Surabaya',
            'lat' => -7.3180,
            'lng' => 112.7480,
            'phone' => '0812-9988-1122',
            'whatsapp' => '6281299881122',
            'open_hours' => '06:00 - 21:00 WIB',
            'is_open' => true,
            'rating' => 4.9,
            'review_count' => 104,
            'cover_image' => 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
            'is_certified' => true,
            'slhs_number' => 'SLHS-3578/06/DINKES-SBY/2025',
            'dinkes_region' => 'Dinas Kesehatan Kota Surabaya',
            'issued_date' => '18 Juni 2025',
            'expiry_date' => '18 Juni 2028',
            'grade' => 'A (Sangat Baik)',
            'certification_status' => 'AKTIF',
            'last_tested_date' => '01 September 2026',
            'lab_name' => 'Balai Besar Laboratorium Kesehatan (BBLK) Surabaya',
            'tds_ppm' => 14,
            'ph_level' => 7.5,
            'ecoli_status' => 'Negatif (0 CFU/100ml)',
            'coliform_status' => 'Negatif (0 CFU/100ml)',
            'is_lab_passed' => true,
            'new_gallon_fee' => 35000,
            'facilities' => [
                'Membran RO Dow Filmtec 500 GPD',
                'Penyaringan Bio Keramik Mineral',
                'Sterilisator Ozon 500mg/jam',
                'Mesin Cuci Dalam Galon Otomatis High-Pressure'
            ]
        ]);

        WaterProduct::create([
            'depot_id' => $d6->id,
            'name' => 'Isi Ulang Reverse Osmosis (RO)',
            'type' => 'ro',
            'price' => 8500,
            'description' => 'Air murni hasil pemfilteran membran nano, bebas kuman dan kerak mineral.',
            'tds_avg' => 14,
        ]);
        WaterProduct::create([
            'depot_id' => $d6->id,
            'name' => 'Isi Ulang Mineral Segar',
            'type' => 'mineral',
            'price' => 6000,
            'description' => 'Air mineral steril higienis dengan kesegaran alami.',
            'tds_avg' => 55,
        ]);

        // Sample initial active pickup order
        Order::create([
            'order_number' => 'MINUM-SBY-001',
            'queue_number' => '#A-06',
            'depot_id' => $d1->id,
            'customer_name' => 'Leroy',
            'customer_phone' => '0812-3456-7890',
            'water_product_name' => 'Isi Ulang Reverse Osmosis (RO) Murni',
            'water_type' => 'ro',
            'unit_price' => 8000,
            'quantity' => 2,
            'gallon_option' => 'bring_own',
            'gallon_fee' => 0,
            'total_amount' => 16000,
            'pickup_time_estimated' => '17:15 WIB (15 Menit lagi)',
            'pickup_pin' => '4921',
            'status' => 'SEDANG_DIISI',
            'notes' => 'Tolong disemprot ozon tutupnya ya mas',
        ]);
    }
}
