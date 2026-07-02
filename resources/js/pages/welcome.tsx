    import { Link } from '@inertiajs/react';
    import TourCard from '../components/TourCard';

    export default function Welcome({ featured }) {
        return (
            <div>
                <div className="flex flex-col gap-12 pb-16">
                    <section className="relative flex h-[500px] w-full items-center justify-center px-4 text-center">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1587772644870-2f6146dcfba9')",
                            }}
                        />

                        <div className="absolute inset-0 bg-black/60" />

                        <div className="relative z-10 max-w-3xl px-2 text-white">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                                Discover Bangladesh's{' '}
                                <span className="text-orange-500">Hidden Gems</span>
                            </h1>
                            <p className="mb-8 text-base font-light text-gray-200 md:text-lg">
                                Unforgettable adventures with our curated tour
                                packages.
                            </p>

                            <div className="mx-auto flex w-full max-w-md items-center rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-md transition-all focus-within:bg-white/20">
                                <input
                                    type="text"
                                    placeholder="Where to next?"
                                    className="flex-grow bg-transparent px-4 py-2 text-white placeholder-white/70 outline-none"
                                />
                                <button className="rounded-md bg-orange-600 px-6 py-2 font-semibold text-white transition hover:bg-orange-700">
                                    Search
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto px-4">
                        {/* Header Section with "View All" Link */}
                        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Featured Experiences
                                </h2>
                                <p className="mt-1 text-gray-600">
                                    Explore the most premium packages of us
                                </p>
                            </div>

                            <Link
                                href="/packages"
                                className="group flex items-center font-semibold text-orange-600 transition hover:text-orange-700"
                            >
                                View all tours
                                <span className="ml-2 transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* Tours Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featured.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

