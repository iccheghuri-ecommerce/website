import React from 'react';
import { useForm, Link } from '@inertiajs/react';

const Index = ({ user, bookings, payments }) => {
    // Form handling for profile update
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        number: user.number || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    // Helper status badge styles
    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-800 border-green-200',
            completed: 'bg-blue-100 text-blue-800 border-blue-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            verified: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-rose-100 text-rose-800 border-rose-200',
        };
        return `px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            {/* Header section */}
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    My Profile
                </h1>
                <p className="mt-1.5 text-sm text-gray-500">
                    Manage your account, bookings, and payments.
                </p>
            </div>

            {/* --- PROFILE INFORMATION --- */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-5 sm:px-6">
                    <h3 className="text-base font-semibold text-gray-900">
                        Personal Information
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        Update your contact details below.
                    </p>
                </div>

                <div className="px-4 py-5 sm:px-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                />
                                {errors.name && (
                                    <div className="mt-1 text-xs font-medium text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Email Display (Immutable) */}
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase">
                                    Email Address
                                </label>
                                <div className="mt-1.5 flex min-h-[38px] items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                                    <span className="truncate">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={data.number}
                                    onChange={(e) =>
                                        setData('number', e.target.value)
                                    }
                                    placeholder="Not provided"
                                    className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                />
                                {errors.number && (
                                    <div className="mt-1 text-xs font-medium text-red-500">
                                        {errors.number}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Save Changes button below fields */}
                        <div className="flex justify-end border-t border-gray-100 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full justify-center rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:opacity-60 sm:w-auto"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* --- BOOKINGS SECTION --- */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-5 sm:px-6">
                    <h3 className="text-base font-semibold text-gray-900">
                        Your Bookings
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        Overview of your recent tours and payment states.
                    </p>
                </div>

                {/* Mobile view for Bookings */}
                <div className="block divide-y divide-gray-100 sm:hidden">
                    {bookings.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                            You haven't booked any tours yet.
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            const remainingAmount =
                                booking.total_amount - booking.paid_amount;
                            return (
                                <div key={booking.id} className="space-y-3 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm font-bold text-indigo-600">
                                            {booking.booking_code}
                                        </span>
                                        <span
                                            className={getStatusBadge(
                                                booking.status,
                                            )}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {booking.tour?.title ||
                                                'Tour Details'}
                                        </p>
                                        <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                                            <p>
                                                Adults: {booking.adult_count} |
                                                Children: {booking.child_count}
                                            </p>
                                            <p className="text-gray-400">
                                                Couples: {booking.couple_count}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                                        <div className="text-xs">
                                            <p className="text-gray-500">
                                                Total:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    ৳{booking.total_amount}
                                                </span>
                                            </p>
                                            <p className="text-emerald-600">
                                                Paid:{' '}
                                                <span className="font-semibold">
                                                    ৳{booking.paid_amount}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            {remainingAmount > 0 &&
                                            booking.status !== 'cancelled' ? (
                                                <Link
                                                    href={`/bookings/${booking.booking_code}/pay`}
                                                    className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                                                >
                                                    Pay Rest (৳{remainingAmount}
                                                    )
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    Fully Paid / Settled
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Desktop view for Bookings */}
                <div className="hidden overflow-x-auto sm:block">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Booking no.
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Guests
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Financials
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        You haven't booked any tours yet.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => {
                                    const remainingAmount =
                                        booking.total_amount -
                                        booking.paid_amount;
                                    return (
                                        <tr
                                            key={booking.id}
                                            className="transition-colors hover:bg-gray-50/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-mono text-sm font-bold text-indigo-600">
                                                    {booking.booking_code}
                                                </div>
                                                <div className="mt-0.5 text-sm font-medium text-gray-900">
                                                    {booking.tour?.title ||
                                                        'Tour Details'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                <div className="font-medium text-gray-700">
                                                    Adults:{' '}
                                                    {booking.adult_count} |
                                                    Children:{' '}
                                                    {booking.child_count}
                                                </div>
                                                <div className="mt-0.5 text-xs text-gray-400">
                                                    Couples:{' '}
                                                    {booking.couple_count}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                <div className="font-medium">
                                                    Total: ৳
                                                    {booking.total_amount}
                                                </div>
                                                <div className="mt-0.5 text-xs font-semibold text-emerald-600">
                                                    Paid: ৳{booking.paid_amount}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={getStatusBadge(
                                                        booking.status,
                                                    )}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                {remainingAmount > 0 &&
                                                booking.status !==
                                                    'cancelled' ? (
                                                    <Link
                                                        href={`/bookings/${booking.booking_code}/pay`}
                                                        className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                                                    >
                                                        Pay Rest (৳
                                                        {remainingAmount})
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">
                                                        Fully Paid / Settled
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- PAYMENTS SECTION --- */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-5 sm:px-6">
                    <h3 className="text-base font-semibold text-gray-900">
                        Payment History
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        Tracks transaction records and verification status.
                    </p>
                </div>

                {/* Mobile view for Payments */}
                <div className="block divide-y divide-gray-100 sm:hidden">
                    {payments.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                            No payment logs found.
                        </div>
                    ) : (
                        payments.map((payment) => (
                            <div key={payment.id} className="space-y-2 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm font-bold text-gray-900">
                                        {payment.transaction_id || 'N/A'}
                                    </span>
                                    <span
                                        className={getStatusBadge(
                                            payment.status,
                                        )}
                                    >
                                        {payment.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div>
                                        <p>
                                            Ref:{' '}
                                            <span className="font-medium text-gray-700">
                                                {payment.booking?.booking_code}
                                            </span>
                                        </p>
                                        <p className="mt-0.5 inline-block rounded bg-gray-100 px-1 text-[10px] tracking-wider uppercase">
                                            {payment.method}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900">
                                            ৳{payment.amount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Desktop view for Payments */}
                <div className="hidden overflow-x-auto sm:block">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Booking No.
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {payments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No payment logs found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr
                                        key={payment.id}
                                        className="transition-colors hover:bg-gray-50/50"
                                    >
                                        <td className="px-6 py-4 font-mono text-sm font-bold whitespace-nowrap text-gray-900">
                                            {payment.transaction_id || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-500">
                                            {payment.booking?.booking_code}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium tracking-wide whitespace-nowrap text-gray-500 uppercase">
                                            {payment.method}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold whitespace-nowrap text-gray-900">
                                            ৳{payment.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={getStatusBadge(
                                                    payment.status,
                                                )}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
