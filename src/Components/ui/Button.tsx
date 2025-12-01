const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full bg-[#053014] text-white font-semibold py-4 rounded-lg hover:bg-green-900 transition-colors shadow-lg active:scale-[0.99] transform"
  >
    {children}
  </button>
);
export default PrimaryButton;