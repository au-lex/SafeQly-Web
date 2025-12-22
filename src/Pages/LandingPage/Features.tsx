import React from 'react';
import { ShieldCheck, Zap, Globe2, Wallet } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#053b2f]" />,
      title: "Fraud-Proof Transactions",
      description: "We act as the trusted middleman. Funds are only released when the buyer is satisfied and the seller has delivered. Scams are impossible here.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-[#053b2f]" />, // Swapped order for better flow
      title: "Secure Vault Holding",
      description: "Your money sits in a protected, insured escrow vault during the transaction. It's not in the seller's pocket until you say 'Go'.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-[#053b2f]" />,
      title: "Trade Without Borders",
      description: "Hire a freelancer abroad or buy goods from another continent. SafeQly builds the bridge of trust between strangers, globally.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#053b2f]" />,
      title: "Instant Releases",
      description: "Once terms are met and approved, funds move instantly. We don't hold your money hostage with unnecessary banking delays.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white border border-gray-200 ">
            <span className="w-2 h-2 rounded-full bg-[#bef264]" />
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Why Choose SafeQly
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl  font-bold text-[#053b2f] mb-6">
            Commerce Built on <br className="hidden " /> Total Trust
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Stop worrying about "what if." SafeQly protects both buyers and sellers with automated milestones and dispute protection.
          </p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center j"
            >
              {/* Icon Container */}
              <section className="flex items-center w-full">

              <div className="w-16 h-16 rounded-full bg-[#f2f8f3] group-hover:bg-[#bef264] flex-shrink-0 flex items-center justify-center mr-4 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-pri break-words">
                {feature.title}
              </h3>
              
              </section>
              {/* Content */}
     
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow mt-4">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;