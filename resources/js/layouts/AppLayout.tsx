import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

const AppLayout = (props) => {
    return (
        <div>
            <NavBar />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
