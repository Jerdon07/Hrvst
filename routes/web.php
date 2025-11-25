<?php

use App\Http\Controllers\Admin\AdminCropController;
use App\Http\Controllers\Admin\AdminFarmerController;
use App\Http\Controllers\Admin\FarmerApprovalController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\FarmerProfileController;
use App\Http\Controllers\ProfileController;
use App\Models\Farmer;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// --------------------------------------------------------
// Public API routes for registration (No auth required)
// --------------------------------------------------------
Route::get('/public-api/barangays', function (Request $request) {
    $municipalityId = $request->input('municipality_id');
    $barangays = \App\Models\Barangay::where('municipality_id', $municipalityId)->get();
    return response()->json($barangays);
});

Route::get('/public-api/sitios', function (Request $request) {
    $barangayId = $request->input('barangay_id');
    $sitios = \App\Models\Sitio::where('barangay_id', $barangayId)->get();
    return response()->json($sitios);
});



Route::middleware('auth')->group(function () {
    Route::get('/pending', function() {
        if (Auth::user()->isApproved) {
            return redirect()->route('crop.index');
        } return Inertia::render('Auth/Pending');
    })->name('pending');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

// --------------------------------------------------------
// For All Users (Doesn't Requires checks)
// --------------------------------------------------------
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/crops', [CropController::class, 'index'])->name('crops');

// --------------------------------------------------------
// Dedicated Farmer Group (Requires ALL checks: auth, verified, farmer)
// --------------------------------------------------------
Route::middleware(['auth', 'verified', 'approved.farmer'])->group(function () {
    Route::get('/farmers', [FarmerController::class, 'index'])->name('farmers.index');
    Route::get('/farmers/{farmer}', [FarmerController::class, 'show'])->name('farmers.show');

    Route::get('/profile', [FarmerProfileController::class, 'show'])->name('profile.edit');
    Route::patch('/profile', [FarmerProfileController::class, 'update'])->name('profile.update');


    Route::get('/api/barangays', [FarmerController::class, 'getBarangays'])->name('farmer.api.barangays');
    Route::get('/api/sitios', [FarmerController::class, 'getSitios'])->name('farmer.api.sitios');
});

// --------------------------------------------------------
// Dedicated Admin Group (Requires ALL checks: auth, verified, admin)
// --------------------------------------------------------
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/crops', [AdminCropController::class, 'index'])->name('admin.crops.index'); // Read
    Route::get('/crops/create', [AdminCropController::class, 'create'])->name('admin.crops.create'); // Create
    Route::post('/crops', [AdminCropController::class, 'store'])->name('admin.crops.store'); // Store
    Route::post('/crops/{crop}', [AdminCropController::class, 'update'])->name('admin.crops.update'); // Update
    Route::delete('/crops/{crop}', [AdminCropController::class, 'destroy'])->name('admin.crops.destroy'); //Delete
    
    Route::get('/farmers', [AdminFarmerController::class, 'index'])->name('admin.farmers.index'); // Read
    Route::post('/farmers', [AdminFarmerController::class, 'approve'])->name('admin.farmers.approve'); // Store
    Route::delete('/farmers/{user}/approve', [AdminCropController::class, 'destroy'])->name('admin.farmers.destroy'); // Delete

    Route::get('/api/barangays', [AdminFarmerController::class, 'getBarangays'])->name('api.barangays');
    Route::get('/api/sitios', [AdminFarmerController::class, 'getSitios'])->name('api.sitios');
});

require __DIR__.'/auth.php';
