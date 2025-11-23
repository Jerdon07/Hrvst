<?php

use App\Http\Controllers\Admin\AdminCropController;
use App\Http\Controllers\Admin\AdminFarmerController;
use App\Http\Controllers\Admin\FarmerApprovalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --------------------------------------------------------
// Dedicated Farmer Group (Requires ALL checks: auth, verified, farmer)
// --------------------------------------------------------
Route::middleware(['auth', 'verified', 'role:farmer'])->group(function () {
    
    Route::get('crops', function () {
        return Inertia::render('Farmer/Crops');
    })->name('farmer.crops');

    Route::get('farmers', function () {
        return Inertia::render('Farmer/Farmers');
    })->name('farmer.farmers');

    Route::get('profile', function () {
        return Inertia::render('Farmer/Profile');
    })->name('farmer.profile');
});

// --------------------------------------------------------
// Dedicated Admin Group (Requires ALL checks: auth, verified, admin)
// --------------------------------------------------------
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/crops', [AdminCropController::class, 'index'])->name('crops.index');
    Route::get('/crops/create', [AdminCropController::class, 'create'])->name('crops.create');
    Route::post('/crops', [AdminCropController::class, 'store'])->name('crops.store');
    Route::put('/crops/{crop}', [AdminCropController::class, 'update'])->name('crops.update');
    
    Route::get('/farmers', [AdminFarmerController::class, 'index'])->name('farmers.index');
    Route::post('/farmers', [AdminFarmerController::class, 'approve'])->name('farmers.approve');
    Route::delete('/farmers/{user}/approve', [AdminCropController::class, 'destroy'])->name('farmers.destroy');

    Route::get('/api/barangays', [AdminFarmerController::class, 'getBarangays'])->name('api.barangays');
    

    Route::get('crops', function () {
        return Inertia::render('Admin/Crops');
    })->name('admin.crops');

    Route::get('crops/crop', function () {
        return Inertia::render('Admin/Accounts');
    })->name('admin.accounts');

    Route::get('accounts/pending', [FarmerApprovalController::class, 'index'])
        ->name('admin.accounts.pending');

    Route::post('accounts/approve-all', [FarmerApprovalController::class, 'approveAll'])
        ->name('admin.accounts.approveAll');

    Route::post('accounts/{id}/approve', [FarmerApprovalController::class, 'approve'])
        ->name('admin.accounts.approve');
});

require __DIR__.'/auth.php';
