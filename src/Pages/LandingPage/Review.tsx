import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviewsSection: React.FC = () => {
  // Helper function to render a row of stars
  const renderStars = (count: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(count)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      {/* --- Header Section --- */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Star className="w-3 h-3 fill-current" />
          <span>Testimonials</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#053b2f] mt-3">
          Trusted by Traders
        </h2>
      </div>

      {/* --- Social Proof Section --- */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        {/* Avatars */}
        <div className="flex -space-x-3">
          {[
            'https://i.pravatar.cc/100?img=1',
            'https://i.pravatar.cc/100?img=2',
            'https://i.pravatar.cc/100?img=3',
            'https://i.pravatar.cc/100?img=4',
          ].map((src, i) => (
            <img
              key={i}
              className="w-10 h-10 rounded-full border-2 border-white"
              src={src}
              alt={`User avatar ${i + 1}`}
            />
          ))}
        </div>
        {/* Rating & Count */}
        <div className="flex items-center gap-2">
          {renderStars(5)}
          <span className="text-gray-600 font-medium">10,000+ Secured Trades</span>
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-16 max-w-6xl mx-auto">
        
        {/* --- Left Card: Stats --- */}
        <div className="lg:col-span-2 bg-[#bef264] p-8 md:p-12 rounded-[2rem] flex flex-col justify-between">
          <div>
            <h3 className="text-6xl md:text-7xl font-bold text-[#053b2f]">99.9%</h3>
            <p className="text-xl md:text-2xl font-medium text-[#053b2f] mt-4 leading-snug">
              Dispute resolution success rate. We ensure fairness for both sides.
            </p>
          </div>
          <p className="text-sm font-medium text-[#053b2f] mt-12">
            Safety Metrics
          </p>
        </div>

        {/* --- Right Card: Testimonial --- */}
        <div className="lg:col-span-3 bg-[#f3f4f6] p-8 md:p-12 rounded-[2rem]">
          {renderStars(5)}
          <h3 className="text-2xl md:text-3xl font-bold text-[#053b2f] mt-4 leading-tight">
            SafeQly eliminated my fear of online scams completely.
          </h3>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            As a freelance designer, I used to chase clients for payments. With SafeQly, the client deposits the funds before I start working. I see the money is there, do the work, and get paid instantly upon approval. It's a game changer.
          </p>

          {/* User Profile & Date */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src="https://i.pravatar.cc/100?img=5"
                alt="Esther Howard"
              />
              <div>
                <h4 className="font-bold text-[#053b2f] text-lg">Esther Howard</h4>
                <p className="text-gray-500">Freelance Designer</p>
              </div>
            </div>
            <span className="text-gray-500 text-sm">12 Dec, 2024</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewsSection;