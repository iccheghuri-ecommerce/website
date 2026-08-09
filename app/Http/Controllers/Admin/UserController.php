<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $role = $request->input('role');
            if ($role === 'admin') {
                $query->where('is_admin', true);
            } elseif ($role === 'user') {
                $query->where('is_admin', false);
            }
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        $stats = [
            'total_users' => User::count(),
            'admins_count' => User::where('is_admin', true)->count(),
            'active_bookers' => User::has('bookings')->count(),
            'phone_verified_count' => User::whereNotNull('number')->count(),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'stats' => $stats,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'nullable|string|max:20',
            'is_admin' => 'required|boolean',
        ]);

        $user->update($data);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }
}
