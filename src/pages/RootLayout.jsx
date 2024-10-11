
import { Outlet } from 'react-router-dom';
import '../index.css';
import Header from '../components/Header'; 

const RootLayout = (props) => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default RootLayout;
