<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Municipality;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDemoController extends Controller
{
    public function index()
    {
        $municipalities = Municipality::withCount('farmers')->get()
            ->map(function ($municipality) {
                return [
                    'id' => $municipality->id,
                    'name' => $municipality->name,
                    'farmer_count' => $municipality->farmers_count
                ];
            });
        
        $barangays = Municipality::with(['barangays' => function ($query) {
            $query->withCount('farmers');
        }])->get()->mapWithKeys(function ($municipality) {
            return [
                $municipality->id => $municipality->barangays->map(function ($barangay) {
                    return [
                        'id' => $barangay->id,
                        'name' => $barangay->name,
                        'farmer_count' => $barangay->farmers_count,
                    ];
                }),
            ];
        });

        return Inertia::render('admin/farmers/demographics/index', [
            'municipalities' => $municipalities,
            'barangays' => $barangays,
        ]);
    }
}
