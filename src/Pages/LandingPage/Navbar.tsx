import React, { useState, useEffect } from 'react';
import { Link, NavLink,  } from 'react-router-dom';
import { Menu, X, ArrowRight, Home } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { name: 'Home', path: '/', isHome: true }, 
    { name: 'How It Works', path: '/blog' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    
    { name: 'Faq', path: '/pages' }, 
    { name: 'Contact', path: '/about' },
  ];


  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* --- Logo Section (Linked to Home) --- */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                 <Logo />
               </Link>
            </div>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
               
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 bg-[#f2f4f3] text-[#053b2f] px-4 py-2 rounded-full font-medium transition-colors" // Active styles
                      : "group flex items-center gap-1 text-gray-600 hover:text-[#053b2f] hover:bg-gray-50 font-medium px-4 py-2 rounded-full transition-all" // Inactive styles
                  }
                >
            
                  {({ isActive }) => (
                    <>
                      {isActive && link.isHome && (
                        <div className="w-6 h-6 bg-[#84cc16] rounded-full flex items-center justify-center text-white">
                          <Home className="w-3 h-3 fill-current" />
                        </div>
                      )}
                      <span>{link.name}</span>
              
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* --- CTA Button (Desktop Link) --- */}
            <div className="hidden md:flex items-center">
               <Link 
                  to="/login"
                  className="group bg-[#0f4c3a] hover:bg-[#093528] text-white text-sm font-medium pl-6 pr-1 py-1.5 rounded-full flex items-center transition-all duration-300"
               >
                  <span className="mr-3 text-white">Log In</span>
                  <div className="bg-white text-[#0f4c3a] p-1.5 rounded-full group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
               </Link>
            </div>

            {/* --- Mobile Menu Button --- */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-[#053b2f] focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY & DRAWER ================= */}
      
      {/* 1. Backdrop Overlay */}
      <div 
          className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
      />

      {/* 2. Sliding Drawer Menu */}
      <div 
        className={`md:hidden fixed top-0 left-0 h-screen w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header inside drawer */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
           <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo />
           </Link>
    
        </div>

        {/* Menu Links Container */}
        <div className="px-4 py-6 space-y-2 flex flex-col h-[calc(100vh-64px)] overflow-y-auto bg-white pb-20">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)} 
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? "bg-[#f2f4f3] text-[#053b2f]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#053b2f]"
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    {/* Only show Home icon if active AND it's the home link */}
                     {isActive && link.isHome && <Home className="w-5 h-5 text-[#84cc16]" />}
                     {link.name}
                  </span>
                
                </div>
              )}
            </NavLink>
          ))}
          
          {/* Mobile CTA Links */}
          <div className="pt-6 mt-auto mb-8">
             <Link 
               to="/login" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="w-full block text-center mb-3 border-2 border-[#0f4c3a] text-[#0f4c3a] font-medium py-3 rounded-full transition-colors hover:bg-[#f2f4f3]"
             >
              Log In
            </Link>

         
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;