import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

const AppLayout = (props) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.message) toast(flash.message);
    }, [flash]);

    return (
        <div>
            <Toaster position="top-right" />
            <NavBar />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
