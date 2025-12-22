import React from 'react';
import { ShieldCheck, Zap, Globe2, Wallet } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#053b2f]" />,
      title: "Bank-Grade Security",
      description: "Your assets are protected by industry-leading encryption and cold storage protocols. We prioritize your safety above all else.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#053b2f]" />,
      title: "Instant Transactions",
      description: "Experience lightning-fast transfers. Send and receive funds globally in seconds, not days, with our optimized network.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-[#053b2f]" />,
      title: "Global Access",
      description: "Manage your finances from anywhere in the world. Our platform supports 50+ currencies and operates in over 100 countries.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-[#053b2f]" />,
      title: "Low Transaction Fees",
      description: "Keep more of your money. We offer some of the most competitive rates in the market with zero hidden charges.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#bef264]" />
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Why Choose Banki
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#053b2f] mb-6">
            Smart Banking for the <br /> Modern Generation
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We simplify your financial life with robust tools, intuitive design, and transparent pricing. See why thousands trust us daily.
          </p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#f2f8f3] group-hover:bg-[#bef264] flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-[#053b2f] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
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