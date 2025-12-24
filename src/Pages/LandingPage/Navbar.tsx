import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Keep for external pages like Login
import { Link as ScrollLink } from 'react-scroll'; // Use for scrolling to sections
import { Menu, X, ArrowRight, Home } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { name: 'Home', to: 'home', isHome: true }, 
    { name: 'How It Works', to: 'how-it-works' },
    { name: 'Features', to: 'features' },
    { name: 'Pricing', to: 'pricing' },
    { name: 'Faq', to: 'faq' }, 
    { name: 'Contact', to: 'contact' },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Common styles to reduce duplication
  const baseLinkStyles = "cursor-pointer group flex items-center gap-1 font-medium px-4 py-2 rounded-full transition-all duration-300";
  const inactiveStyles = "text-gray-600 hover:text-[#053b2f] hover:bg-gray-50";
  const activeStyles = "!bg-[#f2f4f3] !text-[#053b2f]"; 

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* --- Logo Section (Scrolls to top/home) --- */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
               {/* Using ScrollLink for Logo to smooth scroll to top */}
               <ScrollLink 
                 to="home" 
                 smooth={true} 
                 duration={500} 
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <Logo />
               </ScrollLink>
            </div>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  spy={true}           // Watches for scroll position to set active state
                  smooth={true}        // Enables smooth scrolling
                  offset={-70}         // Offsets scroll to account for sticky header height
                  duration={500}       // Speed of scroll
                  activeClass={activeStyles} // Class applied when section is in view
                  className={`${baseLinkStyles} ${inactiveStyles}`}
                >
                  {/* Note: React-Scroll doesn't pass 'isActive' as a render prop like NavLink does. 
                      Instead, we control the icon visibility with CSS/Group logic or just show it always.
                      For simplicity here, I'm keeping the text simple. */}
                   {link.isHome && (
                        <div className="hidden group-[.active]:flex w-6 h-6 bg-[#84cc16] rounded-full items-center justify-center text-white mr-1">
                          <Home className="w-3 h-3 fill-current" />
                        </div>
                   )}
                  <span>{link.name}</span>
                </ScrollLink>
              ))}
            </div>

            {/* --- CTA Button (Keep as Router Link for separate Login page) --- */}
            <div className="hidden md:flex items-center">
               <RouterLink 
                  to="/login"
                  className="group bg-[#0f4c3a] hover:bg-[#093528] text-white text-sm font-medium pl-6 pr-1 py-1.5 rounded-full flex items-center transition-all duration-300"
               >
                  <span className="mr-3 text-white">Log In</span>
                  <div className="bg-white text-[#0f4c3a] p-1.5 rounded-full group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
               </RouterLink>
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
      
      <div 
          className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
      />

      <div 
        className={`md:hidden fixed top-0 left-0 h-screen w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
           <ScrollLink to="home" smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              <Logo />
           </ScrollLink>
        </div>

        <div className="px-4 py-6 space-y-2 flex flex-col h-[calc(100vh-64px)] overflow-y-auto bg-white pb-20">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="bg-[#f2f4f3] text-[#053b2f]" // Active class for mobile
              onSetActive={() => {}} // Optional callback
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block cursor-pointer px-3 py-2.5 rounded-lg text-base font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-[#053b2f]"
            >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                     {/* For mobile, we can use the 'active' class logic via CSS if we want the icon to appear only when active, 
                         but simplified here to just text for cleaner mobile view */}
                     {link.name}
                  </span>
                </div>
            </ScrollLink>
          ))}
          
          <div className="pt-6 mt-auto mb-8">
             <RouterLink 
               to="/login" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="w-full block text-center mb-3 border-2 border-[#0f4c3a] text-[#0f4c3a] font-medium py-3 rounded-full transition-colors hover:bg-[#f2f4f3]"
             >
              Log In
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;