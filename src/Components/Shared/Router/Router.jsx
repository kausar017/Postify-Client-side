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
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home></Home>
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
      // admin route
    ]
  }
]);

export default Router;