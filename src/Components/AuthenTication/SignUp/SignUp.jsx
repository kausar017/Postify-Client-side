import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import SosalLogin from "../SosalLogin/SosalLogn";
import logo from "../../../assets/Logo/Postify logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import UseAuth from "../UseAuth/UseAuth";
import { useState } from "react";
import singupLottie from "../../../assets/Lottify/singup.json"
import toast from "react-hot-toast";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";

const SignUp = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPiblic = useAxiosPiblic()

    const { handaleRegister, manageUsr } = UseAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    const onSubmit = async (data) => {
        // console.log(data);

        try {
            //    handale register
            await handaleRegister(data.email, data.password)
            manageUsr(data.name, data.photo);
            toast.success('Signup Succesfuly', {
                duration: 3000, position: "top-right"
            });
            reset()
            navigate(from, { replace: true });

            const userData = {
                bage: 'Bronze',
                email: data.email,
                name:data.name
            };

            // Send data to the server
            await axiosPiblic.post(`/users/${data?.email}`, userData);

        }
        catch (error) {
            console.error('Signup error:', error);
            toast.error('Signup Failed', {
                duration: 3000, position: "top-right"
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togolepassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <Helmet>
                <title>Postify | Singup</title>
            </Helmet>

            <div>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center justify-center w-full max-w-7xl mx-auto border shadow-xl md:p-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full border">
                            <h1 className="text-5xl font-bold text-center py-3 max-sm:block md:block lg:hidden">singup now!</h1>
                            <img className="w-full max-w-[120px] border bg-black opacity-40 mx-auto" src={logo} alt="" />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email'{...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="url" name='photo'{...register("photo", { required: true })} placeholder="Photo Url" className="input input-bordered" />
                                {errors.photo && <span className="text-red-600">valide photo Url is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="absolute right-4 top-2/3 transform -translate-y-1/2">
                                    <button
                                        type="button"
                                        onClick={togolepassword}
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
                                    </button>
                                </div>
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

                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">signup</button>
                                {/* <Toaster/> */}

                            </div>
                            <p className='text-center text-[#cf8d29b3]'>your Acoutn allrady Created please <Link className="text-green-600 font-bold  hover:underline" to={'/login'}>Login</Link> </p>
                            <div className="divider"></div>
                            <p className="text-center">or sing up with</p>
                            <div className="flex justify-center items-center gap-3">
                                <SosalLogin></SosalLogin>
                            </div>
                        </form>

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-5xl font-bold">Join now!</h1>
                            <div className="py-6 xl:block lg:block max-sm:hidden md:hidden">
                                <Lottie className="w-80" animationData={singupLottie}></Lottie>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;