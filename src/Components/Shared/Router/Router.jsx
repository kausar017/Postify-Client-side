import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut";
import Login from "../../AuthenTication/Login/Login";

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      children: [
        {
            path: '/login',
            element: <Login></Login>
        }
      ]
    },
  ]);

export default Router;