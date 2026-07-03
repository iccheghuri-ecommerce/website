import { Link, usePage } from '@inertiajs/react';
import {
    FiUser as User,
} from 'react-icons/fi';

const NavBar = () => {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold tracking-tight text-primary">
                        {props.name}
                    </span>
                </Link>


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
                </div>

                <div className="flex items-center gap-6">


                    {!user ? (
                        <a
                            href="/auth/google/redirect"
                            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
                        >
                            Sign In
                        </a>
                    ) : (
                        <Link href="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                            <User className="h-4 w-4 text-slate-600" />
                        </Link>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default NavBar;
