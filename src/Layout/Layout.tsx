import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Home2,
  Trade,
  Send2,
  SearchNormal1,
  Notification,
  Headphone,
  ArrowDown2,
  Setting2,
  Receipt2,
  Logout,

} from "iconsax-react";
import { useLogout } from "../Hooks/useAuth";

interface LayoutProps {
  children?: React.ReactNode;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

// --- Logout Modal Component ---
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl transform transition-all scale-100">
        <div className="text-center">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Logout size="32" variant="Bold" color="currentColor" className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Confirm Logout
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to log out of your account? You will need to
            sign in again to access your data.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors text-sm flex items-center justify-center"
            >
              {isLoading ? "Logging out..." : "Yes, Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Layout Component ---
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: Home2,
      label: "Home",
      href: "/dashboard",
    },
    {
      icon: Trade,
      label: "Escrows",
      href: "/escrows",
    },
    {
      icon: Send2,
      label: "Disputes",
      href: "/disputes",
    },
    {
      icon: Receipt2,
      label: "Transactions",
      href: "/transactions",
    },
    {
      icon: Setting2,
      label: "Settings",
      href: "/settings",
    },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout(undefined, {
      onSettled: () => {
        setShowLogoutModal(false);
      },
    });
  };

  const NavItemComponent = ({ item }: { item: NavItem }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1 ${
          isActive
            ? "text-pri bg-emerald-50 border border-emerald-100 font-bold"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size="20"
            color="currentColor"
            variant={isActive ? "Bold" : "Outline"}
          />
          <span className="font-medium text-sm">{item.label}</span>
        </>
      )}
    </NavLink>
  );

  const MobileNavItemComponent = ({ item }: { item: NavItem }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center px-3 py-2 font-body hover:text-emerald-900 transition-colors ${
          isActive ? "text-emerald-900 font-bold" : "text-gray-500"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size="24"
            color="currentColor"
            variant={isActive ? "Bold" : "Outline"}
          />
          <span className="text-[10px] font-bold mt-1">{item.label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex font-sans">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex-col z-40">
          {/* Sidebar Header / Logo */}
          <div className="p-6">
            <NavLink
              to="/"
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <div className="bg-emerald-50 p-2 rounded-full">
                  <Receipt2
                    size="24"
                    color="currentColor"
                    className="text-pri"
                    variant="Bold"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-pri block leading-tight">
                    SafeQly.
                  </span>
                  <span className="text-xs text-gray-400">
                    Secure. Simple. SafeQly.
                  </span>
                </div>
              </div>
              <ArrowDown2 size="16" className="text-gray-400" />
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 overflow-y-auto scrollbar-hide">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItemComponent key={item.label} item={item} />
              ))}

              {/* Logout Button in Sidebar */}
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1 text-red-600 hover:bg-red-50 mt-4"
              >
                <Logout size="20" color="currentColor" variant="Outline" />
                <p className="font-medium text-sm">Logout</p>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer (Support & Profile) */}
          <div className="p-4 space-y-4">
            {/* Support Card */}
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <Headphone
                      size="16"
                      color="currentColor"
                      className="text-emerald-900"
                      variant="Bold"
                    />
                  </div>
                  <span className="font-semibold text-sm text-gray-900">
                    Need support?
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Contact with one of our experts to get support.
                </p>
              </div>
            </div>

            {/* User Profile Mini */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">
                    Olaoluwa
                  </span>
                  <span className="text-xs text-gray-400">ola@xnria.com</span>
                </div>
              </div>
              <ArrowDown2 size="14" className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="bg-white h-16 lg:h-20 border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            {/* Left Side: Welcome & Profile */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-900">
                    Hi, Olaoluwa 👋
                  </h1>
                  <p className="text-[10px] text-gray-500">Welcome back</p>
                </div>
              </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Search - Desktop Only */}
              <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2.5 w-64 border border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
                <SearchNormal1 size="18" className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Notification - Visible on Mobile & Desktop */}
              <Link
                to="/notifications"
                className="p-2 rounded-full hover:bg-gray-50 relative text-gray-500 transition-colors"
              >
                <Notification
                  size="22"
                  color="currentColor"
                  variant="Outline"
                />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </Link>

              {/* Move Money - Desktop Only */}
              <button className="hidden lg:flex bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors items-center">
                New Escrow
                <ArrowDown2
                  size="16"
                  color="currentColor"
                  className="ml-2 rotate-[-90deg] text-white"
                />
              </button>
            </div>
          </header>

          {/* Main Scrollable Content */}
          <main className="flex-1 p-2 lg:p-8 overflow-y-auto mb-16 lg:mb-0">
            <div className="max-w-7xl mx-auto">{children || <Outlet />}</div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 lg:hidden z-40 pb-safe">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => (
              <MobileNavItemComponent key={item.label} item={item} />
            ))}
            
            {/* Added Logout for Mobile Nav as well for consistency, optional */}
            <button
              onClick={handleLogoutClick}
              className="flex flex-col items-center justify-center px-3 py-2 font-body hover:text-red-600 transition-colors text-gray-500"
            >
              <Logout size="24" color="currentColor" variant="Outline" />
              <span className="text-[10px] font-bold mt-1">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* RENDER MODAL HERE */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};

export default Layout;