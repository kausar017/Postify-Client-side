import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut";
import Login from "../../AuthenTication/Login/Login";
import SignUp from "../../AuthenTication/SignUp/SignUp";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
    ]
  },
]);

export default Router;