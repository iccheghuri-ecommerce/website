import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
    FiTrendingUp,
    FiCheckCircle,
    FiUsers,
    FiDollarSign,
    FiSearch,
    FiSliders,
} from 'react-icons/fi';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');

const Index = ({
    bookings,
    stats,
    filters,
}: {
    bookings: any;
    stats: any;
    filters: any;
}) => {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [status, setStatus] = useState('');
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [adminNote, setAdminNote] = useState('');
    const [searchTerm, setSearchTerm] = useState(filters.search ?? '');
    const [statusFilter, setStatusFilter] = useState(filters.status ?? '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/bookings',
            {
                search: searchTerm,
                status: statusFilter,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleFilterChange = (val: string) => {
        setStatusFilter(val);
        router.get(
            '/admin/bookings',
            {
                search: searchTerm,
                status: val,
            },
            {
                preserveState: true,
            },
        );
    };

    const openEditModal = (booking: any) => {
        setSelectedBooking(booking);
        setStatus(booking.status);
        setPaidAmount(booking.paid_amount);
        setAdminNote(booking.admin_note ?? '');
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedBooking) {
            return;
        }

        router.put(
            `/admin/bookings/${selectedBooking.id}`,
            {
                status,
                paid_amount: paidAmount,
                admin_note: adminNote,
            },
            {
                onSuccess: () => {
                    setSelectedBooking(null);
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Manage Bookings" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Manage Bookings
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        View customer bookings, update payments, status, and
                        track seats.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-teal-50 p-3 text-teal-600">
                            <FiTrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Total Bookings
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.total_bookings}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                            <FiCheckCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Active Bookings
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.active_bookings}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <FiUsers className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Total Seats Booked
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.total_seats_claimed}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                            <FiDollarSign className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Revenue Collected
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {money(stats.total_revenue)}
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
                            placeholder="Search bookings, users, phone..."
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
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Booking Code / User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Tour Package
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Seats Booked
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Payment status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {bookings.data.map((booking: any) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-900">
                                            {booking.booking_code}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {booking.user?.name} (
                                            {booking.user?.number ?? 'No phone'}
                                            )
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">
                                            {booking.tour?.title}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Departs:{' '}
                                            {fmtDate(
                                                booking.tour?.departure_at,
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                        <div className="flex max-w-[200px] flex-wrap gap-1">
                                            {booking.seats
                                                ? booking.seats.map(
                                                      (seat: string) => (
                                                          <span
                                                              key={seat}
                                                              className="rounded bg-teal-50 px-1.5 py-0.5 text-xs font-bold text-teal-700"
                                                          >
                                                              {seat}
                                                          </span>
                                                      ),
                                                  )
                                                : 'None'}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-400">
                                            Total:{' '}
                                            {booking.seats
                                                ? booking.seats.length
                                                : 0}{' '}
                                            seats
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                        <div>
                                            Paid: {money(booking.paid_amount)}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Total: {money(booking.total_amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                booking.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : booking.status ===
                                                        'cancelled'
                                                      ? 'bg-red-100 text-red-800'
                                                      : 'bg-teal-100 text-teal-800'
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                openEditModal(booking)
                                            }
                                            className="text-teal-600 hover:text-teal-900"
                                        >
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {selectedBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-bold text-slate-900">
                                Manage Booking {selectedBooking?.booking_code}
                            </h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Paid Amount (৳)
                                    </label>
                                    <input
                                        type="number"
                                        value={paidAmount}
                                        onChange={(e) =>
                                            setPaidAmount(
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        Total Booking Price:{' '}
                                        {selectedBooking
                                            ? money(
                                                  selectedBooking.total_amount,
                                              )
                                            : ''}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Booked Seats Map
                                    </label>
                                    <div className="mt-1 flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
                                        {selectedBooking.seats &&
                                        selectedBooking.seats.length > 0 ? (
                                            selectedBooking.seats.map(
                                                (seat: string) => (
                                                    <span
                                                        key={seat}
                                                        className="rounded bg-teal-600 px-2.5 py-1 font-mono text-xs font-bold text-white"
                                                    >
                                                        {seat}
                                                    </span>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-sm text-slate-500">
                                                No seats reserved
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Travelers Info
                                    </label>
                                    <div className="mt-1 max-h-48 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
                                        {selectedBooking.travelers &&
                                        selectedBooking.travelers.length > 0 ? (
                                            selectedBooking.travelers.map(
                                                (traveler: any) => (
                                                    <div
                                                        key={traveler.id}
                                                        className="border-b border-slate-200 pb-2 text-xs text-slate-700 last:border-b-0 last:pb-0"
                                                    >
                                                        <p className="font-bold text-teal-800">
                                                            Seat{' '}
                                                            {
                                                                traveler.seat_number
                                                            }
                                                            : {traveler.name}
                                                        </p>
                                                        <p>
                                                            Phone:{' '}
                                                            {traveler.phone}
                                                        </p>
                                                        {traveler.nid_no && (
                                                            <p>
                                                                NID:{' '}
                                                                {
                                                                    traveler.nid_no
                                                                }
                                                            </p>
                                                        )}
                                                        {traveler.blood_group && (
                                                            <p>
                                                                Blood:{' '}
                                                                {
                                                                    traveler.blood_group
                                                                }
                                                            </p>
                                                        )}
                                                        {traveler.address && (
                                                            <p>
                                                                Address:{' '}
                                                                {
                                                                    traveler.address
                                                                }
                                                            </p>
                                                        )}
                                                        {traveler.emergency_contact && (
                                                            <p>
                                                                Emergency:{' '}
                                                                {
                                                                    traveler.emergency_contact
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <span className="text-sm text-slate-500">
                                                No travelers details
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Admin Note
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={adminNote}
                                        onChange={(e) =>
                                            setAdminNote(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBooking(null)}
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
