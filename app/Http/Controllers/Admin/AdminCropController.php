<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Crop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCropController extends Controller
{
    public function index()
    {
        $crops = Crop::with('category')->get();

        return Inertia::render('admin/crops/index', [
            'crops' => $crops,
        ]);
    }

    public function show(Crop $crop)
    {
        return Inertia::render('admin/crops/Show', [
            'crop' => $crop
        ]);
    }

    public function create(Request $request, Crop $crop)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'low_price' => 'required|numeric|min:0|max:999999.99',
            'high_price' => 'required|numeric|min:0|max:999999.99|gte:low_price',
            'harvest_weeks' => 'required|integer|min:1|max:52',
            'category_id' => 'required|exists:categories,id',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('crops', 'public');
            $validate['image_path'] = $path;
        }

        $crop->create($validate);



        return redirect()->route('crops.index')
            ->with('success', 'Crop created successfully.');
    }

    public function update(Request $request, Crop $crop)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'low_price' => 'required|numeric|min:0|max:999999.99',
            'high_price' => 'required|numeric|min:0|max:999999.99|gte:low_price',
            'harvest_weeks' => 'required|integer|min:1|max:52',
            'category_id' => 'required|exists:categories,id',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image_path')) {
            if ($crop->image_path) {
                Storage::disk('public')->delete($crop->image_path);
            }

            $path = $request->file('image_path')->store('crops', 'public');
            $validated['image_path'] = $path;
        }

        $crop->update($validated);

        return redirect()->route('crops.index')
            ->with('success', 'Crop updated successfully.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price_min' => 'required|numeric|min:0|max:999999.99',
            'price_max' => 'required|numeric|min:0|max:999999.99|gte:low_price',
            'crop_weeks' => 'required|integer|min:1|max:52',
            'recorded_at' => 'required|date',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('crops', 'public');
            $validated['image_path'] = $path;
        }

        Crop::create($validated);

        return redirect()->route('crops.index')
            ->with('success', 'Crop created successfully.');
    }

    public function destroy(Crop $crop)
    {
        if ($crop->image) {
            Storage::disk('public')->delete($crop->image);
        }

        $crop->delete();

        return redirect()->route('crops.index')
            ->with('success', 'Crop deleted successfully.');
    }
}
