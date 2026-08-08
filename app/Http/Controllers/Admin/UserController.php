<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
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
