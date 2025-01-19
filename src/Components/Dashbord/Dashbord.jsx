import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo/Postify logo.png"
import { FiAlignJustify } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSignsPost } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import { TfiAnnouncement } from "react-icons/tfi";
import useAxiosPiblic from "../AllHooks/useAxiosPiblic";
import { useQuery } from "@tanstack/react-query";

const Dashbord = () => {
    const axiosPiblic = useAxiosPiblic()
    const isAdmin = false

    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/announcement')
            refetch()
            return res.data;
        }
    })
    // console.log(announcements);
    return (
        <div className="">
            <Helmet>
                <title>Postify | dasahbord</title>
            </Helmet>


            <div className="grid grid-cols-12 min-h-screen">

                {isAdmin ?

                    <>
                        <div className="bg-primary/30 xl:col-span-2 lg:col-span-3 space-y-3 xl:block lg:block md:hidden max-sm:hidden pt-3">
                            <div className="flex flex-col ml-2 space-y-2">
                                <div className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></div>
                                <NavLink to={'/dasbord/adminProfile'}><button className="btn btn-ghost btn-sm uppercase"><GrUserAdmin size={20}></GrUserAdmin> Admin Profile</button></NavLink>
                                <NavLink to={'/dasbord/managUser'}><button className="btn btn-ghost btn-sm uppercase"><MdManageAccounts size={20}></MdManageAccounts> Manage Users</button></NavLink>
                                <NavLink to={'/dasbord/reportComents'}><button className="btn btn-ghost btn-sm uppercase "><VscReport size={20}></VscReport> Reported Comments </button></NavLink>
                                <NavLink to={'/dasbord/Announcement'}><button className="btn btn-ghost btn-sm uppercase"><TfiAnnouncement size={20}></TfiAnnouncement> Make Announcement</button></NavLink>
                            </div>
                            <div className="divider"></div>
                            <NavLink to={'/'}><button className="btn btn-ghost btn-sm uppercase"><IoHome size={20}></IoHome>Home</button></NavLink>
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
                            <div className="flex flex-col space-y-1">
                                <NavLink to={'/'}><button className="btn btn-ghost btn-sm uppercase"><IoHome size={20}></IoHome>Home</button></NavLink>
                                <div>
                                    {
                                        announcements.length === 0 ?


                                            ""

                                            :
                                            <NavLink to={'/dasbord/Announce'}><button className="btn btn-ghost btn-sm uppercase animate-bounce"><TfiAnnouncement size={20}></TfiAnnouncement>Announcement <span className="badge badge-sm indicator-item ">{announcements?.length}</span></button></NavLink>
                                    }

                                </div>
                            </div>
                        </div>
                    </>
                }


                <div className="drawer xl:hidden  col-span-1 z-10  lg:hidden md:block">
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
                                    <div className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></div>
                                    <NavLink to={'/dasbord/adminProfile'}><button className="btn btn-ghost btn-sm uppercase"><GrUserAdmin size={20}></GrUserAdmin> Admin Profile</button></NavLink>
                                    <NavLink to={'/dasbord/managUser'}><button className="btn btn-ghost btn-sm uppercase"><MdManageAccounts size={20}></MdManageAccounts> Manage Users</button></NavLink>
                                    <NavLink to={'/dasbord/reportComents'}><button className="btn btn-ghost btn-sm uppercase "><VscReport size={20}></VscReport> Reported Comments </button></NavLink>
                                    <NavLink to={'/dasbord/Announcement'}><button className="btn btn-ghost btn-sm uppercase"><TfiAnnouncement size={20}></TfiAnnouncement> Make Announcement</button></NavLink>
                                    <div className="divider"></div>
                                    <NavLink to={'/'}><button className="btn btn-ghost btn-sm uppercase"><IoHome size={20}></IoHome>Home</button></NavLink>
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






                <div className="xl:col-span-9 lg:col-span-9 md:col-span-10 max-sm:col-span-10">
                    {/* outlet */}
                    <Outlet></Outlet>
                </div>
            </div>


        </div>
    );
};

export default Dashbord;
