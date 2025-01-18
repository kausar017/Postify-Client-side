import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo/Postify logo.png"
import { FiAlignJustify } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSignsPost } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

const Dashbord = () => {

    const isAdmin = true

    return (
        <div className="">
            <Helmet>
                <title>Postify | dasahbord</title>
            </Helmet>


            <div className="grid grid-cols-12 min-h-screen">

                {isAdmin ?

                    <>
                        <div className="bg-primary/30 col-span-2 space-y-3 xl:block lg:block md:hidden max-sm:hidden pt-3">
                            <div className="flex flex-col ml-2 space-y-2">
                                <div className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></div>
                                <NavLink to={'/dasbord/adminHome'}><button className="btn btn-ghost btn-sm uppercase">Admin Home </button></NavLink>
                                <NavLink to={'/dasbord/additem'}><button className="btn btn-ghost btn-sm uppercase"> Add Items</button></NavLink>
                                <NavLink to={'/dasbord/manageItems'}><button className="btn btn-ghost btn-sm uppercase "> manage items </button></NavLink>
                                <NavLink to={'/dasbord/boking'}><button className="btn btn-ghost btn-sm uppercase"> Manage bookings </button></NavLink>
                                <NavLink to={'/dasbord/users'}><button className="btn btn-ghost btn-sm uppercase ">all users </button></NavLink>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="bg-primary/30 col-span-2 space-y-3 xl:block lg:block md:hidden max-sm:hidden pt-3">
                            <div className="flex flex-col px-2 space-y-2">
                                <div className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></div>
                                <NavLink to={'/dasbord/profile'}><button className="btn btn-ghost btn-sm uppercase"><CgProfile size={20}></CgProfile> My Profile</button></NavLink>
                                <NavLink to={'/dasbord/addpost'}><button className="btn btn-ghost btn-sm uppercase"><IoIosAddCircleOutline size={20}></IoIosAddCircleOutline>Add Post</button></NavLink>
                                <NavLink to={'/dasbord/myPost'}><button className="btn btn-ghost btn-sm uppercase"><FaSignsPost size={20}></FaSignsPost>My Posts </button></NavLink>
                            </div>
                            <div className="divider"></div>
                            <NavLink to={'/'}><button className="btn btn-ghost btn-sm uppercase"><IoHome size={20}></IoHome>Home</button></NavLink>
                        </div>
                    </>
                }





                <div className="drawer xl:hidden col-span-1 z-10  lg:hidden md:block">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn "><FiAlignJustify size={20}></FiAlignJustify></label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu bg-[#A480FF] text-white min-h-full">



                            {isAdmin ?
                                <div className="flex flex-col px-2 space-y-2">
                                    <NavLink to={'/dasbord/adminHome'}><button className="btn btn-ghost btn-sm uppercase">Admin Home </button></NavLink>
                                    <NavLink to={'/dasbord/additem'}><button className="btn btn-ghost btn-sm uppercase"> Add Items</button></NavLink>
                                    <NavLink to={'/dasbord/manageItems'}><button className="btn btn-ghost btn-sm uppercase "> manage items </button></NavLink>
                                    <NavLink to={'/dasbord/boking'}><button className="btn btn-ghost btn-sm uppercase"> Manage bookings </button></NavLink>
                                    <NavLink to={'/dasbord/users'}><button className="btn btn-ghost btn-sm uppercase ">all users </button></NavLink>
                                </div>

                                :
                                <>
                                    <div className="flex flex-col col-span-2 space-y-3">
                                        <button className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></button>
                                        <NavLink to={'/dasbord/profile'}><button className="btn btn-ghost btn-sm uppercase"><CgProfile size={20}></CgProfile> My Profile</button></NavLink>
                                        <NavLink to={'/dasbord/addpost'}><button className="btn btn-ghost btn-sm uppercase"><IoIosAddCircleOutline size={20}></IoIosAddCircleOutline> Add Post</button></NavLink>
                                        <NavLink to={'/dasbord/myPost'}><button className="btn btn-ghost btn-sm uppercase"><FaSignsPost size={20}></FaSignsPost> My Posts </button></NavLink>
                                    </div>
                                    <div className="divider"></div>
                                    <NavLink to={'/'}><button className="btn btn-ghost btn-sm uppercase"><IoHome size={20}></IoHome>Home</button></NavLink>
                                </>
                            }
                        </div>
                    </div>
                </div>






                <div className="col-span-10">
                    {/* outlet */}
                    <Outlet></Outlet>
                </div>
            </div>


        </div>
    );
};

export default Dashbord;
