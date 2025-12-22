import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative h-[80vh] lg:min-h-screen w-full overflow-hidden flex pt-[4rem]  lg:pt-[12rem] justify-center bg-white">
        
        {/* --- Main Content Container --- */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          
          {/* Headline */}
          <h1 className="text-4xl md:text-7xl font-bold text-pri leading-[1.1] mb-6">
          Fund & Fulfill With <br className="hidden md:block" />
            Total Confidence
          </h1>

          {/* Subhead */}
          <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Stop worrying about scams. We hold the money securely until the product is delivered and verified. Simple, fair, and safe.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <button className="group bg-pri hover:bg-[#093528] text-white text-lg font-medium pl-8 pr-2 py-2 rounded-full flex items-center transition-all duration-300 shadow-xl shadow-green-900/10">
              <span className='text-white'>Start A Transaction</span>
              <div className="ml-4 bg-white text-[#0f4c3a] p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* --- MOBILE ONLY: Organized Icon Row --- */}
      
          <div className="grid grid-cols-4 gap-4 md:hidden max-w-xs mx-auto mt-8">
            
            {/* Mobile Icon 1 */}
            <div className="flex flex-col items-center animate-pulse">
               <div className="bg-white border border-pri/30 w-14 h-14 flex justify-center items-center overflow-hidden rounded-full shadow-lg">
                  <img src="https://i.pinimg.com/736x/f2/d5/34/f2d53404d89392ecc4d8ec685a12cdbb.jpg" className='w-full h-full object-cover' alt="Notification" />
               </div>
            </div>

            {/* Mobile Icon 2 */}
            <div className="flex flex-col items-center">
               <div className="bg-white border border-pri/30 w-14 h-14 flex justify-center items-center overflow-hidden rounded-full shadow-lg">
                  <img src="https://i.pinimg.com/1200x/39/ce/c9/39cec92e33d321d314551d4b396c4af0.jpg" className='w-full h-full object-cover' alt="Money" />
               </div>
            </div>

            {/* Mobile Icon 3 */}
            <div className="flex flex-col items-center">
               <div className="bg-white border border-pri/30 w-14 h-14 flex justify-center items-center overflow-hidden rounded-full shadow-lg">
                  <img src="https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg" className='w-full h-full object-cover' alt="Chart" />
               </div>
            </div>

            {/* Mobile Icon 4 */}
            <div className="flex flex-col items-center animate-pulse">
               <div className="bg-white border border-pri/30 w-14 h-14 flex justify-center items-center overflow-hidden rounded-full shadow-lg">
                  <img src="https://i.pinimg.com/736x/65/49/b1/6549b1659381e98dfa588e52bebbb937.jpg" className='w-full h-full object-cover' alt="Sync" />
               </div>
            </div>
            
          </div>
          {/* Optional Label for Mobile Icons */}
          <p className="md:hidden text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">Trusted Security</p>

        </div>

        {/* --- DESKTOP ONLY: Floating Icons Elements --- */}


        {/* Top Right: Bell */}
        <div className="absolute top-[15%] right-[10%] animate-float-slow hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/736x/f2/d5/34/f2d53404d89392ecc4d8ec685a12cdbb.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Left Center: Money */}
        <div className="absolute top-[40%] left-[5%] lg:left-[10%] animate-float-medium hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/1200x/39/ce/c9/39cec92e33d321d314551d4b396c4af0.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Bottom Left: Chart */}
        <div className="absolute bottom-[10%] left-[15%] animate-float-fast hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Bottom Right: Sync/Refresh */}
        <div className="absolute bottom-[25%] right-[8%] animate-float-slow hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/736x/65/49/b1/6549b1659381e98dfa588e52bebbb937.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

      </div>
    </>
  );
};

export default HeroSection;