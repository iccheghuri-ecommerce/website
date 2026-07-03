import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FiSearch } from 'react-icons/fi';
import TourCard from '@/components/TourCard';

const Index = ({ tours, q }) => {
    const [search, setSearch] = useState(q || '');

    const handleSearch = () => {
        router.get(
            '/tours',
            { q: search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="mx-auto mt-5 mb-10 max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                        Our Tour Packages
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Explore our handpicked experiences and destinations.
                    </p>
                </div>

                <div className="flex w-full items-center sm:max-w-xs">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                        placeholder="Search destinations..."
                        className="w-full rounded-l-md border border-r-0 border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
                    />

                    <button
                        type="button"
                        onClick={handleSearch}
                        className="flex h-[38px] cursor-pointer items-center justify-center rounded-r-md bg-neutral-900 px-4 text-white hover:bg-neutral-800"
                    >
                        <FiSearch className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.data.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
            <div className="mt-10 flex justify-center gap-4">
                <button
                    onClick={() => router.get(tours.prev_page_url)}
                    disabled={!tours.prev_page_url}
                    className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ← Previous
                </button>

                <button
                    onClick={() => router.get(tours.next_page_url)}
                    disabled={!tours.next_page_url}
                    className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Index;
