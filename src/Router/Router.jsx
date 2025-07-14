
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import ProfilePage from "../Pages/ProfilePage";
import FAQsPage from "../Pages/FAQPage";
import AddPolicy from "../Pages/AddPolicies";
import AllPolicies from "../Pages/AllPolicies";
import PolicyDetails from "../Pages/PolicyDetails";
import QuotePage from "../Pages/QuotePage";
import ApplicationFormPage from "../Pages/ApplicationFormPage";
import PrivateRoute from "./PrivateRoute";
import BeAgent from "../Components/Home/BeAgent";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../Layout/DashboardLayout";
import MakeAgent from "../Pages/Dashboard/MakeAgent";
import MyApplications from "../Pages/Dashboard/MyApplications";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin";
import ManageApplications from "../Pages/Dashboard/ManageApplications";
import ManagePolicies from "../Pages/Dashboard/ManagePolicies";
import ApplyPolicy from "../Pages/Dashboard/ApplyPolicy";

import PaymentPage from "../Pages/Dashboard/PaymentPage";
import PaymentStatus from "../Pages/Dashboard/PaymentStatus";
import ClaimForm from "../Pages/Dashboard/ClaimForm";
import ManageTransactions from "../Pages/Dashboard/ManageTransactions";
import ManageBlogs from "../Pages/Blogs/ManageBlogs";
import AddBlogs from "../Pages/Blogs/AddBlogs";
import Blog from "../Pages/Blogs/Blogs";





const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'faq',
        Component: FAQsPage,
      },
      {
        path: 'add-policy',
        Component: () => (
          <PrivateRoute>
            <AddPolicy />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-policies',
        Component: AllPolicies,
      },
      {
        path: "policy/:id",
        Component: PolicyDetails,
      },
      {
        path: 'quote',
        Component: QuotePage,
      },
      {
        path: 'apply',
        Component: ApplicationFormPage,
      },
      {
        path: 'be-an-agent',
        Component: BeAgent,
      },
      
    
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        index: true,
        Component:DashboardLayout
      },
     
      {
        path:'make-agent',
        Component: MakeAgent

      },
    {
      path:'myPolicies',
      Component: MyApplications
    },
    {
      path: 'manageUsers',
      Component: ManageUsers
    },
    {
      path:'makeAdmin',
      Component: MakeAdmin
    },
    {
      path:'manageApplications',
      Component:ManageApplications
    },
    {
      path:'managePolicy',
      Component:ManagePolicies
    },
    {
      path:'applyPolicy/:id',
      Component:ApplyPolicy
    },
    
    {
      path:'payment/:id',
      Component:PaymentPage
    },
    {
      path:'paymentStatus/:transactionId',
      Component: PaymentStatus
    },
    {
      path:'claimForm',
      Component: ClaimForm
    },
    {
      path:'manageTransactions',
      Component:ManageTransactions
    },
    {
      path:'addBlogs',
      Component:AddBlogs
    },
    {
      path:'manage-blogs',
      Component:ManageBlogs
    },
    {
      path:'blogs',
      Component:Blog
    }
     
    ]
  }

]);

export default router;
