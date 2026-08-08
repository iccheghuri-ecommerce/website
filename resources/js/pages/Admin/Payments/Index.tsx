import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;

const Index = ({ payments }: { payments: any }) => {
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [status, setStatus] = useState('');

    const openEditModal = (payment: any) => {
        setSelectedPayment(payment);
        setStatus(payment.status);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPayment) {
            return;
        }

        router.put(
            `/admin/payments/${selectedPayment.id}`,
            {
                status,
            },
            {
                onSuccess: () => {
                    setSelectedPayment(null);
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Manage Payments" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Manage Payments
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Verify transactions, match reference IDs, and confirm
                        status.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Txn ID / Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Booking Ref / User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Amount Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Note
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
                            {payments.data.map((payment: any) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-sm font-bold text-slate-900">
                                            {payment.transaction_id || 'N/A'}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase">
                                            {payment.method}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">
                                            {payment.booking?.booking_code}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {payment.booking?.user?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold whitespace-nowrap text-slate-900">
                                        {money(payment.amount)}
                                    </td>
                                    <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-600">
                                        {payment.note ?? '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                payment.status === 'verified'
                                                    ? 'bg-green-100 text-green-800'
                                                    : payment.status ===
                                                        'rejected'
                                                      ? 'bg-red-100 text-red-800'
                                                      : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                openEditModal(payment)
                                            }
                                            className="text-teal-600 hover:text-teal-900"
                                        >
                                            Verify
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {selectedPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-lg font-bold text-slate-900">
                                Verify Payment {selectedPayment?.transaction_id}
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
                                        <option value="pending">Pending</option>
                                        <option value="verified">
                                            Verified (Will credit Booking)
                                        </option>
                                        <option value="rejected">
                                            Rejected
                                        </option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPayment(null)}
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
