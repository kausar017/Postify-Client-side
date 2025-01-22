import { Helmet } from "react-helmet-async";
import PostedData from "../PostedData/PostedData";
import UserAnnounce from "../../Dashbord/DashbordPage/userAnnounce/UserAnnounce";

const Home = () => {


    return (
        <div className="p-0 m-0">
            <Helmet>
                <title>Postify | Home</title>
            </Helmet>

            {/* posted data */}
            <PostedData></PostedData>
            {/* annaunsment */}
            <UserAnnounce></UserAnnounce>
        </div>
    );
};

export default Home;