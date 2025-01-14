
import { IoLogoGoogle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseAuth from "../UseAuth/UseAuth";

const SosalLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { handaleGoogle } = UseAuth()

    const handaleGoogleLogin = (e) => {
        e.preventDefault()
        console.log('hello');
        handaleGoogle()
    }
    return (
        <div>
            <button onClick={handaleGoogleLogin} className='p-2 border-black border rounded-full'><IoLogoGoogle size={30}></IoLogoGoogle > </button>
        </div>
    );
};

export default SosalLogin;