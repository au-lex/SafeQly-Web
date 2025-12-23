import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
  isAdminRoute?: boolean;
}

export const ProtectedRoute = ({ 
  redirectPath = "/login",
  isAdminRoute = false 
}: ProtectedRouteProps) => {
  const token = localStorage.getItem(isAdminRoute ? 'adminToken' : 'authToken');
  
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

// AuthRoute.tsx - Prevents logged-in users from accessing auth pages
export const AuthRoute = () => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

// AdminAuthRoute.tsx - Prevents logged-in admins from accessing admin login
export const AdminAuthRoute = () => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (adminToken) {
    return <Navigate to="/admin-dash" replace />;
  }

  return <Outlet />;
};