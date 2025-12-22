

const Footer: React.FC = () => {
  return (
    <footer className="bg-pri border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
             
              <span className="ml-2 text-xl font-bold text-white">SafeQly</span>
            </div>
            <p className="text-white max-w-xs">
              Building trust in the digital economy. Secure payments for everyone, everywhere.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white">Product</h4>
            <ul className="space-y-2 text-white">
              <li><a href="#" className="hover:text-blue-600">For Buyers</a></li>
              <li><a href="#" className="hover:text-blue-600">For Sellers</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Company</h4>
            <ul className="space-y-2 text-white">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">Legal</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 SafeQly Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;