import { Outlet } from 'react-router-dom';
import Headline from '../components/visitors/Headline';
import Footer from '../components/visitors/Footer';
import Navbar from '../components/visitors/Navbar';

const VisitorLayout = () => (
    <>
        <Navbar />
        <Headline />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
);

export default VisitorLayout;
