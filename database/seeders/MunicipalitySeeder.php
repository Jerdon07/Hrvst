<?php

namespace Database\Seeders;

use App\Models\Municipality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $municipalities = [
            'Atok',
            'Bakun',
            'Bokod',
            'Buguias',
            'Itogon',
            'Kabayan',
            'Kapangan',
            'Kibungan',
            'La Trinidad',
            'Mankayan',
            'Sablan',
            'Tuba',
            'Tublay',

            'Baguio City',
        ];

        foreach ($municipalities as $name) {
            Municipality::create(['name' => $name]);
        }
    }
}
