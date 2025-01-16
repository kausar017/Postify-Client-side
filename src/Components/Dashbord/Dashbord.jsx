import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo/Postify logo.png"
import { FiAlignJustify } from "react-icons/fi";

const Dashbord = () => {



    return (
        <div className="">
            <Helmet>
                <title>Postify | dasahbord</title>
            </Helmet>


            <div className="grid grid-cols-12 min-h-screen">
                <div className="bg-primary/30 col-span-2 p-5 space-y-3 xl:block lg:block md:hidden max-sm:hidden">
                    <div className="flex flex-col px-2 space-y-2">
                        <Link to={'/dasbord'} className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></Link>
                        <NavLink to={'/dasbord'} className={''}>My Profile</NavLink>
                        <NavLink to={'/dasbord/addpost'} className={' '}>Add Post</NavLink>
                        <NavLink to={'/dasbord/myPost'} className={''}>My Posts </NavLink>
                        <div className="divider"></div>
                        <NavLink to={'/'} className={''}>Home</NavLink>
                    </div>
                </div>

                <div className="drawer xl:hidden col-span-1 z-10  lg:hidden md:block">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn "><FiAlignJustify size={20}></FiAlignJustify></label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu bg-[#A480FF] text-white min-h-full">
                            <div className="flex flex-col col-span-2 p-5 space-y-3">
                                <button className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></button>
                                <NavLink to={'/dasbord'} className={''}>My Profile</NavLink>
                                <NavLink to={'/dasbord/addpost'} className={' '}>Add Post</NavLink>
                                <NavLink to={'/dasbord/myPost'} className={''}>My Posts </NavLink>
                                <div className="divider"></div>
                                <NavLink to={'/'} className={''}>Home</NavLink>
                            </div>
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