
import { IoLogoGoogle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import toast from "react-hot-toast";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";

const SosalLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPiblic = useAxiosPiblic()
    const { handaleGoogle, user } = UseAuth()

    // console.log(user);


    const handaleGoogleLogin = async (e) => {

        handaleGoogle()
            .then((result) => {
                console.log(result.user?.displayName);

                const userData = {
                    bage: 'Bronze',
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                // console.log();

                axiosPiblic.post(`/users/${result.user?.email}`, userData)
                    .then((result) => {
                        navigate(from, { replace: true })
                        toast.success('Register Success')
                        // console.log(result.user);
                    })
            });

    }
    return (
        <div>
            <button onClick={handaleGoogleLogin} className='p-2 border-black border rounded-full'><IoLogoGoogle size={30}></IoLogoGoogle > </button>
        </div>
    );
};

export default SosalLogin;