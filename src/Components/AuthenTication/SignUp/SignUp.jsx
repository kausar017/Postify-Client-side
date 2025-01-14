import { Helmet } from "react-helmet-async";


const SignUp = () => {
    return (
        <div>
            <Helmet>
                <title>Postify | Singup</title>
            </Helmet>

            <div>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center justify-center w-full max-w-7xl mx-auto shadow-xl md:p-10">

                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <h1 className='text-center text-4xl font-bold'>sing up</h1>
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
                                    <div className="absolute right-2 max-sm:bottom-16 max-lg:bottom-16 md:bottom-5">
                                        <p onClick={togolepassword}>{showPassword ? <IoEyeSharp></IoEyeSharp> : <IoEyeOff></IoEyeOff>} </p>
                                    </div>
                                    <input type={showPassword ? "text" : "password"} name='password' {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/
                                    })}
                                        placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === "minLength" && (<p className="text-red-600">password mast be 6 carecters</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (<p className="text-red-600">password mast be less then 20 cerecters</p>
                                    )}
                                    {errors.password?.type === "pattern" && (<p className="text-red-600">password with at least a symbol, upper and lower case letters and a number</p>
                                    )}

                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn bg-[#D1A054B3]">signup</button>
                                </div>
                                <p className='text-center text-[#cf8d29b3]'>your Acoutn allrady Created please <Link className="text-green-600 font-bold  hover:underline" to={'/login'}>Login</Link> </p>
                                <div className="divider"></div>
                                <p className="text-center">or sing up with</p>
                                <div className="flex justify-center items-center gap-3">
                                    <SosalLogin></SosalLogin>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-5xl font-bold">singup now!</h1>
                            <p className="py-6">
                                <Lottie className="w-80" animationData={singupLottie}></Lottie>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </div >
    );
};

export default SignUp;