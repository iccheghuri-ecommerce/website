import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FiUser as User, FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
    const { props } = usePage();
    const user = props.auth?.user as any;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold tracking-tight text-primary">
                        {props.name}
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                    <Link
                        href="/"
                        className="transition-colors hover:text-primary"
                    >
                        Home
                    </Link>
                    <Link
                        href="/tours"
                        className="transition-colors hover:text-primary"
                    >
                        Packages
                    </Link>
                    {user?.is_admin && (
                        <>
                            <Link
                                href="/admin/tours"
                                className="transition-colors hover:text-primary"
                            >
                                Admin Tours
                            </Link>
                            <Link
                                href="/admin/bookings"
                                className="transition-colors hover:text-primary"
                            >
                                Admin Bookings
                            </Link>
                            <Link
                                href="/admin/payments"
                                className="transition-colors hover:text-primary"
                            >
                                Admin Payments
                            </Link>
                            <Link
                                href="/admin/users"
                                className="transition-colors hover:text-primary"
                            >
                                Admin Users
                            </Link>
                        </>
                    )}
                </div>

                {/* Desktop Action Button / Profile */}
                <div className="hidden items-center gap-6 md:flex">
                    {!user ? (
                        <a
                            href="/auth/google/redirect"
                            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
                        >
                            Sign In
                        </a>
                    ) : (
                        <Link
                            href="/profile"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200"
                        >
                            <User className="h-4 w-4 text-slate-600" />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <FiX className="h-6 w-6" />
                        ) : (
                            <FiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="animate-fade-in border-b border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
                    <div className="flex flex-col gap-4 text-base font-medium text-slate-600">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                        >
                            Home
                        </Link>
                        <Link
                            href="/tours"
                            onClick={() => setIsOpen(false)}
                            className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                        >
                            Packages
                        </Link>
                        {user?.is_admin && (
                            <>
                                <Link
                                    href="/admin/tours"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                                >
                                    Admin Tours
                                </Link>
                                <Link
                                    href="/admin/bookings"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                                >
                                    Admin Bookings
                                </Link>
                                <Link
                                    href="/admin/payments"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                                >
                                    Admin Payments
                                </Link>
                                <Link
                                    href="/admin/users"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50 hover:text-primary"
                                >
                                    Admin Users
                                </Link>
                            </>
                        )}

                        <hr className="my-1 border-slate-100" />

                        {/* Mobile Auth Section */}
                        <div className="px-3 pt-2">
                            {!user ? (
                                <a
                                    href="/auth/google/redirect"
                                    className="block w-full rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
                                >
                                    Sign In
                                </a>
                            ) : (
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-md py-2 text-slate-700 hover:text-primary"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                                        <User className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <span>My Profile</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
