import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo/Postify logo.png";
import { FiAlignJustify } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSignsPost } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import { TfiAnnouncement } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AllHooks/axiosSecure/useAxiosSecure";
import UseAdmin from "../AllHooks/adminVerify/useAdmin";
import { useEffect, useState } from "react";

const Dashbord = () => {
  // const axiosPiblic = useAxiosPiblic()
  const [isAdmin] = UseAdmin();
  const axiosSecure = useAxiosSecure();
  // const isAdmin = true

  const { data: announcements = [], refetch } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcement");
      refetch();
      return res.data;
    },
  });
  // console.log(announcements);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="w-full max-w-11/12  mx-auto">
      <Helmet>
        <title>Postify | dasahbord</title>
      </Helmet>

      <div className="grid grid-cols-12  min-h-screen">
        {isAdmin ? (
          <>
            <div className="dark:bg-pink-600/60 scroll-smooth xl:col-span-2 lg:col-span-3 space-y-3 xl:block lg:block md:hidden max-sm:hidden pt-3">
              <div className="flex flex-col ml-2 space-y-2">
                <div className=" flex items-center">
                  <img className="w-full max-w-[100px]" src={logo} alt={logo} />
                  <div className="flex-none">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={toggleTheme}
                    >
                      {theme === "light" ? (
                        <svg
                          className="swap-off h-8 w-8 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                      ) : (
                        <svg
                          className="swap-on h-8 w-8 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <NavLink to={"/dasbord/adminProfile"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <GrUserAdmin size={20}></GrUserAdmin> Admin Profile
                  </button>
                </NavLink>
                <NavLink to={"/dasbord/managUser"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <MdManageAccounts size={20}></MdManageAccounts> Manage Users
                  </button>
                </NavLink>
                <NavLink to={"/dasbord/reportComents"}>
                  <button className="btn btn-ghost btn-sm uppercase ">
                    <VscReport size={20}></VscReport> Reported Comments{" "}
                  </button>
                </NavLink>
                <NavLink to={"/dasbord/Announcement"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <TfiAnnouncement size={20}></TfiAnnouncement> Make
                    Announcement
                  </button>
                </NavLink>
              </div>
              <div className="divider"></div>
              <NavLink to={"/"}>
                <button className="btn btn-ghost btn-sm uppercase">
                  <IoHome size={20}></IoHome>Home
                </button>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="dark:bg-pink-600/60 scroll-smooth col-span-2 space-y-3 xl:block lg:block md:hidden max-sm:hidden pt-3">
              <div className="flex flex-col px-2 space-y-2">
                <div className="">
                  <img className="w-full max-w-[100px]" src={logo} alt={logo} />
                  <div className="flex-none">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={toggleTheme}
                    >
                      {theme === "light" ? (
                        <svg
                          className="swap-off h-8 w-8 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                      ) : (
                        <svg
                          className="swap-on h-8 w-8 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <NavLink to={"/dasbord/profile"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <CgProfile size={20}></CgProfile> My Profile
                  </button>
                </NavLink>
                <NavLink to={"/dasbord/addpost"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <IoIosAddCircleOutline size={20}></IoIosAddCircleOutline>Add
                    Post
                  </button>
                </NavLink>
                <NavLink to={"/dasbord/myPost"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <FaSignsPost size={20}></FaSignsPost>My Posts{" "}
                  </button>
                </NavLink>
              </div>
              <div className="divider"></div>
              <div className="flex flex-col space-y-1">
                <NavLink to={"/"}>
                  <button className="btn btn-ghost btn-sm uppercase">
                    <IoHome size={20}></IoHome>Home
                  </button>
                </NavLink>
              </div>
            </div>
          </>
        )}

        <div className="drawer xl:hidden  col-span-1 z-10  lg:hidden md:block">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn ">
              <FiAlignJustify size={20}></FiAlignJustify>
            </label>
          </div>
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu dark:bg-pink-600/60 scroll-smooth text-white min-h-full">
              {isAdmin ? (
                <div className="flex flex-col px-2 space-y-2">
                  <div className="flex items-center">
                    <img
                      className="w-full max-w-[100px]"
                      src={logo}
                      alt={logo}
                    />
                    <div className="flex-none">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? (
                          <svg
                            className="swap-off h-8 w-8 fill-current text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                          </svg>
                        ) : (
                          <svg
                            className="swap-on h-8 w-8 fill-current text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <NavLink to={"/dasbord/adminProfile"}>
                    <button className="btn btn-ghost btn-sm uppercase">
                      <GrUserAdmin size={20}></GrUserAdmin> Admin Profile
                    </button>
                  </NavLink>
                  <NavLink to={"/dasbord/managUser"}>
                    <button className="btn btn-ghost btn-sm uppercase">
                      <MdManageAccounts size={20}></MdManageAccounts> Manage
                      Users
                    </button>
                  </NavLink>
                  <NavLink to={"/dasbord/reportComents"}>
                    <button className="btn btn-ghost btn-sm uppercase ">
                      <VscReport size={20}></VscReport> Reported Comments{" "}
                    </button>
                  </NavLink>
                  <NavLink to={"/dasbord/Announcement"}>
                    <button className="btn btn-ghost btn-sm uppercase">
                      <TfiAnnouncement size={20}></TfiAnnouncement> Make
                      Announcement
                    </button>
                  </NavLink>
                  <div className="divider"></div>
                  <NavLink to={"/"}>
                    <button className="btn btn-ghost btn-sm uppercase">
                      <IoHome size={20}></IoHome>Home
                    </button>
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className="flex flex-col col-span-2 space-y-3">
                    <button className="">
                      <img
                        className="w-full max-w-[100px]"
                        src={logo}
                        alt={logo}
                      />
                    </button>
                    <NavLink to={"/dasbord/profile"}>
                      <button className="btn btn-ghost btn-sm uppercase">
                        <CgProfile size={20}></CgProfile> My Profile
                      </button>
                    </NavLink>
                    <NavLink to={"/dasbord/addpost"}>
                      <button className="btn btn-ghost btn-sm uppercase">
                        <IoIosAddCircleOutline
                          size={20}
                        ></IoIosAddCircleOutline>{" "}
                        Add Post
                      </button>
                    </NavLink>
                    <NavLink to={"/dasbord/myPost"}>
                      <button className="btn btn-ghost btn-sm uppercase">
                        <FaSignsPost size={20}></FaSignsPost> My Posts{" "}
                      </button>
                    </NavLink>
                  </div>
                  <div className="divider"></div>
                  <NavLink to={"/"}>
                    <button className="btn btn-ghost btn-sm uppercase">
                      <IoHome size={20}></IoHome>Home
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-10 lg:col-span-9 md:col-span-10 max-sm:col-span-10">
          {/* outlet */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
