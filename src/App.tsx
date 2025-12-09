import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router"; 
import "./App.css";
import Landing from "./Pages/LandingPage/Landing";
import Signup from "./Pages/Auth/Signup/Signup";
import Login from "./Pages/Auth/Login/Login";
import ForgotPassword from "./Pages/Auth/ForgotPsw/ForgotPsw";
import ResetPassword from "./Pages/Auth/ResetPsw/ResetPsw";
import Dashboard from "./Pages/Dashboard/Dashboard";

import EscrowFlow from "./Pages/Escrow/newEscrow/EscrowFlow";
import EscrowHome from "./Pages/Escrow/escrowMgt/EscrowHome";
import EscrowTrans from "./Pages/Escrow/escrowTransactions/EscrowTrans";
import TransactionsScreen from "./Pages/Transactions/TransactionsScreen";
import SettingsScreen from "./Pages/Settings/SettingsScreen";
import NotificationPage from "./Pages/Notification/Notification";
import DisputePage from "./Pages/Dispute/Dispute";
import AdminLogin from "./Pages/Admin/admin-auth/AdminLogin";
import ResolveDispute from "./Pages/Admin/resolve-dispute/ResolveDispute";
import UsersPage from "./Pages/Admin/users/User";
import Finance from "./Pages/Admin/finance/Finace";
import AdminDashboard from "./Pages/Admin/admin-dash/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "g/",
    element: <Landing />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-psw",
    element: <ForgotPassword />,
  },

  {
    path: "/reset-psw",
    element: <ResetPassword />,
  },


  {
    path: "/dashboard",
    element: <Dashboard />,
  },



  {
    path: "/escrows",
    element: <EscrowHome/>,
  },

  {
    path: "/new-escrow",
    element: <EscrowFlow/>,
  },

  {
    path: "/escrow-transactions",
    element: <EscrowTrans/>,
  },


  {
    path: "/transactions",
    element: <TransactionsScreen/>,
  },



  {
    path: "/settings",
    element: <SettingsScreen/>,
  },

  {
    path: "/notifications",
    element: <NotificationPage/>,
  },


  {
    path: "/disputes",
    element: <DisputePage/>,
  },


  // admin

  {
    path: "/admin",
    element: <AdminLogin/>,
  },

  {
    path: "/admin-users",
    element: <UsersPage/>,
  },

  {
    path: "/resolve-disputes",
    element: <ResolveDispute/>,
  },


  {
    path: "/finance",
    element: <Finance/>,
  },

  {
    path: "/admin-dash",
    element: <AdminDashboard/>,
  },

]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
