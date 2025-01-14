import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import loginLottie from "../../../assets/Lottify/login.json";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import SosalLogin from "../SosalLogin/SosalLogn";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togolepassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // Call your login function here (example: login(email, password))
    };

    return (
        <>
            <Helmet>
                <title>Postify | Login</title>
            </Helmet>

            <div className="text-black">
                <div>
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center justify-center w-full max-w-7xl mx-auto shadow-xl md:p-10">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-5xl font-bold">Login now!</h1>
                                <div className="py-6">
                                    <Lottie className="w-full max-w-96" animationData={loginLottie}></Lottie>
                                </div>
                            </div>
                            <div className="">
                                <form className="card-body" onSubmit={handleLoginSubmit}>
                                    <h1 className="text-center text-4xl font-bold">Login</h1>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="email"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="password"
                                            className="input input-bordered"
                                            required
                                        />
                                        <div className="absolute right-4 bottom-10">
                                            <button
                                                type="button"
                                                onClick={togolepassword}
                                                aria-label="Toggle password visibility"
                                            >
                                                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
                                            </button>
                                        </div>
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">
                                                Forgot password?
                                            </a>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn bg-[#D1A054B3]">Login</button>
                                    </div>
                                    <div className="text-center text-[#cf8d29b3]">
                                        New here? Create a New Account please{" "}
                                        <Link to={"/signup"} className="text-red-600 font-bold hover:underline">
                                            signup
                                        </Link>{" "}
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <div>or sign in with</div>
                                        <div className="flex items-center p-2 gap-3">
                                            <SosalLogin></SosalLogin>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
