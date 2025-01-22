
import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../adminVerify/UseAdmin";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";



const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [isAdmins, isAdminLoading] = UseAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) return <p>loading....</p>
    if (user && isAdmins) return children
    return <Navigate to='/' state={{ from: location }} replace='true' />
};

export default AdminRoute;
