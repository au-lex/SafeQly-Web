import React from 'react';
import { ShieldCheck, Zap, Scale, Lock, Globe, Headset } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: "Bank-Grade Security",
    desc: "Your funds are held in a regulated vault. We use 256-bit encryption to protect every transaction."
  },
  {
    icon: <Scale className="h-6 w-6 text-blue-600" />,
    title: "Fair Dispute Resolution",
    desc: "Something went wrong? Our neutral dispute center acts as a fair judge to resolve conflicts quickly."
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "Instant Releases",
    desc: "No waiting days for payouts. Once the job is approved, funds are moved to your wallet instantly."
  },
  {
    icon: <Lock className="h-6 w-6 text-blue-600" />,
    title: "Milestone Payments",
    desc: "Break large projects into smaller steps. Release funds only as each phase is completed."
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: "Global Payments",
    desc: "Pay or get paid in multiple currencies. We handle the conversion so you don't have to."
  },
  {
    icon: <Headset className="h-6 w-6 text-blue-600" />,
    title: "24/7 Support",
    desc: "Real humans, not bots. Our support team is always on standby to help with your transactions."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Trust SafeEscrow?
          </h2>
          <p className="text-slate-600 text-lg">
            We bridge the gap of trust so you can focus on the work, not the risk.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm mb-4">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;