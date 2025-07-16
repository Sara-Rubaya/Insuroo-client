
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
import AssignedCustomers from "../Pages/Dashboard/AssignedCustomers";
import FeaturedAgents from "../Pages/FeaturedAgents";
import Contact from "../Components/Home/Contact";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import Error from "../Pages/Error";
import Payment from "../Pages/Dashboard/Payment";






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
      {
        path:'agent',
        Component:FeaturedAgents
      },
      {
        path:'contact',
        Component:Contact
      },
      {
      path:'blogs',
      Component:Blog
    },
    {
      path:'*',
      Component: Error
    }
      
    
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
     
      // admin
      {
        path:'make-agent',
        element:<AdminRoute><MakeAgent></MakeAgent></AdminRoute>

      },
    
    {
      path: 'manageUsers',
      element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
    },
    {
      path:'makeAdmin',
      element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
    },
    {
      path:'manageApplications',
      element:<AdminRoute><ManageApplications></ManageApplications></AdminRoute>
    },
    {
      path:'managePolicy',
      element:<AdminRoute><ManagePolicies></ManagePolicies></AdminRoute>
    },
    {
      path:'manageTransactions',
     element:<AdminRoute><ManageTransactions></ManageTransactions></AdminRoute>
    },

    //customer
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
      path:'payment',
      Component: Payment
    },
    {
      path:'claimForm',
      Component: ClaimForm
    },
     {
      path:'myPolicies',
      Component: MyApplications
    },
    

    //agent
    {
      path:'addBlogs',
      element:<AgentRoute><AddBlogs></AddBlogs></AgentRoute>
    },
    {
      path:'manage-blogs',
      element:<AgentRoute><ManageBlogs></ManageBlogs></AgentRoute>
    },
    
    
    {
      path:'assignedCustomers',
     element:<AgentRoute><AssignedCustomers></AssignedCustomers></AgentRoute>
      
    },
   
     
    ]
  }

]);

export default router;
