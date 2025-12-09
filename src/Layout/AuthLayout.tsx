import OnboardingSide from "../Components/auth/Onboarding";

const AuthLayout = ({ 
  children, 
  marketingProps 
}: { 
  children: React.ReactNode;
  marketingProps: { title: React.ReactNode; subtitle: string };
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <div className="w-full md:w-5/12 lg:w-1/2 hidden md:block relative overflow-hidden order-1 md:order-1">
        <OnboardingSide {...marketingProps} />
      </div>

      <div className="w-full md:w-7/12 lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 order-2 md:order-2">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;