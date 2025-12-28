<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Crop;
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

        return Inertia::render('admin/crops/prices/index', [
            'crops' => $crops,
        ]);
    }
}
