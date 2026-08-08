import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');
const fmtDateTime = (date: string) => dayjs(date).format('D MMM YYYY, h:mm A');

const Counter = ({
    label,
    sub,
    price,
    value,
    onChange,
    min = 0,
    max = 20,
}: {
    label: string;
    sub?: string;
    price: number;
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
}) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="font-medium text-slate-800">{label}</p>
            <p className="text-sm text-slate-500">
                {money(price)}{' '}
                {sub && <span className="text-slate-400">· {sub}</span>}
            </p>
        </div>
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                disabled={value <= min}
                className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 transition hover:border-teal-600 hover:text-teal-600 disabled:opacity-30"
            >
                −
            </button>
            <span className="w-6 text-center font-semibold text-slate-800">
                {value}
            </span>
            <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 transition hover:border-teal-600 hover:text-teal-600 disabled:opacity-30"
            >
                +
            </button>
        </div>
    </div>
);

const toggleClass = (active: boolean) =>
    `rounded-lg border px-3 py-2 text-sm font-medium transition ${
        active
            ? 'border-teal-600 bg-teal-50 text-teal-700'
            : 'border-slate-200 text-slate-600 hover:border-slate-300'
    }`;

const Show = ({ tour }: { tour: any }) => {
    const [adults, setAdults] = useState(1);
    const [couples, setCouples] = useState(0);
    const [payment, setPayment] = useState('full'); // "full" | "partial"
    const [error, setError] = useState(null);

    if (!tour) {
        return (
            <div className="mx-auto max-w-3xl py-24 text-center text-slate-500">
                Tour not found.
            </div>
        );
    }

    const hasCouple = tour.couple_price != null;
    const hasMinBooking = tour.minimum_booking_amount != null;
    const seatsAvailable = tour.total_seats - tour.booked_seats;
    const soldOut = seatsAvailable <= 0;

    const totalPeople = adults + couples * 2; // couple = 2 seats
    const totalPrice =
        adults * tour.adult_price +
        (hasCouple ? couples * tour.couple_price : 0);

    const bookingClosed = dayjs().isAfter(tour.booking_ends_at);
    const exceedsSeats = totalPeople > seatsAvailable;
    const daysLeft = Math.max(
        dayjs(tour.booking_ends_at).diff(dayjs(), 'day'),
        0,
    );

    const payable =
        payment === 'full'
            ? totalPrice
            : Math.min(tour.minimum_booking_amount ?? totalPrice, totalPrice);
    const dueLater = totalPrice - payable;

    const canSubmit =
        !bookingClosed && tour.is_active && totalPeople > 0 && !exceedsSeats;

    // Single place that decides what the confirm button says / does
    const buttonLabel = !tour.is_active
        ? 'Not available'
        : soldOut
          ? 'Sold out'
          : bookingClosed
            ? 'Booking closed'
            : `Confirm booking — ${money(payable)}`;

    const handleBook = () => {
        setError(null);

        if (!canSubmit) {
            return;
        }

        router.get(`/tours/${tour.slug}/book`, {
            adults,
            couples,
            payment,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden">
                <img
                    src={tour.thumbnail}
                    alt={tour.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-slate-900/10" />
                <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6">
                    {tour.is_featured && (
                        <span className="mb-3 w-fit rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                            Featured
                        </span>
                    )}
                    <h1 className="max-w-2xl text-3xl leading-tight font-bold text-white sm:text-4xl">
                        {tour.title}
                    </h1>
                    <p className="mt-2 max-w-xl text-slate-200">
                        {tour.short_description}
                    </p>
                </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
                {/* Left: details */}
                <div className="space-y-8 lg:col-span-2">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            ['Departure', fmtDate(tour.departure_at)],
                            ['Return', fmtDate(tour.return_at)],
                            ['Seats Left', seatsAvailable],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="rounded-xl border border-slate-200 bg-white p-4 text-center"
                            >
                                <p className="text-xs tracking-wide text-slate-400 uppercase">
                                    {label}
                                </p>
                                <p className="mt-1 font-semibold text-slate-800">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="mb-3 text-xl font-semibold text-slate-800">
                            About this tour
                        </h2>
                        <div className="prose prose-slate max-w-none whitespace-pre-line">
                            {tour.description}
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border p-4 text-sm ${
                            bookingClosed
                                ? 'border-red-200 bg-red-50 text-red-800'
                                : daysLeft <= 7
                                  ? 'border-amber-200 bg-amber-50 text-amber-800'
                                  : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                    >
                        {bookingClosed ? (
                            <>
                                <p className="font-semibold">
                                    🚫 Booking Closed
                                </p>
                                <p className="mt-1">
                                    Online booking ended on{' '}
                                    <strong>
                                        {fmtDateTime(tour.booking_ends_at)}
                                    </strong>
                                    .
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Booking closes on{' '}
                                    <strong>
                                        {fmtDateTime(tour.booking_ends_at)}
                                    </strong>
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Right: booking widget */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-1 text-lg font-semibold text-slate-800">
                            Book this tour
                        </h3>
                        <p className="mb-4 text-sm text-slate-500">
                            Starting from {money(tour.adult_price)} / adult
                        </p>

                        <div className="divide-y divide-slate-100">
                            <Counter
                                label="Adult"
                                price={tour.adult_price}
                                value={adults}
                                onChange={setAdults}
                                max={seatsAvailable}
                                sub=""
                            />
                            {hasCouple && (
                                <Counter
                                    label="Couple"
                                    sub="2 seats"
                                    price={tour.couple_price}
                                    value={couples}
                                    onChange={setCouples}
                                    max={Math.floor(seatsAvailable / 2)}
                                />
                            )}
                        </div>

                        {exceedsSeats && (
                            <p className="mt-2 text-sm text-red-600">
                                Only {seatsAvailable} seat
                                {seatsAvailable !== 1 ? 's' : ''} left — reduce
                                your selection.
                            </p>
                        )}

                        <div className="mt-4 border-t border-slate-200 pt-4">
                            <p className="mb-2 text-sm font-medium text-slate-700">
                                Payment
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPayment('full')}
                                    className={toggleClass(payment === 'full')}
                                >
                                    Pay full
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPayment('partial')}
                                    disabled={!hasMinBooking}
                                    className={`${toggleClass(payment === 'partial')} disabled:opacity-30`}
                                >
                                    Pay partial
                                </button>
                            </div>
                            {!hasMinBooking && (
                                <p className="mt-1 text-xs text-slate-400">
                                    Partial payment isn't available for this
                                    tour.
                                </p>
                            )}
                        </div>

                        <div className="mt-4 space-y-1.5 border-t border-slate-200 pt-4 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Travelers</span>
                                <span>{totalPeople}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Total price</span>
                                <span>{money(totalPrice)}</span>
                            </div>
                            {payment === 'partial' && (
                                <div className="flex justify-between text-slate-500">
                                    <span>Due at departure</span>
                                    <span>{money(dueLater)}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-1 text-base font-semibold text-slate-800">
                                <span>Pay now</span>
                                <span>{money(payable)}</span>
                            </div>
                        </div>

                        {error && (
                            <p className="mt-3 text-sm text-red-600">{error}</p>
                        )}

                        <button
                            type="button"
                            onClick={handleBook}
                            disabled={!canSubmit}
                            className="mt-5 w-full rounded-lg bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
