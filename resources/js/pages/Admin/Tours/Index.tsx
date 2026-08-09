import { Head, Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import React from 'react';
import {
    FiTrendingUp,
    FiActivity,
    FiUsers,
    FiDollarSign,
} from 'react-icons/fi';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');

const Index = ({ tours, stats }: { tours: any; stats: any }) => {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tour?')) {
            router.delete(`/admin/tours/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Manage Tours" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
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

                {/* Stats Section */}
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-teal-50 p-3 text-teal-600">
                            <FiTrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Total Packages
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.total_tours}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                            <FiActivity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Active Packages
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.active_tours}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <FiUsers className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Active Booked Seats
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stats.total_seats_booked}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                            <FiDollarSign className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Potential Revenue
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {money(stats.total_potential_revenue)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table */}
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
                                    Seat Metrics
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Financials
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
                            {tours.data.map((tour: any) => {
                                const filledSeats =
                                    tour.booked_seats_count || 0;
                                const totalSeats = 45;
                                const occupancyRate = Math.round(
                                    (filledSeats / totalSeats) * 100,
                                );

                                return (
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
                                                Out:{' '}
                                                {fmtDate(tour.departure_at)}
                                            </div>
                                            <div>
                                                In: {fmtDate(tour.return_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                                                    <span>
                                                        {filledSeats}/
                                                        {totalSeats} Seats
                                                    </span>
                                                    <span>
                                                        {occupancyRate}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${
                                                            occupancyRate >= 90
                                                                ? 'bg-red-500'
                                                                : occupancyRate >=
                                                                    50
                                                                  ? 'bg-yellow-500'
                                                                  : 'bg-teal-500'
                                                        }`}
                                                        style={{
                                                            width: `${Math.min(occupancyRate, 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                                            <div className="font-medium text-slate-900">
                                                Earnings:{' '}
                                                {money(tour.total_revenue || 0)}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Rate: {money(tour.adult_price)}
                                            </div>
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
