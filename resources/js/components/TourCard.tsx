import { Link } from '@inertiajs/react';
import React from 'react';

const TourCard = ({ tour }: { tour: any }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="overflow-hidden">
                <img
                    src={tour.thumbnail}
                    alt={tour.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52 lg:h-56"
                />
            </div>

            <div className="p-4 sm:p-5 lg:p-6">
                <h5 className="text-base leading-snug font-semibold text-slate-900 sm:text-lg">
                    {tour.title}
                </h5>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {tour.short_description}
                </p>

                <div className="mt-4 mb-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                        {new Date(tour.departure_at).toLocaleDateString(
                            undefined,
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            },
                        )}
                    </span>

                    <span className="text-lg font-bold text-slate-900 sm:text-xl">
                        ৳{tour.adult_price}
                    </span>
                </div>

                <Link
                    href={`/tours/${tour.slug}`}
                    className="block w-full rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:py-3"
                >
                    View Package
                </Link>
            </div>
        </div>
    );
};

export default TourCard;
