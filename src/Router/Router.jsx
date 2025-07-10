import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import BlogDetails from "../Pages/BlogDetails";
import ProfilePage from "../Pages/ProfilePage";
import FAQsPage from "../Pages/FAQPage";
import AddPolicy from "../Pages/AddPolicies";
import AllPolicies from "../Pages/AllPolicies";
import PolicyDetails from "../Pages/PolicyDetails";

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
      },
      {
        path:'add-policy',
        Component:AddPolicy
      },
      {
        path: 'all-policies',
        Component:AllPolicies
      },
      {
        path:"policy/:id",
        Component: PolicyDetails
      }
    ]
  },
]);

export default router;