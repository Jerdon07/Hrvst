<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CropController extends Controller
{
    public function index(Request $request)
    {
        $query = Crop::orderBy('name', 'asc')->with('category'); // Index crop from A to Z

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by crop name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $crops = $query->get();
        $categories = Category::withCount('crops')->get();

        return Inertia::render('crops/index', [
            'crops' => $crops,
            'categories' => $categories,
            'filters' => [
                'category_id' => $request->category_id,
                'search' => $request->search,
            ],
        ]);
    }

    public function show(Crop $crop)
    {
        
    }

    public function weekly($id)
    {
        $data = DB::table('crops')
            ->selectRaw('
                strftime("%Y-%W", recorded_at) as week,
                AVG((price_min + price_max) / 2.0) as avg_price
            ')
            ->where('crop_id', $id)
            ->groupBy('week')
            ->orderBy('week')
            ->get();

        return response()->json([
            'labels' => $data->pluck('week'),
            'data' => $data->pluck('avg_price')
        ]);
    }
}