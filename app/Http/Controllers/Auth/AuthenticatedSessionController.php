<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        Log::info('User logged in', [
            'user_id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
        ]);

        if ($user->role === 'farmer') {
            Log::info('Redirecting to farmer.crops');
            return redirect()->route('farmer.crops');
        };
        if ($user->role === 'admin') {
            Log::info('Redirecting to admin.prices');
            return redirect()->route('admin.prices');
        };

        Log::error('No valid role found', ['role' => $user->role]);
        return abort(403, 'Unauthorized action.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
