import { useForm, Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import React from 'react';

const money = (n: number) => `৳${n.toLocaleString('en-BD')}`;
const fmtDate = (date: string) => dayjs(date).format('D MMM YYYY');

const Index = ({
    tour,
    selection,
    user,
    occupiedSeats = [],
}: {
    tour: any;
    selection: any;
    user: any;
    occupiedSeats?: string[];
}) => {
    // FIXED: Changed field name from 'notes' to 'note' to match backend validation rule
    const { data, setData, post, processing, errors } = useForm({
        note: '',
        adults: selection.adults ?? 0,
        couples: selection.couples ?? 0,
        payment: selection.payment ?? 'full',
        number: user?.number ?? '',
        name: user?.name ?? '',
        seats: [] as string[],
        travelers: [] as Array<{
            seat_number: string;
            name: string;
            phone: string;
            nid_no: string;
            blood_group: string;
            address: string;
            emergency_contact: string;
        }>,
    });

    const hasCouple = tour.couple_price != null;

    const totalPeople = Number(data.adults) + Number(data.couples) * 2;

    const totalPrice =
        data.adults * tour.adult_price +
        (hasCouple ? data.couples * tour.couple_price : 0);

    const payable =
        data.payment === 'full'
            ? totalPrice
            : Math.min(tour.minimum_booking_amount ?? totalPrice, totalPrice);

    const dueLater = totalPrice - payable;

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const cols = ['1', '2', '3', '4'];
    const lastRowCols = ['1', '2', '3', '4', '5'];

    const handleSeatToggle = (seat: string) => {
        if (occupiedSeats.includes(seat)) {
            return;
        }

        let newSeats = [...data.seats];
        let newTravelers = [...data.travelers];

        if (newSeats.includes(seat)) {
            newSeats = newSeats.filter((s) => s !== seat);
            newTravelers = newTravelers.filter((t) => t.seat_number !== seat);
        } else {
            if (newSeats.length >= totalPeople) {
                const removedSeat = newSeats.shift();
                newTravelers = newTravelers.filter(
                    (t) => t.seat_number !== removedSeat,
                );
            }

            newSeats.push(seat);
            newTravelers.push({
                seat_number: seat,
                name: newTravelers.length === 0 ? data.name : '',
                phone: newTravelers.length === 0 ? data.number : '',
                nid_no: newTravelers.length === 0 ? user?.nid_no || '' : '',
                blood_group:
                    newTravelers.length === 0 ? user?.blood_group || '' : '',
                address: newTravelers.length === 0 ? user?.address || '' : '',
                emergency_contact:
                    newTravelers.length === 0
                        ? user?.emergency_contact || ''
                        : '',
            });
        }

        setData((prevData) => ({
            ...prevData,
            seats: newSeats,
            travelers: newTravelers,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
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

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-slate-800">
                                Select Bus Seats ({data.seats.length} /{' '}
                                {totalPeople} selected)
                            </h2>
                            <div className="mb-6 flex flex-wrap gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-4 w-4 rounded border border-slate-300 bg-slate-100"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-4 w-4 rounded bg-teal-600"></div>
                                    <span>Selected</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-4 w-4 rounded border border-red-200 bg-red-100"></div>
                                    <span>Occupied</span>
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div className="mb-6 flex justify-end">
                                    <div className="rounded bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-600">
                                        Driver ☸
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    {rows.map((row) => (
                                        <div
                                            key={row}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex gap-2">
                                                {cols.slice(0, 2).map((col) => {
                                                    const seat = `${row}${col}`;
                                                    const isOccupied =
                                                        occupiedSeats.includes(
                                                            seat,
                                                        );
                                                    const isSelected =
                                                        data.seats.includes(
                                                            seat,
                                                        );

                                                    return (
                                                        <button
                                                            key={seat}
                                                            type="button"
                                                            disabled={
                                                                isOccupied
                                                            }
                                                            onClick={() =>
                                                                handleSeatToggle(
                                                                    seat,
                                                                )
                                                            }
                                                            className={`flex h-9 w-9 items-center justify-center rounded border text-xs font-semibold transition ${
                                                                isOccupied
                                                                    ? 'cursor-not-allowed border-red-200 bg-red-100 text-red-400'
                                                                    : isSelected
                                                                      ? 'border-teal-700 bg-teal-600 text-white'
                                                                      : 'border-slate-200 bg-white text-slate-700 hover:border-teal-500'
                                                            }`}
                                                        >
                                                            {seat}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div className="w-8 text-center text-xs font-bold text-slate-400">
                                                Row {row}
                                            </div>
                                            <div className="flex gap-2">
                                                {cols.slice(2, 4).map((col) => {
                                                    const seat = `${row}${col}`;
                                                    const isOccupied =
                                                        occupiedSeats.includes(
                                                            seat,
                                                        );
                                                    const isSelected =
                                                        data.seats.includes(
                                                            seat,
                                                        );

                                                    return (
                                                        <button
                                                            key={seat}
                                                            type="button"
                                                            disabled={
                                                                isOccupied
                                                            }
                                                            onClick={() =>
                                                                handleSeatToggle(
                                                                    seat,
                                                                )
                                                            }
                                                            className={`flex h-9 w-9 items-center justify-center rounded border text-xs font-semibold transition ${
                                                                isOccupied
                                                                    ? 'cursor-not-allowed border-red-200 bg-red-100 text-red-400'
                                                                    : isSelected
                                                                      ? 'border-teal-700 bg-teal-600 text-white'
                                                                      : 'border-slate-200 bg-white text-slate-700 hover:border-teal-500'
                                                            }`}
                                                        >
                                                            {seat}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Row K with 5 seats (K1, K2, K3, K4, K5) */}
                                    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                                        <div className="flex w-full justify-between gap-1">
                                            {lastRowCols.map((col) => {
                                                const seat = `K${col}`;
                                                const isOccupied =
                                                    occupiedSeats.includes(
                                                        seat,
                                                    );
                                                const isSelected =
                                                    data.seats.includes(seat);

                                                return (
                                                    <button
                                                        key={seat}
                                                        type="button"
                                                        disabled={isOccupied}
                                                        onClick={() =>
                                                            handleSeatToggle(
                                                                seat,
                                                            )
                                                        }
                                                        className={`flex h-9 w-9 items-center justify-center rounded border text-xs font-semibold transition ${
                                                            isOccupied
                                                                ? 'cursor-not-allowed border-red-200 bg-red-100 text-red-400'
                                                                : isSelected
                                                                  ? 'border-teal-700 bg-teal-600 text-white'
                                                                  : 'border-slate-200 bg-white text-slate-700 hover:border-teal-500'
                                                        }`}
                                                    >
                                                        {seat}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {errors.seats && (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.seats}
                                </p>
                            )}
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

                        {/* Passenger Details Collection Per Selected Seat */}
                        {data.seats.length > 0 && (
                            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Traveler Information (per seat)
                                </h2>
                                {data.seats.map((seat, index) => {
                                    const traveler = data.travelers.find(
                                        (t) => t.seat_number === seat,
                                    ) || {
                                        seat_number: seat,
                                        name: '',
                                        phone: '',
                                        nid_no: '',
                                        blood_group: '',
                                        address: '',
                                        emergency_contact: '',
                                    };

                                    const updateTravelerField = (
                                        field: string,
                                        val: string,
                                    ) => {
                                        const updated = data.travelers.map(
                                            (t) => {
                                                if (t.seat_number === seat) {
                                                    return {
                                                        ...t,
                                                        [field]: val,
                                                    };
                                                }

                                                return t;
                                            },
                                        );
                                        setData('travelers', updated);
                                    };

                                    return (
                                        <div
                                            key={seat}
                                            className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <h3 className="font-bold text-teal-700">
                                                    Passenger for Seat {seat}
                                                </h3>
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const primary =
                                                                data
                                                                    .travelers[0];

                                                            if (primary) {
                                                                updateTravelerField(
                                                                    'name',
                                                                    primary.name,
                                                                );
                                                                updateTravelerField(
                                                                    'phone',
                                                                    primary.phone,
                                                                );
                                                                updateTravelerField(
                                                                    'nid_no',
                                                                    primary.nid_no,
                                                                );
                                                                updateTravelerField(
                                                                    'blood_group',
                                                                    primary.blood_group,
                                                                );
                                                                updateTravelerField(
                                                                    'address',
                                                                    primary.address,
                                                                );
                                                                updateTravelerField(
                                                                    'emergency_contact',
                                                                    primary.emergency_contact,
                                                                );
                                                            }
                                                        }}
                                                        className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                                                    >
                                                        Copy from Primary
                                                        Traveler
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={traveler.name}
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.name` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        placeholder="Traveler name"
                                                        required
                                                    />
                                                    {errors[
                                                        `travelers.${index}.name` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.name`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        maxLength={11}
                                                        value={traveler.phone}
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'phone',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.phone` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        placeholder="Phone number"
                                                        required
                                                    />
                                                    {errors[
                                                        `travelers.${index}.phone` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.phone`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        NID Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={traveler.nid_no}
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'nid_no',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.nid_no` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        placeholder="NID"
                                                        required
                                                    />
                                                    {errors[
                                                        `travelers.${index}.nid_no` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.nid_no`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        Blood Group
                                                    </label>
                                                    <select
                                                        value={
                                                            traveler.blood_group
                                                        }
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'blood_group',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.blood_group` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Blood Group
                                                        </option>
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
                                                            <option
                                                                key={bg}
                                                                value={bg}
                                                            >
                                                                {bg}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[
                                                        `travelers.${index}.blood_group` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.blood_group`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        Emergency Contact
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            traveler.emergency_contact
                                                        }
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'emergency_contact',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.emergency_contact` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        placeholder="Emergency contact"
                                                        required
                                                    />
                                                    {errors[
                                                        `travelers.${index}.emergency_contact` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.emergency_contact`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-medium text-slate-500">
                                                        Address
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        value={traveler.address}
                                                        onChange={(e) =>
                                                            updateTravelerField(
                                                                'address',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:ring-1 focus:outline-none ${
                                                            errors[
                                                                `travelers.${index}.address` as any
                                                            ]
                                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                                                        }`}
                                                        placeholder="Address"
                                                        required
                                                    />
                                                    {errors[
                                                        `travelers.${index}.address` as any
                                                    ] && (
                                                        <p className="mt-1 text-xs text-red-600">
                                                            {
                                                                (errors as any)[
                                                                    `travelers.${index}.address`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Submission Handling Error Indicator */}
                        {errors && (errors as any).booking && (
                            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
                                ⚠️ {(errors as any).booking}
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
                                {data.seats && data.seats.length > 0 && (
                                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-2 text-xs">
                                        <span className="font-semibold text-slate-500">
                                            Selected Seats:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {data.seats.map((seat: string) => (
                                                <span
                                                    key={seat}
                                                    className="rounded bg-teal-50 px-1.5 py-0.5 font-bold text-teal-700"
                                                >
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
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
