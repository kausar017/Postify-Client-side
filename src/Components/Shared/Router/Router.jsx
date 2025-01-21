import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut";
import Login from "../../AuthenTication/Login/Login";
import SignUp from "../../AuthenTication/SignUp/SignUp";
import Home from "../../Page/Home/Home";
import Error from "../../Page/Error/Error";
import Dashbord from "../../Dashbord/Dashbord";
import AddPost from "../../Dashbord/DashbordPage/AddPost/AddPost";
import PrivetRout from "../../AuthenTication/PrivetRoute/PrivetRout";
import PostDetals from "../../Page/PostDetals/PostDetals";
import Membership from "../../Page/Membership/Membership";
import UserProfile from "../../Dashbord/DashbordPage/UserPorfile/userProfile";
import MyPost from "../../Dashbord/DashbordPage/MyPost/MyPost";
import CommentsPage from "../../Dashbord/CommentsPage/CommentsPage";
import AdminProfile from "../../Dashbord/AdminAllPage/AdminProfile/AdminProfile";
import ManageUser from "../../Dashbord/AdminAllPage/ManageUser/ManageUser";
import Reported from "../../Dashbord/AdminAllPage/ReportedComments/Reported";
import Announcement from "../../Dashbord/AdminAllPage/Announcement/Announcement";
import UserAnnounce from "../../Dashbord/DashbordPage/userAnnounce/UserAnnounce";
import AdminRoute from "../../AllHooks/AdminRoute/AdminRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/detals/:id',
        element: <PrivetRout>
          <PostDetals></PostDetals>
        </PrivetRout>
      },
      {
        path: '/member',
        element: <PrivetRout>
          <Membership></Membership>
        </PrivetRout>
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    // dashbord
    path: '/dasbord',
    element: <PrivetRout>
      <Dashbord></Dashbord>
    </PrivetRout>,
    children: [
      // user route
      {
        path: '/dasbord/profile',
        element: <PrivetRout>
          <UserProfile></UserProfile>
        </PrivetRout>
      },
      {
        path: '/dasbord/addpost',
        element: <PrivetRout>
          <AddPost></AddPost>
        </PrivetRout>
      },
      {
        path: '/dasbord/myPost',
        element: <PrivetRout>
          <MyPost></MyPost>
        </PrivetRout>
      },
      {
        path: '/dasbord/comment/:id',
        element: <PrivetRout>
          <CommentsPage></CommentsPage>
        </PrivetRout>
      },
      {
        path: '/dasbord/Announce',
        element: <PrivetRout>
          <UserAnnounce></UserAnnounce>
        </PrivetRout>
      },
      // admin route
      {
        path: '/dasbord/adminProfile',
        element: <PrivetRout>
          <AdminProfile></AdminProfile>
        </PrivetRout>
      },
      {
        path: '/dasbord/managUser',
        element: <PrivetRout><ManageUser></ManageUser></PrivetRout>
      },
      {
        path: '/dasbord/reportComents',
        element: <PrivetRout><Reported></Reported></PrivetRout>
      },
      {
        path: '/dasbord/Announcement',
        element: <PrivetRout><Announcement></Announcement></PrivetRout>
      },
    ]
  }
]);

export default Router;