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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/signup",
    element: <Signup />,
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






]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
