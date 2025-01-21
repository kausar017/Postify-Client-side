
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../UseAuth/UseAuth";
import Loader from "../../Page/Loader/Loader";

const PrivetRout = ({ children }) => {

    const location = useLocation()

    const { user, looder } = UseAuth()
    // console.log({user, looder});

    if (looder) {
        return <Loader></Loader>
    }
    if (!user) {
        return <Navigate state={{ from: location }} to="/login" replace></Navigate>
    }

    return children;
};

export default PrivetRout;