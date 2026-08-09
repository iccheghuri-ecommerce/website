import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    FiUsers,
    FiShield,
    FiBriefcase,
    FiPhoneCall,
    FiSearch,
    FiSliders,
} from 'react-icons/fi';

const Index = ({
    users,
    stats,
    filters,
}: {
    users: any;
    stats: any;
    filters: any;
}) => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [nidNo, setNidNo] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search ?? '');
    const [roleFilter, setRoleFilter] = useState(filters.role ?? '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/users',
            {
                search: searchTerm,
                role: roleFilter,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleFilterChange = (val: string) => {
        setRoleFilter(val);
        router.get(
            '/admin/users',
            {
                search: searchTerm,
                role: val,
            },
            {
                preserveState: true,
            },
        );
    };

    const openEditModal = (user: any) => {
        setSelectedUser(user);
        setName(user.name);
        setNumber(user.number ?? '');
        setNidNo(user.nid_no ?? '');
        setBloodGroup(user.blood_group ?? '');
        setAddress(user.address ?? '');
        setEmergencyContact(user.emergency_contact ?? '');
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
                nid_no: nidNo,
                blood_group: bloodGroup,
                address,
                emergency_contact: emergencyContact,
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

                {/* Stats Section */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-teal-50 p-3 text-teal-600">
                            <FiUsers className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Total Users
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.total_users}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                            <FiShield className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Administrators
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.admins_count}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <FiBriefcase className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Active Bookers
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.active_bookers}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                            <FiPhoneCall className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Phone Added
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.phone_verified_count}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex max-w-md flex-1"
                    >
                        <input
                            type="text"
                            placeholder="Search by name, email, phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="absolute top-3 left-3 text-slate-400"
                        >
                            <FiSearch className="h-4 w-4" />
                        </button>
                    </form>

                    <div className="flex items-center gap-2">
                        <FiSliders className="h-4 w-4 text-slate-400" />
                        <select
                            value={roleFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Administrators</option>
                            <option value="user">Regular Users</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
                                    <label className="block text-sm font-medium text-slate-700">
                                        NID Number
                                    </label>
                                    <input
                                        type="text"
                                        value={nidNo}
                                        onChange={(e) =>
                                            setNidNo(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Blood Group
                                    </label>
                                    <select
                                        value={bloodGroup}
                                        onChange={(e) =>
                                            setBloodGroup(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    >
                                        <option value="">Not selected</option>
                                        {[
                                            'A+',
                                            'A-',
                                            'B+',
                                            'B-',
                                            'AB+',
                                            'AB-',
                                            'O+',
                                            'O-',
                                        ].map((bg) => (
                                            <option key={bg} value={bg}>
                                                {bg}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={emergencyContact}
                                        onChange={(e) =>
                                            setEmergencyContact(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Address
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
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
