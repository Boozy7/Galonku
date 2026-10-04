<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin Dinkes
        User::updateOrCreate(
            ['email' => 'admin@dinkes.surabaya.go.id'],
            [
                'name' => 'Admin Dinkes Surabaya',
                'password' => bcrypt('password'),
                'role' => 'dinkes',
            ]
        );

        // 2. Depot Owner (Mitra)
        $depotUser = User::updateOrCreate(
            ['email' => 'mitra@galonku.com'],
            [
                'name' => 'Budi Pemilik Depot',
                'password' => bcrypt('password'),
                'role' => 'depot',
            ]
        );

        // 3. Warga / Consumer
        User::updateOrCreate(
            ['email' => 'warga@example.com'],
            [
                'name' => 'Warga Surabaya',
                'password' => bcrypt('password'),
                'role' => 'user',
            ]
        );

        $this->call([
            DepotSeeder::class,
        ]);
    }
}
