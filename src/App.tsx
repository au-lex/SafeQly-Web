import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router"; 
import "./App.css";
import { ProtectedRoute, AuthRoute, AdminAuthRoute } from "./utils/ProtectedRoutes";
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
import VerifyOTP from "./Pages/Auth/VerifyOtp/VerifyOtp";
import PaymentCallback from "./Pages/Wallet/VerifyPayment";
import EscrowDetails from "./Pages/Escrow/escrowTransactions/EscrowDetails";

import AOS from 'aos';
import 'aos/dist/aos.css';
import GoogleCallback from "./Pages/Auth/Login/Google";
import AdminWithdrawals from "./Pages/Admin/admin-withdrawal/AdminWithdrawal";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/auth/google/callback",
    element: <GoogleCallback />,
  },

  // Auth routes (redirects to dashboard if already logged in)
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
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
    ],
  },

  // Protected user routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/escrows",
        element: <EscrowHome />,
      },
      {
        path: "/new-escrow",
        element: <EscrowFlow />,
      },
      {
        path: "/escrow-transactions",
        element: <EscrowTrans />,
      },
      {
        path: "/escrow/:id",
        element: <EscrowDetails />,
      },
      {
        path: "/transactions",
        element: <TransactionsScreen />,
      },
      {
        path: "/settings/:section",
        element: <SettingsScreen />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
      {
        path: "/disputes",
        element: <DisputePage />,
      },
      {
        path: "/payment-callback",
        element: <PaymentCallback />,
      },
    ],
  },

  // Admin auth route (redirects to admin-dash if already logged in)
  {
    element: <AdminAuthRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLogin />,
      },
    ],
  },

  // Protected admin routes
  {
    element: <ProtectedRoute isAdminRoute={true} redirectPath="/admin" />,
    children: [
      {
        path: "/admin-dash",
        element: <AdminDashboard />,
      },
      {
        path: "/admin-users",
        element: <UsersPage />,
      },
      {
        path: "/resolve-disputes",
        element: <ResolveDispute />,
      },
      {
        path: "/finance",
        element: <Finance />,
      },

      {
        path: "/admin-withdrawals",
        element: <AdminWithdrawals />,
      },
    ],
  },
]);

export default function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}