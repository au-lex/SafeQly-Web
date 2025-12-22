import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2' 
          : 'bg-white border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-pri p-1.5 rounded-lg mr-2">
          
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              SafeQly
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['How it Works', 'Features', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div> {/* Vertical Divider */}

            <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Log In
            </button>
            <button className="bg-pri text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 active:transform active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg transform transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <a 
            href="#how-it-works" 
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            How it Works
          </a>
          <a 
            href="#features" 
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <div className="h-px bg-slate-100 my-2"></div>
          <button className="w-full text-left px-4 py-3 text-slate-700 font-semibold hover:text-blue-600">
            Log In
          </button>
          <button className="w-full bg-pri text-white px-4 py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;