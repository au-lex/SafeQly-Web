import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative h-[70vh]  lg:min-h-screen w-full overflow-hidden flex pt-[4rem] lg:pt-[12rem] justify-center bg-white">
        
        {/* --- Main Content Container --- */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          
          {/* Headline - No Delay */}
          <h1 className="animate-fade-up text-4xl md:text-7xl font-bold text-pri leading-[1.1] mb-6">
            Fund & Fulfill With <br className="hidden md:block" />
            Total Confidence
          </h1>

          {/* Subhead - 0.2s Delay */}
          <p 
            className="animate-fade-up text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Stop worrying about scams. We hold the money securely until the product is delivered and verified. Simple, fair, and safe.
          </p>

          {/* CTA Button - 0.4s Delay */}
          <div 
            className="animate-fade-up flex justify-center mb-12"
            style={{ animationDelay: '0.4s' }}
          >
            <Link to="/dashboard"  className="group bg-pri hover:bg-[#093528] text-white text-lg font-medium pl-8 pr-2 py-2 rounded-full flex items-center transition-all duration-300 shadow-xl shadow-green-900/10">
              <span className='text-white'>Start A Transaction</span>
              <div className="ml-4 bg-white text-[#0f4c3a] p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          {/* --- MOBILE ONLY: Organized Icon Row --- */}
          {/* Added fade-up here too with longer delay so it appears after button */}
          <div 
            className="animate-fade-up grid grid-cols-4 gap-4 md:hidden max-w-xs mx-auto mt-8"
            style={{ animationDelay: '0.6s' }}
          >
            
            {/* Mobile Icon 1 */}
            <div className="flex flex-col items-center">
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
            <div className="flex flex-col items-center">
               <div className="bg-white border border-pri/30 w-14 h-14 flex justify-center items-center overflow-hidden rounded-full shadow-lg">
                  <img src="https://i.pinimg.com/736x/65/49/b1/6549b1659381e98dfa588e52bebbb937.jpg" className='w-full h-full object-cover' alt="Sync" />
               </div>
            </div>
            
          </div>


        </div>

        {/* --- DESKTOP ONLY: Floating Icons Elements --- */}
        {/* Note: I removed the default Tailwind 'animate-bounce' or 'pulse' and used our custom classes */}

        {/* Top Right: Bell - Slow Float */}
        <div className="absolute top-[15%] right-[10%] animate-float-slow hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/736x/f2/d5/34/f2d53404d89392ecc4d8ec685a12cdbb.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Left Center: Money - Medium Float */}
        <div className="absolute top-[40%] left-[5%] lg:left-[10%] animate-float-medium hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/1200x/39/ce/c9/39cec92e33d321d314551d4b396c4af0.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Bottom Left: Chart - Fast Float */}
        <div className="absolute bottom-[10%] left-[15%] animate-float-fast hidden md:block">
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

        {/* Bottom Right: Sync/Refresh - Slow Float (Offset) */}
        <div className="absolute bottom-[25%] right-[8%] animate-float-slow hidden md:block" style={{ animationDelay: '1s' }}>
          <div className="bg-white border border-pri w-16 h-16 flex justify-center items-center overflow-hidden rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <img src="https://i.pinimg.com/736x/65/49/b1/6549b1659381e98dfa588e52bebbb937.jpg" className='w-full h-full object-cover' alt="" />
          </div>
        </div>

      </div>

      <div className="md:hidden  w-full  border-gray-100  animate-fade-up" >
        
            <div className="flex justify-center gap-6 opacity-60 grayscale">
              {/* Replace these spans with actual SVGs of Visa/Mastercard/Stripe */}
              <span className="font-bold text-lg text-gray-400">VISA</span>
              <span className="font-bold text-lg text-gray-400">Mastercard</span>
              <span className="font-bold text-lg text-gray-400">Paystack</span>
            </div>
          </div>
    </>
  );
};

export default HeroSection;