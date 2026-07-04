import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';

const money = (n) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date) => dayjs(date).format('D MMM YYYY');

const Index = ({ tour, selection, user }) => {
    // FIXED: Changed field name from 'notes' to 'note' to match backend validation rule
    const { data, setData, post, processing, errors } = useForm({
        note: '',
        adults: selection.adults ?? 0,
        couples: selection.couples ?? 0,
        children: selection.children ?? 0,
        payment: selection.payment ?? 'full',
        number: user?.number ?? '',
        name: user?.name ?? '',
    });

    const hasCouple = tour.couple_price != null;
    const hasChild = tour.child_price != null;

    const totalPeople =
        Number(data.adults) + Number(data.couples) * 2 + Number(data.children);

    const totalPrice =
        data.adults * tour.adult_price +
        (hasCouple ? data.couples * tour.couple_price : 0) +
        (hasChild ? data.children * tour.child_price : 0);

    const payable =
        data.payment === 'full'
            ? totalPrice
            : Math.min(tour.minimum_booking_amount ?? totalPrice, totalPrice);

    const dueLater = totalPrice - payable;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tours/${tour.slug}/book`);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title={`Checkout - ${tour.title}`} />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Secure Checkout
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Please review your booking details and complete traveler
                        information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 lg:col-span-2"
                    >
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Billing Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-500">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                        placeholder="Enter your full name"
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-500">
                                        Email Address
                                    </label>
                                    <div className="mt-1 block w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm font-medium break-all text-slate-800">
                                        {user?.email || '—'}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-500">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={11}
                                        value={data.number}
                                        onChange={(e) =>
                                            setData('number', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                        placeholder="Enter your phone number"
                                    />

                                    {errors.number && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.number}
                                        </p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="flex items-start gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2">
                                        <span className="mt-0.5">💡</span>
                                        <p className="text-sm text-teal-800">
                                            Changes to your name and phone
                                            number will also be saved to your
                                            profile.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Note Box */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-2 text-lg font-semibold text-slate-800">
                                Notes
                            </h2>
                            <p className="mb-4 text-xs text-slate-500">
                                Any dietary restrictions, medical concerns, or
                                room preferences? Let us know.
                            </p>

                            <textarea
                                rows={3}
                                value={data.note}
                                onChange={(e) =>
                                    setData('note', e.target.value)
                                }
                                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                placeholder="E.g., Vegetarian meals preferred, avoid upper berths if possible..."
                            />
                            {errors.note && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.note}
                                </p>
                            )}
                        </div>

                        {/* Submission Handling Error Indicator */}
                        {errors.booking && (
                            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
                                ⚠️ {errors.booking}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="hidden w-full rounded-xl bg-teal-600 py-3.5 text-center font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 lg:block"
                        >
                            {processing
                                ? 'Processing Order...'
                                : `Confirm Booking — ${money(payable)}`}
                        </button>
                    </form>

                    {/* Right Side: Sticky Checkout Summary Widget */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="mb-4 border-b border-slate-100 pb-2 text-lg font-semibold text-slate-800">
                                Booking Summary
                            </h3>

                            <div className="mb-4 flex gap-3">
                                <img
                                    src={tour.thumbnail}
                                    alt={tour.title}
                                    className="h-14 w-20 rounded-md bg-slate-100 object-cover"
                                />
                                <div className="min-w-0">
                                    <h4 className="truncate text-sm font-semibold text-slate-800">
                                        {tour.title}
                                    </h4>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        📅 {fmtDate(tour.departure_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="my-4 space-y-2 border-t border-b border-slate-100 py-3 text-sm text-slate-600">
                                {data.adults > 0 && (
                                    <div className="flex justify-between">
                                        <span>Adult × {data.adults}</span>
                                        <span>
                                            {money(
                                                data.adults * tour.adult_price,
                                            )}
                                        </span>
                                    </div>
                                )}
                                {data.couples > 0 && (
                                    <div className="flex justify-between">
                                        <span>Couple × {data.couples}</span>
                                        <span>
                                            {money(
                                                data.couples *
                                                    tour.couple_price,
                                            )}
                                        </span>
                                    </div>
                                )}
                                {data.children > 0 && (
                                    <div className="flex justify-between">
                                        <span>Child × {data.children}</span>
                                        <span>
                                            {money(
                                                data.children *
                                                    tour.child_price,
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Total Travelers</span>
                                    <span className="font-medium text-slate-700">
                                        {totalPeople}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>{money(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Payment Plan</span>
                                    <span className="rounded bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-600 capitalize">
                                        {data.payment}
                                    </span>
                                </div>

                                {data.payment === 'partial' && (
                                    <div className="flex justify-between text-slate-500">
                                        <span>Due at Departure</span>
                                        <span>{money(dueLater)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-800">
                                    <span>Payable Now</span>
                                    <span className="text-teal-700">
                                        {money(payable)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="mt-5 w-full rounded-xl bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 lg:hidden"
                            >
                                {processing
                                    ? 'Processing...'
                                    : `Pay Now ${money(payable)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
