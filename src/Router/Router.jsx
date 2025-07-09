import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import BlogsPage from "../Pages/BlogPage";
import BlogDetails from "../Pages/BlogDetails";
import ProfilePage from "../Pages/ProfilePage";
import FAQsPage from "../Pages/FAQPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'login',
            Component:Login
        },
        {
            path:'register',
            Component: Register
        },
        {
            path:'blogs',
            Component:BlogsPage
        },
        {
        path: 'blogs/:blogId',
        Component: BlogDetails
      },
      {
        path:'profile',
        Component:ProfilePage
      },
      {
        path:'faqs',
        Component:FAQsPage
      }
    ]
  },
]);

export default router;