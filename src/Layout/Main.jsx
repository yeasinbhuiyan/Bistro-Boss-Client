
import NavigationBar from '../Pages/Shared/NavigationBar/NavigationBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const location = useLocation()
    console.log(location)
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
   

    return (
        <div>
            {noHeaderFooter || <NavigationBar></NavigationBar>}

            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;