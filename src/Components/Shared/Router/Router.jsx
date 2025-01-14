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
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
    ],
  },
  {
    // dashbord
    path: '/dasbord',
    element: <Dashbord></Dashbord>,
    children: [
      {
        path: '/dasbord/addpost',
        element: <AddPost></AddPost>
      }
    ]
  }
]);

export default Router;