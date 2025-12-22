import React from 'react';
import { UserCheck, Wallet, PackageCheck, Handshake } from 'lucide-react';

const steps = [
  {
    icon: <UserCheck className="h-6 w-6 text-white" />,
    step: "01",
    title: "Agree Terms",
    desc: "Buyer and Seller agree on price and scope using the contract builder."
  },
  {
    icon: <Wallet className="h-6 w-6 text-white" />,
    step: "02",
    title: "Buyer Deposits",
    desc: "Buyer secures funds in the Vault. Seller is notified to start working."
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-white" />,
    step: "03",
    title: "Work & Deliver",
    desc: "Seller completes the work or ships the item for Buyer's review."
  },
  {
    icon: <Handshake className="h-6 w-6 text-white" />,
    step: "04",
    title: "Money Released",
    desc: "Once approved, the secure funds are instantly released to the Seller."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How SafeEscrow Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A secure path from agreement to payment.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          
          {/* The Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-pri -translate-x-1/2"></div>

          <div className="space-y-12">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex  items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty Spacer for Desktop Alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Center Icon Bubble */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-pri border-4 border-white shadow-lg z-10">
                    {item.icon}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2  pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <span className="text-sm font-bold text-pri tracking-wider uppercase mb-1 block">
                      Step {item.step}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
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