import Lottie from "lottie-react";
import logo from "../../../assets/Lottify/error.json"
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-4xl font-bold">opss Data not Found</h1>
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <Lottie animationData={logo} className="w-80"></Lottie>
            <Link to={'/'} className="btn bg-lime-600 text-white">Back to Home page</Link>
        </div>
    );
};

export default Error;