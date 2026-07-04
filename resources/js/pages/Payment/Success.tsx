import { Link } from '@inertiajs/react';
import React from 'react';
// Importing clean, minimalist icons from Feather Icons set
import { FiCheck, FiClock } from 'react-icons/fi';

const Success = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 antialiased">
            <div className="w-full max-w-md transform rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl">
                {/* Animated Green Check Icon Wrapper */}
                <div className="mx-auto mb-6 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-emerald-50 duration-1000">
                    <FiCheck
                        className="h-10 w-10 text-emerald-500"
                        strokeWidth={2.5}
                    />
                </div>

                {/* Main Heading */}
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Payment Request Received!
                </h2>

                {/* Subtext */}
                <p className="mb-6 text-sm leading-relaxed text-gray-500 sm:text-base">
                    Thank you for your submission. Your payment request has been
                    logged successfully and is safely in our queue.
                </p>

                {/* Info Card / Next Steps */}
                <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left text-xs text-gray-600 sm:text-sm">
                    <p className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                        <FiClock className="h-4 w-4 text-slate-500" />
                        <span>What happens next?</span>
                    </p>
                    <ul className="list-none space-y-3 pl-0">
                        <li className="flex items-start gap-2.5">
                            <FiCheck
                                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                strokeWidth={3}
                            />
                            <span>
                                Our admin team will review your transaction
                                details.
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <FiCheck
                                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                strokeWidth={3}
                            />
                            <span>
                                Verification usually takes between{' '}
                                <b>15 to 45 minutes</b>.
                            </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <FiCheck
                                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                strokeWidth={3}
                            />
                            <span>
                                You will receive an email notification the
                                moment it's approved.
                            </span>
                        </li>
                    </ul>
                </div>

                <Link
                    href="/profile"
                    className="w-full transform rounded-xl bg-slate-900 px-4 py-3 font-medium text-white shadow-lg shadow-slate-900/10 transition duration-200 ease-in-out hover:bg-slate-800 active:scale-[0.98]"
                >
                    Back to Profile
                </Link>
            </div>
        </div>
    );
};

export default Success;
