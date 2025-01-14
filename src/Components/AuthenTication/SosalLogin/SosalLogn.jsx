
import { IoLogoGoogle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import toast from "react-hot-toast";

const SosalLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { handaleGoogle } = UseAuth()

    const handaleGoogleLogin = async (e) => {
        e.preventDefault()
        // console.log('hello');
        try {
            await handaleGoogle()
            toast.success('Google Login success')
            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Login Faield', error)
        }
    }
    return (
        <div>
            <button onClick={handaleGoogleLogin} className='p-2 border-black border rounded-full'><IoLogoGoogle size={30}></IoLogoGoogle > </button>
        </div>
    );
};

export default SosalLogin;