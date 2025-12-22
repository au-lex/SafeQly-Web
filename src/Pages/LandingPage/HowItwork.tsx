import React from 'react';
import { UserCheck, Wallet, PackageCheck, Handshake } from 'lucide-react';

const steps = [
  {
    icon: <UserCheck className="h-6 w-6 text-[#fff]" />, // Lime icon
    step: "01",
    title: "Agree Terms",
    desc: "Buyer and Seller agree on price and scope using the contract builder."
  },
  {
    icon: <Wallet className="h-6 w-6 text-[#fff]" />,
    step: "02",
    title: "Buyer Deposits",
    desc: "Buyer secures funds in the Vault. Seller is notified to start working."
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-[#fff]" />,
    step: "03",
    title: "Work & Deliver",
    desc: "Seller completes the work or ships the item for Buyer's review."
  },
  {
    icon: <Handshake className="h-6 w-6 text-[#fff]" />,
    step: "04",
    title: "Money Released",
    desc: "Once approved, the secure funds are instantly released to the Seller."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#fff]" />
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-serif font-bold text-[#053b2f] mb-4">
            How SafeQly Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A secure path from agreement to payment in four simple steps.
          </p>
        </div>

        {/* --- Vertical Timeline Container --- */}
        <div className="relative">
          
          {/* The Central Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#053b2f]/10 -translate-x-1/2 md:translate-x-0"></div>

          <div className="space-y-12 md:space-y-20">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty Spacer for Desktop Alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Center Icon Bubble */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#053b2f] border-4 border-[#f2f8f3] shadow-xl z-10">
                    {item.icon}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                    
                    {/* Step Number Tag */}
                    <span className={`inline-block mb-2 text-xs font-bold tracking-widest uppercase py-1 px-3 rounded-full border text-[#166534] ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      Step {item.step}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-[#053b2f] mb-3">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed text-base">
                      {item.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;