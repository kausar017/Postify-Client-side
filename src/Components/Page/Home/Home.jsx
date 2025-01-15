import { Helmet } from "react-helmet-async";
import Bannar from "../Bannar/Bannar";
import PostedData from "../PostedData/PostedData";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Postify | Home</title>
            </Helmet>

            {/* Bannar */}
            {/* <Bannar></Bannar> */}
            {/* posted data */}
            <PostedData></PostedData>
        </div>
    );
};

export default Home;