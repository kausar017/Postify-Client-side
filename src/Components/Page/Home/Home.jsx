import { Helmet } from "react-helmet-async";
import PostedData from "../PostedData/PostedData";
import { useLoaderData } from "react-router-dom";

const Home = () => {

   
    return (
        <div>
            <Helmet>
                <title>Postify | Home</title>
            </Helmet>

            {/* posted data */}
            <PostedData></PostedData>
        </div>
    );
};

export default Home;