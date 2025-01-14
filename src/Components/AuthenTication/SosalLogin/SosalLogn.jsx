
import { IoLogoGoogle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseAuth from "../UseAuth/UseAuth";

const SosalLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const Google = UseAuth()

    const handaleGoogleLogin = () => {
        console.log('hello');
        Google()
    }
    return (
        <div>
            <button onClick={(e) => handaleGoogleLogin(e)} className='p-2 border-black border rounded-full'><IoLogoGoogle size={30}></IoLogoGoogle > </button>
        </div>
    );
};

export default SosalLogin;