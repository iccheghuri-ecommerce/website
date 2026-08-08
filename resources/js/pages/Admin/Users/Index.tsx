import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

const Index = ({ users }: { users: any }) => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const openEditModal = (user: any) => {
        setSelectedUser(user);
        setName(user.name);
        setNumber(user.number ?? '');
        setIsAdmin(!!user.is_admin);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser) {
return;
}

        router.put(
            `/admin/users/${selectedUser.id}`,
            {
                name,
                number,
                is_admin: isAdmin,
            },
            {
                onSuccess: () => {
                    setSelectedUser(null);
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Manage Users" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Manage Users
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        View registered users and manage details and
                        permissions.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Name / Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {users.data.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-900">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                        {user.number ?? '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                user.is_admin
                                                    ? 'bg-teal-100 text-teal-800'
                                                    : 'bg-slate-100 text-slate-800'
                                            }`}
                                        >
                                            {user.is_admin
                                                ? 'Administrator'
                                                : 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="text-teal-600 hover:text-teal-900"
                                        >
                                            Edit Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-bold text-slate-900">
                                Edit User Details: {selectedUser.email}
                            </h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={number}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isAdmin}
                                            onChange={(e) =>
                                                setIsAdmin(e.target.checked)
                                            }
                                            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <span className="text-sm text-slate-700">
                                            Administrator privileges
                                        </span>
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedUser(null)}
                                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
