import React from 'react';
import { ShieldTick, ArrowRight, SmsTracking, Copyright } from 'iconsax-react';

const Footer: React.FC = () => {
  return (
    <footer id='contact'  className="bg-[#053b2f] text-white pt-20 pb-10 border-t-4 border-[#bef264]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Main Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-20">
          
          {/* Column 1: Identity & Status */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <ShieldTick size={32 } color='currentColor'  variant="Bold" className="text-[#bef264]" />
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
               SafeQly
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8 border-l-2 border-[#bef264]/30 pl-4">
              Secure escrow payments for the digital age. We act as the impartial node ensuring trust between buyer and seller.
            </p>
            
            {/* System Status Badge */}
           
          </div>

          {/* Column 2: Navigation Module */}
          <div>
            <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 bg-[#bef264]" />
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
               Quick Links
                </h4>
            </div>
            
            <ul className="space-y-4">
              {['Home', 'How It Works', 'Features'].map((item) => (
                  <li key={item}>
                      <a href="#" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                          <ArrowRight size={14} color='currentColor' variant="Outline"  className="text-[#bef264] -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          <span className="font-medium text-white">{item}</span>
                      </a>
                  </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter (Moved here) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
                <SmsTracking size={20} className="text-[#bef264]" />
                <h3 className="text-lg font-bold text-white">System Updates</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to the protocol feed. Keep up to date with SafeQly patches and news.
            </p>

            {/* Tech Input Form */}
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="usr@email.com" 
                  className="w-full px-4 py-3 bg-black/20 border-b-2 border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-[#bef264] transition-colors"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#bef264] text-[#053b2f] font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight size={16} color='currentColor'  variant="Outline"/>
              </button>
            </div>
          </div>

        </div>

        {/* --- Bottom: Metadata --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           
           <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
              <Copyright size={14} />
              <span className='text-white'>{new Date().getFullYear()} SafeQly Inc.</span>
              <span className="text-gray-100">|</span>
              <span className='text-white'>All rights reserved.</span>
           </div>

 
        </div>

      </div>
    </footer>
  );
};

export default Footer;