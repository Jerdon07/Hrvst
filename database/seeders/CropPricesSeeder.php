<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\CropPrice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CropPricesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = Crop::all();

        foreach ($crops as $crop) {
            $date = now()->startOfWeek()->subWeeks(8);
            
            for ($i = 0; $i < 8; $i++) {
                CropPrice::updateOrCreate(
                    [
                        'crop_id' => $crop->id,
                        'recorded_at' => $date,
                    ],
                    [
                        'price_min' => rand(20, 50),
                        'price_max' => rand(60, 100),
                    ]
                );

                $date->addWeek();
            }

        }
    }
}
