import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo/Postify logo.png"
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
import toast from "react-hot-toast";
import './Navber.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";
import UseAxiosSecure from "../../AllHooks/axiosSecure/useAxiosSecure";
import UseAdmin from "../../AllHooks/adminVerify/useAdmin";
const Navber = () => {

    const { user, handalLogout } = UseAuth()
    const axiosPiblic = useAxiosPiblic()
    const axiosSecure = UseAxiosSecure()
    const [isAdmin] = UseAdmin()
    // console.log(isAdmin);

    const link = <>
        <NavLink to={'/'}><button className="btn btn-ghost btn-sm">Home</button></NavLink>
        <NavLink to={'/member'}><button className="btn btn-ghost btn-sm ">Membership</button></NavLink>
    </>

    const logout = async () => {
        try {
            await handalLogout()
            toast.success('logout success', { position: 'top-right' })
        } catch {
            toast.error('logout faield')
        }
    }


    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcement')
            refetch()
            return res.data;
        }
    })
    // console.log(announcements);


    // Fetching user data
    const { data: adminData = [], isLoading } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            // queryClient.invalidateQueries(["users", search])
            return res.data;
        },
    });
    // console.log(adminData);

    const admin = adminData.filter(c => c.userEmail === user?.email);


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
                    <div className={`${"dropdown dropdown-end"}`}>
                        {
                            user && 
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <Link className={`indicator ${announcements.length === 0 ? '' : 'animate-bounce'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6e6e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                                    <span className="badge badge-sm indicator-item">{announcements.length === 0 ? "0" : announcements?.length}</span>
                                </Link>
                            </div>
                        }

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

                                {
                                    user && isAdmin && <Link to={'/dasbord/adminProfile'} className="ml-3">Dashboard</Link>
                                }
                                {
                                    user && !isAdmin && <Link className={` ml-3`} to={"/dasbord/profile"}>Dashboard</Link>
                                }

                                {/* <Link className={`${admin ? 'ml-3 hidden' : 'ml-3 '}`} to={"/dasbord/profile"}>Dashboard</Link> */}
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
        </div >
    );
};

export default Navber;