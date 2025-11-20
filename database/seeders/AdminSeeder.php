<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => env('ADMIN_NAME', 'Admin User'),
            'email' => env('ADMIN_EMAIL', 'admin@email.com'),
            'password' => bcrypt(env('ADMIN_PASSWORD', 'admin123')),
            'role' => 'admin',
            'status' => 'approved',
        ]);
    }
}
