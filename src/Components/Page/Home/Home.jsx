import { Helmet } from "react-helmet-async";
import PostedData from "../PostedData/PostedData";
import UserAnnounce from "../../Dashbord/DashbordPage/userAnnounce/UserAnnounce";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";

const Home = () => {
    const { user } = UseAuth()

    return (
        <div className="p-0 m-0">
            <Helmet>
                <title>Postify | Home</title>
            </Helmet>

            {/* posted data */}
            <PostedData></PostedData>
            {/* annaunsment */}
            {
                user && <UserAnnounce></UserAnnounce>
            }

        </div>
    );
};

export default Home;