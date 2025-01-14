import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import logo from "../../../assets/Logo/Postify logo.png"
import loginLottie from "../../../assets/Lottify/login.json";
import { IoEyeOff, IoEyeSharp, IoLogoGoogle } from "react-icons/io5";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SosalLogin from "../SosalLogin/SosalLogn";
import UseAuth from "../UseAuth/UseAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togolepassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const { handalLogin } = UseAuth()
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await handalLogin(data.email, data.password)
            toast.success('Login Successfuly', {
                duration: 3000,
            });

            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Login Failed!', {
                duration: 3000,
            });

        }
    }

    return (
        <>
            <Helmet>
                <title>Postify | Login</title>
            </Helmet>

            <div >
                <div>
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center justify-center w-full max-w-7xl mx-auto border shadow-xl md:p-5">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-5xl font-bold">Join now!</h1>
                                <div className="py-6 xl:block lg:block max-sm:hidden md:hidden">
                                    <Lottie className="w-full max-w-96" animationData={loginLottie}></Lottie>
                                </div>
                            </div>
                            <div className="border">
                                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                    <img className="w-full max-w-[120px] border bg-black opacity-40 mx-auto" src={logo} alt="" />
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            {...register("email", { required: true })}
                                            placeholder="email"
                                            className="input input-bordered"

                                        />
                                    </div>
                                    {errors.email && <span className="text-red-700">Email is required</span>}
                                    <div className="form-control relative ">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 12,
                                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,12}$/
                                            })}
                                            placeholder="password"
                                            className="input input-bordered "
                                        />

                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <button
                                                type="button"
                                                onClick={togolepassword}
                                                aria-label="Toggle password visibility"
                                            >
                                                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
                                            </button>
                                        </div>

                                        <label className="label">
                                            {errors.password?.type === "required" && (
                                                <span className="text-red-700">Password is required</span>
                                            )}
                                            {errors.password?.type === "minLength" && (
                                                <span className="text-red-700">Password must be at least 6 characters</span>
                                            )}
                                            {errors.password?.type === "maxLength" && (
                                                <span className="text-red-700">Password must not exceed 12 characters</span>
                                            )}
                                            {errors.password?.type === "pattern" && (
                                                <span className="text-red-700">
                                                    Password must contain uppercase, lowercase, special characters, or a number.
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-secondary">Login</button>
                                        {/* <Toaster /> */}

                                    </div>
                                    <div className="text-center text-[#cf8d29b3]">
                                        New here? Create a New Account please{" "}
                                        <Link to={"/signup"} className="text-red-600 font-bold hover:underline">
                                            signup
                                        </Link>
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
