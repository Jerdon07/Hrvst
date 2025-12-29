<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Crop;
use App\Models\CropPrice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPriceController extends Controller
{
    public function index()
    {
        $crops = Crop::with([
            'category',
            'latestPrice:id,crop_id,price_min,price_max,recorded_at'
        ])->get();

        return Inertia::render('admin/prices/index', [
            'crops' => $crops,
        ]);
    }

    public function create(Crop $crop)
    {
        $crop->load(['category', 'latestPrice']);

        return Inertia::render('admin/prices/create', [
            'crop' => $crop,
        ]);
    }

    public function store(Request $request, Crop $crop)
    {
        $validated = $request->validate([
            'price_min' => 'required|numeric|min:0|max:999.99|lte:price_max',
            'price_max' => 'required|numeric|min:0|max:999.99|gte:price_min',
        ]);

        CropPrice::updateOrCreate(
            [
                'crop_id' => $crop->id,
                'recorded_at' => now()->toDateString(),
            ],
            [
                'price_min' => $validated['price_min'],
                'price_max' => $validated['price_max'],
            ]
        );

        return redirect()
            ->route('admin.crops.show', $crop)
            ->with('success', 'Price updated successfully.');
    }
}   