import React from 'react'; 




const AVATARS = [
  { id: 1, src: 'https://i.pravatar.cc/150?img=32', top: '20%', left: '10%', delay: '0s' },
  { id: 2, src: 'https://i.pravatar.cc/150?img=12', top: '55%', left: '35%', delay: '1s' },
  { id: 3, src: 'https://i.pravatar.cc/150?img=59', top: '45%', left: '70%', delay: '2s' },
  { id: 4, src: 'https://i.pravatar.cc/150?img=33', top: '10%', left: '55%', delay: '1.5s' },
  { id: 5, src: 'https://i.pravatar.cc/150?img=5', bottom: '-5%', left: '15%', delay: '0.5s' },
];

const OnboardingSide = ({ title, subtitle }: { title: React.ReactNode; subtitle: string }) => {
  return (
    <div className="relative w-full h-80 md:h-full min-h-[400px] overflow-hidden bg-[#053014]">
      <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
          {/* <ShieldChec className="text-green-400 w-6 h-6" /> */}
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">SafeQly</span>
      </div>

      <div className="absolute top-20 left-8 grid grid-cols-5 gap-2 opacity-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400" />
        ))}
      </div>

      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col justify-center md:justify-start pt-32 md:pt-40">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-green-100/80 text-lg max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path
            d="M -50,150 Q 100,50 250,200 T 500,250"
            fill="none"
            stroke="#166534"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="opacity-60"
          />
        </svg>

        {AVATARS.map((avatar) => (
          <div
            key={avatar.id}
            className="absolute transform hover:scale-110 transition-transform duration-300 ease-in-out"
            style={{
              top: avatar.top,
              left: avatar.left,
              bottom: avatar.bottom,
              animation: `float 6s ease-in-out infinite ${avatar.delay}`
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full p-1 bg-green-800/40 backdrop-blur-sm border border-green-500/30">
              <img
                src={avatar.src}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-green-400 shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-600 rounded-full opacity-20 blur-3xl"></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};


export default OnboardingSide