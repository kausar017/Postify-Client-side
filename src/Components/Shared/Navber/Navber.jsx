import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo/Postify logo.png"
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
import toast from "react-hot-toast";

const Navber = () => {

    const { user, handalLogout } = UseAuth()

    const link = <>
        <NavLink to={'/'}><button className="btn btn-ghost btn-sm md:text-white">Home</button></NavLink>
        <NavLink><button className="btn btn-ghost btn-sm md:text-white">Membership</button></NavLink>
    </>

    const logout = async () => {
        try {
            await handalLogout()
            toast.success('logout success', { position: 'top-right' })
        } catch {
            toast.error('logout faield')
        }
    }

    return (
        <div className=" bg-[#A480FF] fixed w-full z-10 transition-all duration-700">
            <div className="navbar container mx-auto">
                <div className="flex-1">

                    <Link className="btn btn-ghost text-xl">
                        <img className="w-full max-w-[100px]" src={logo} alt="" />
                    </Link>
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

                    {user ?


                        <div className="dropdown dropdown-end">


                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                {
                                    user ?

                                        <div className="w-10 rounded-full">
                                            <img
                                                referrerPolicy="no-referrer"
                                                alt={user?.photoURL}
                                                src={user?.photoURL} />
                                        </div>
                                        :

                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="https://i.postimg.cc/yxBM0XS4/user.png"
                                                src="https://i.postimg.cc/yxBM0XS4/user.png" />
                                        </div>

                                }


                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-5 shadow space-y-2">
                                <li className="ml-3">{user?.displayName}</li>
                                <span className="flex flex-col md:hidden">{link}</span>
                                <span className="ml-3 "><Link to={'/dasbord'}>Dashboard</Link></span>
                                <li className="ml-3" onClick={logout}>Logout</li>
                            </ul>   
                        </div>

                        :
                        <div>
                            <Link to={'/login'} className="btn btn-sm">Join US</Link>
                        </div>

                    }

                </div>
            </div>
        </div>
    );
};

export default Navber;