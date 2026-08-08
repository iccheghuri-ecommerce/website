import { Head, Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import React from 'react';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');

const Index = ({ tours }: { tours: any }) => {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tour?')) {
            router.delete(`/admin/tours/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Manage Tours" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Tour Packages
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Create, update and manage travel packages.
                        </p>
                    </div>
                    <Link
                        href="/admin/tours/create"
                        className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
                    >
                        Create New Tour
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Tour Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Departure / Return
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Pricing
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
                            {tours.data.map((tour: any) => (
                                <tr key={tour.id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={tour.thumbnail}
                                                alt=""
                                                className="h-10 w-16 rounded bg-slate-100 object-cover"
                                            />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">
                                                    {tour.title}
                                                </div>
                                                <div className="max-w-xs truncate text-xs text-slate-500">
                                                    {tour.short_description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                        <div>
                                            Out: {fmtDate(tour.departure_at)}
                                        </div>
                                        <div>In: {fmtDate(tour.return_at)}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                        <div>
                                            Single: {money(tour.adult_price)}
                                        </div>
                                        {tour.couple_price && (
                                            <div>
                                                Couple:{' '}
                                                {money(tour.couple_price)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                tour.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-slate-100 text-slate-800'
                                            }`}
                                        >
                                            {tour.is_active
                                                ? 'Active'
                                                : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <Link
                                            href={`/admin/tours/${tour.id}/edit`}
                                            className="mr-4 text-teal-600 hover:text-teal-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(tour.id)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
