import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo/Postify logo.png"

const Navber = () => {

    const link = <>
        <NavLink><button className="btn btn-ghost btn-sm md:text-white">Home</button></NavLink>
        <NavLink><button className="btn btn-ghost btn-sm md:text-white">Membership</button></NavLink>
    </>

    return (
        <div className="bg-primary/50">
            <div className="navbar container mx-auto">
                <div className="flex-1">

                    <div className="btn btn-ghost text-xl">
                        <img className="w-full max-w-[100px]" src={logo} alt="" />
                    </div>
                </div>
                <div className="flex-none">
                    <div className="max-sm:hidden">
                        {link}
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6e6e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <Link to={'/login'} className="btn btn-sm">Join US</Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <span className="flex flex-col md:hidden">{link}</span>
                            <li><a> User name</a> </li>
                            <li><a>Dashboard</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navber;