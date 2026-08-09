import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        short_description: '',
        description: '',
        thumbnail: null as File | null,
        is_featured: false,
        is_active: true,
        booking_ends_at: '',
        departure_at: '',
        return_at: '',
        adult_price: 0,
        couple_price: '',
        minimum_booking_amount: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/tours');
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <Head title="Admin - Create Tour" />
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <div className="mb-8">
                    <Link
                        href="/admin/tours"
                        className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                    >
                        ← Back to Tours
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Create Tour Package
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Tour Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            required
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Short Description
                        </label>
                        <input
                            type="text"
                            value={data.short_description}
                            onChange={(e) =>
                                setData('short_description', e.target.value)
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            required
                        />
                        {errors.short_description && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.short_description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Full Description
                        </label>
                        <textarea
                            rows={5}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            required
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Thumbnail Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'thumbnail',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            required
                        />
                        {errors.thumbnail && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Booking Ends At
                            </label>
                            <input
                                type="datetime-local"
                                value={data.booking_ends_at}
                                onChange={(e) =>
                                    setData('booking_ends_at', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                required
                            />
                            {errors.booking_ends_at && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.booking_ends_at}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Departure At
                            </label>
                            <input
                                type="datetime-local"
                                value={data.departure_at}
                                onChange={(e) =>
                                    setData('departure_at', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                required
                            />
                            {errors.departure_at && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.departure_at}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Return At
                            </label>
                            <input
                                type="datetime-local"
                                value={data.return_at}
                                onChange={(e) =>
                                    setData('return_at', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                required
                            />
                            {errors.return_at && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.return_at}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Adult Price (Per Person)
                            </label>
                            <input
                                type="number"
                                value={data.adult_price}
                                onChange={(e) =>
                                    setData(
                                        'adult_price',
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                                required
                            />
                            {errors.adult_price && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.adult_price}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Couple Price
                            </label>
                            <input
                                type="number"
                                value={data.couple_price}
                                onChange={(e) =>
                                    setData('couple_price', e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            />
                            {errors.couple_price && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.couple_price}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Min Booking Amount
                            </label>
                            <input
                                type="number"
                                value={data.minimum_booking_amount}
                                onChange={(e) =>
                                    setData(
                                        'minimum_booking_amount',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-teal-500 focus:outline-none"
                            />
                            {errors.minimum_booking_amount && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.minimum_booking_amount}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) =>
                                    setData('is_featured', e.target.checked)
                                }
                                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-700">
                                Featured Tour
                            </span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.checked)
                                }
                                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-700">
                                Active / Published
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
                    >
                        Create Tour Package
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
