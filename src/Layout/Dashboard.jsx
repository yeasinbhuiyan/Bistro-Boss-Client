import { Helmet } from "react-helmet-async";
import { FaBars, FaBook, FaBookmark, FaCalendarAlt, FaHome, FaShoppingCart, FaUser, FaUtensilSpoon, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()


    // TODO: 
    // const isAdmin = true;
    const [isAdmin] = useAdmin()

    return (

        <>
            <Helmet>

                <title>Bistro Boss | Dashboard</title>

            </Helmet>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80  ">
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/adminhome'><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItem'><FaUtensilSpoon></FaUtensilSpoon>Add an Items </NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'><FaWallet></FaWallet> Manage Items </NavLink></li>
                                <li><NavLink to='/dashboard/'><FaBook></FaBook> Manage Bookings </NavLink></li>
                                <li><NavLink to='/dashboard/allusers'><FaUser></FaUser> All Users </NavLink></li>
                           



                            </> :



                                <>

                                    <li><NavLink to='/dashboard/userhome'><FaHome></FaHome> User Home</NavLink></li>
                                    <li><NavLink to='/'><FaCalendarAlt></FaCalendarAlt> Reservations</NavLink></li>
                                    <li><NavLink to='/'><FaWallet></FaWallet> Payment History</NavLink></li>
                                    <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>

                                        My Cart
                                        <span className="badge badge-secondary">+{cart?.length || 0}</span>

                                    </NavLink></li></>
                        }


                        {/* <li><NavLink>My Bookings</NavLink></li> */}



                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome></FaHome> Home </NavLink></li>
                        <li><NavLink to='/menu'><FaBars></FaBars> Our Menu</NavLink></li>
                        <li><NavLink to='/order/salad'>Order Food</NavLink></li>
                        <li><NavLink to='/secret'>Secret</NavLink></li>


                    </ul>

                </div>
            </div>


        </>

    );
};

export default Dashboard;