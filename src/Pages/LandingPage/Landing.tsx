import React from 'react'
import HowItWorks from './HowItwork';

import Hero from './Hero';
import Navbar from './Navbar';
import Footer from './Footer';
import Features from './Features';
import FAQ from './Faq';
import FeeCalculator from './FeeCalculator';
import CustomerReviewsSection from './Review';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
  
        <HowItWorks />
        <FeeCalculator />

        <Features />

        <CustomerReviewsSection />
        <FAQ />
     
      </main>
      <Footer />
    </div>
  );
}

export default Landing