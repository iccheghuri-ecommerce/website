import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
    Copy,
    Check,
    Info,
    Calendar,
    Users,
    Wallet,
    ArrowRight,
} from 'lucide-react';

const Index = ({ booking, payment }) => {
    const { errors } = usePage().props;
    const total = booking.total_amount;
    const paid = booking.paid_amount;
    const due = Math.max(0, total - paid);
    const progressPercentage = Math.min((paid / total) * 100, 100);
    const minimumBookingAmount = booking.tour.minimum_booking_amount ?? due;

    let initialAmount = 0;
    if (payment == 'partial') {
        initialAmount = Math.min(due, minimumBookingAmount);
    } else {
        initialAmount = due;
    }

    // Form State
    const [method, setMethod] = useState('bkash');
    const [amount, setAmount] = useState(initialAmount);
    const [transactionId, setTransactionId] = useState('');
    const [note, setNote] = useState('');
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const paymentMethods = {
        bkash: {
            name: 'bKash',
            type: 'Send Money Personal',
            number: '01660160911',
            placeholder: 'e.g. AM87X92KPL',
            color: 'bg-[#e2136e]',
            borderColor: 'border-[#e2136e]',
            textColor: 'text-[#e2136e]',
        },
        nagad: {
            name: 'Nagad',
            type: 'Send Money Personal',
            number: '01660160911',
            placeholder: 'e.g. 71K8AX92P',
            color: 'bg-[#f57c20]',
            borderColor: 'border-[#f57c20]',
            textColor: 'text-[#f57c20]',
        },
        rocket: {
            name: 'Rocket',
            type: 'Send Money Personal',
            number: '01660160911',
            placeholder: 'e.g. 202607031254',
            color: 'bg-[#8c3c96]',
            borderColor: 'border-[#8c3c96]',
            textColor: 'text-[#8c3c96]',
        },
        bank: {
            name: 'Bank Transfer',
            type: 'NPSB / Fund Transfer',
            number: 'Currently Unavailable',
            extra: '-',
            placeholder: 'e.g. FT192837465',
            color: 'bg-blue-600',
            borderColor: 'border-blue-600',
            textColor: 'text-blue-600',
        },
        cash: {
            name: 'Cash',
            type: 'Pay In Cash',
            number: 'Pay to our manager in person',
            extra: 'Please write the manager’s name inside the field below.',
            placeholder: 'e.g. Tamim (Manager)',
            color: 'bg-slate-700',
            borderColor: 'border-slate-700',
            textColor: 'text-slate-700',
        },
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            booking_id: booking.id,
            amount: amount,
            method: method,
            transaction_id: transactionId,
            note: note,
            status: 'pending',
        };
        console.log(payload);

        router.post(`/bookings/${booking.booking_code}/pay`, payload, {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 font-sans text-slate-800 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md space-y-6">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                Booking Code
                            </p>
                            <h2 className="text-base font-bold tracking-tight text-slate-700">
                                {booking.booking_code}
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-4 p-5">
                        <div>
                            <h3 className="line-clamp-1 text-lg leading-tight font-bold text-slate-900">
                                {booking.tour.title}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    Starts:{' '}
                                    {dayjs(booking.tour.departure_at).format(
                                        'MMM D, YYYY',
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2.5 border-t border-dashed border-slate-200 pt-4 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Total Amount</span>
                                <span className="font-medium text-slate-800">
                                    ৳{total.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Already Paid</span>
                                <span className="font-medium text-emerald-600">
                                    ৳{paid.toLocaleString()}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="py-1">
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-emerald-500 transition-all duration-500 ease-out"
                                        style={{
                                            width: `${progressPercentage}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="font-semibold text-slate-900">
                                    Due Now
                                </span>
                                <span className="text-xl font-extrabold text-slate-900">
                                    ৳{due.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {due > 0 && (
                    <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div>
                            <h3 className="mb-3 text-sm font-bold tracking-wider text-slate-900 uppercase">
                                Pay With
                            </h3>

                            <div className="grid grid-cols-2 gap-2.5">
                                {Object.entries(paymentMethods).map(
                                    ([key, item]) => {
                                        const isSelected = method === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setMethod(key)}
                                                className={`relative flex flex-col justify-between rounded-xl border-2 p-3.5 text-left transition-all outline-none ${
                                                    isSelected
                                                        ? `${item.borderColor} bg-slate-50/50 shadow-sm ring-1 ${item.borderColor.replace('border', 'ring')}`
                                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    <span
                                                        className={`text-sm font-bold ${isSelected ? item.textColor : 'text-slate-700'}`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                    <span
                                                        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                                                            isSelected
                                                                ? `${item.color} border-transparent`
                                                                : 'border-slate-300'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                                        )}
                                                    </span>
                                                </div>
                                                <span className="mt-2 text-[11px] font-medium text-slate-400">
                                                    {key === 'cash'
                                                        ? 'In Person'
                                                        : 'Send Money'}
                                                </span>
                                            </button>
                                        );
                                    },
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                        {paymentMethods[method].type}
                                    </p>
                                    <p className="mt-0.5 text-base font-bold break-all text-slate-800 select-all">
                                        {paymentMethods[method].number}
                                    </p>
                                    {paymentMethods[method].extra && (
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            {paymentMethods[method].extra}
                                        </p>
                                    )}
                                </div>

                                {method !== 'cash' && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCopy(
                                                paymentMethods[method].number,
                                            )
                                        }
                                        className={`flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                                            copied
                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-3.5 w-3.5" />
                                                <span>Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3.5 w-3.5 text-slate-400" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                        {errors.booking && (
                            <p className="text-sm text-red-600">
                                {errors.booking}
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase"
                                >
                                    Amount (৳)
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <span className="text-base font-medium text-slate-400">
                                            ৳
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        required
                                        min={Math.min(
                                            minimumBookingAmount,
                                            due,
                                        )}
                                        max={due}
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="block w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-8 text-base font-bold text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-slate-900"
                                        placeholder="Enter payment amount"
                                    />
                                </div>

                                {due > minimumBookingAmount && (
                                    <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                                        <Info className="inline h-3.5 w-3.5 text-slate-400" />
                                        Min. payable amount is{' '}
                                        <span className="font-semibold text-slate-600">
                                            ৳
                                            {minimumBookingAmount.toLocaleString()}
                                        </span>
                                    </p>
                                )}
                                {errors.amount && (
                                    <p className="text-sm text-red-600">
                                        {errors.amount}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="transaction_id"
                                    className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase"
                                >
                                    {method === 'cash'
                                        ? 'Collected By (Manager Name)'
                                        : 'Transaction ID'}
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <Wallet className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="transaction_id"
                                        id="transaction_id"
                                        required
                                        value={transactionId}
                                        onChange={(e) =>
                                            setTransactionId(e.target.value)
                                        }
                                        className={`block w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-base font-semibold text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-slate-900 ${
                                            method !== 'cash'
                                                ? 'tracking-widest placeholder:tracking-normal'
                                                : ''
                                        }`}
                                        placeholder={
                                            paymentMethods[method].placeholder
                                        }
                                    />
                                </div>
                                {errors.transaction_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.transaction_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="note"
                                    className="mb-1.5 block text-xs font-bold tracking-wider text-slate-500 uppercase"
                                >
                                    Note{' '}
                                    <span className="font-normal text-slate-400 lowercase">
                                        (optional)
                                    </span>
                                </label>
                                <textarea
                                    name="note"
                                    id="note"
                                    rows="2"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="block w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-slate-900"
                                    placeholder="Reference details, special notes..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    isSubmitting || !transactionId || !amount
                                }
                                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                            >
                                {isSubmitting ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-white"></span>
                                ) : (
                                    <>
                                        <span>
                                            Submit ৳
                                            {Number(
                                                amount || 0,
                                            ).toLocaleString()}{' '}
                                            Payment
                                        </span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {due === 0 && (
                    <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-6 w-6" />
                        </div>

                        <h3 className="mt-4 text-base font-bold text-slate-900">
                            Booking Fully Settled!
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            Thank you! Your payment for this tour is complete.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
