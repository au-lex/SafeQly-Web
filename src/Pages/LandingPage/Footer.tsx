import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pri text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Logo & Links --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Logo */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              {/* Custom SVG Logo (White Text variant) */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="20" width="6" height="12" rx="1" fill="#bef264" />
                <rect x="12" y="14" width="6" height="18" rx="1" fill="#a3e635" />
                <rect x="20" y="8" width="6" height="24" rx="1" fill="#84cc16" />
                {/* Arrow is white in footer for contrast */}
                <path 
                  d="M2 28 C 5 28, 15 28, 28 15 M 28 15 L 22 15 M 28 15 L 28 21" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
               SafeQly
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Other Pages */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Other pages</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">404</a></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Social</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#bef264] transition-colors">X</a></li>
            </ul>
          </div>
        </div>

        {/* --- Middle Section: Newsletter --- */}
        <div className="border-t border-white/10 pt-12 pb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Text */}
            <div className="max-w-md">
              <h3 className="text-3xl font-bold mb-2 text-white">Join our newsletter</h3>
              <p className="text-gray-400">Keep up to date with everything Banki</p>
            </div>

            {/* Form */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bef264] focus:ring-1 focus:ring-[#bef264] transition-all"
              />
              <button className="px-6 py-3 bg-[#bef264] text-[#053b2f] font-bold rounded-lg hover:bg-[#a3e635] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

          </div>
        </div>

   

      </div>
    </footer>
  );
};

export default Footer;