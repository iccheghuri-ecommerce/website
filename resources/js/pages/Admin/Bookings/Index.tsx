import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');

const Index = ({ bookings }: { bookings: any }) => {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [status, setStatus] = useState('');
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [adminNote, setAdminNote] = useState('');

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
                                            {booking.user?.number})
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
                                        <div className="flex flex-wrap gap-1">
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
