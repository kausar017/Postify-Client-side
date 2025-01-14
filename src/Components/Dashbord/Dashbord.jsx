import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo/Postify logo.png"
const Dashbord = () => {


    return (
        <div className="">
            <Helmet>
                <title>Postify | dasahbord</title>
            </Helmet>


            <div className="grid grid-cols-12 min-h-screen">
                <div className="flex flex-col bg-primary/30 col-span-2 p-5 space-y-3">
                    <button className=""><img className="w-full max-w-[100px]" src={logo} alt={logo} /></button>
                    <NavLink className={''}>My Profile</NavLink>
                    <NavLink to={'/dasbord/addpost'} className={' '}>Add Post</NavLink>
                    <NavLink className={''}>My Posts </NavLink>
                    <div className="divider"></div>

                    <NavLink to={'/'} className={''}>Home</NavLink>

                </div>
                <div className="">
                    {/* outlet */}
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashbord;