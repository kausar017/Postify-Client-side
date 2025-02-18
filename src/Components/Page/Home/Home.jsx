import { Helmet } from "react-helmet-async";
import PostedData from "../PostedData/PostedData";
import UserAnnounce from "../../Dashbord/DashbordPage/userAnnounce/UserAnnounce";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
import AboutUs from "../AboutUs/Aboutus";
import Contact from "../Contact/Contact";

const Home = () => {
  const { user } = UseAuth();

  return (
    <div className="p-0 m-0">
      <Helmet>
        <title>Postify | Home</title>
      </Helmet>

      {/* posted data */}
      <PostedData></PostedData>
      {/* annaunsment */}
      <UserAnnounce></UserAnnounce>

      <AboutUs />
      <Contact/>
    </div>
  );
};

export default Home;
