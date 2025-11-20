<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Crop;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = [
            ['category_id' => 1, 'name' => 'Carrot', 'price' => 0],
            ['category_id' => 1, 'name' => 'Cabbage', 'price' => 0],
            ['category_id' => 2, 'name' => 'Banana', 'price' => 0],
        ];

        foreach ($crops as $crop) {
            Crop::create($crop);
        }

    }
}
