import { Helmet } from "react-helmet-async";
import Bannar from "../Bannar/Bannar";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Postify | Home</title>
            </Helmet>

            {/* Bannar */}
            <Bannar></Bannar>
        </div>
    );
};

export default Home;