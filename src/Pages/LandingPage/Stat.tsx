import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-slate-900 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          
          {/* Left: The Narrative */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trust by the numbers.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We process millions in transactions daily, ensuring that every cent reaches the right person, every time.
            </p>
          </div>

          {/* Right: The Data Grid with Dividers */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 gap-8 md:gap-0">
              
              {/* Stat 1 */}
              <div className="md:px-8 md:border-r border-slate-800">
                <div className="text-4xl font-extrabold text-blue-500 mb-1">$10M+</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">Secured Volume</div>
              </div>

              {/* Stat 2 */}
              <div className="md:px-8 md:border-r border-slate-800">
                <div className="text-4xl font-extrabold text-white mb-1">50k+</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">Transactions</div>
              </div>

              {/* Stat 3 (New row on mobile, same row on desktop if space allows, but grid-cols-2 wraps it) */}
              <div className="md:px-8 md:pt-0 pt-8 md:border-r border-slate-800 border-t md:border-t-0 border-slate-800 md:mt-0">
                <div className="text-4xl font-extrabold text-white mb-1">99.9%</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">Success Rate</div>
              </div>

              {/* Stat 4 */}
              <div className="md:px-8 md:pt-0 pt-8 border-t md:border-t-0 border-slate-800 md:mt-0">
                <div className="text-4xl font-extrabold text-white mb-1">24/7</div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wide">Human Support</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;