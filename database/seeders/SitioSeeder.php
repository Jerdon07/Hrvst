<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Sitio;
use Illuminate\Database\Seeder;

class SitioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Atok
        $ambiang = Barangay::where('name', 'Ambiang')->first();
            $ambiangs = ['Cabalitian', 'Calunetan', 'Fugu', 'Lingsat', 'Magsaysay', 'Pangil', 'Sibucao'];
        foreach ($ambiangs as $sitio) {
            Sitio::create([
                'barangay_id' => $ambiang->id,
                'name' => $sitio,
            ]);
        }

        $caliking = Barangay::where('name', 'Caliking')->first();
            $calikings = ['Bannawag', 'Capangan', 'Daclan', 'Laoag', 'Mabato', 'Poblacion', 'San Isidro'];
        foreach ($calikings as $sitio) {
            Sitio::create([
                'barangay_id' => $caliking->id,
                'name' => $sitio,
            ]);
        }
    }
}
