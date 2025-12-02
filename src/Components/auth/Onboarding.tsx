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






























// import React from 'react';

// // 1. Updated Coordinates: Put ID 2 in the middle (50, 50) and scattered others around
// const AVATARS = [
//   { id: 1, src: 'https://i.pravatar.cc/150?img=32', x: 15, y: 25, delay: '0s' },   // Top Left
//   { id: 2, src: 'https://i.pravatar.cc/150?img=12', x: 50, y: 50, delay: '1s' },   // THE HUB (Center)
//   { id: 3, src: 'https://i.pravatar.cc/150?img=59', x: 85, y: 35, delay: '2s' },   // Right
//   { id: 4, src: 'https://i.pravatar.cc/150?img=33', x: 65, y: 15, delay: '1.5s' }, // Top Right
//   { id: 5, src: 'https://i.pravatar.cc/150?img=5',  x: 20, y: 80, delay: '0.5s' }, // Bottom Left
// ];

// // 2. Updated Connections: Everyone connects to ID 2 (The Hub)
// const CONNECTIONS = [
//   { from: 2, to: 1 }, // Center -> Top Left
//   { from: 2, to: 3 }, // Center -> Right
//   { from: 2, to: 4 }, // Center -> Top Right
//   { from: 2, to: 5 }, // Center -> Bottom Left
// ];

// const OnboardingSide = ({ title, subtitle }: { title: React.ReactNode; subtitle: string }) => {
//   return (
//     <div className="relative w-full h-80 md:h-full min-h-[400px] overflow-hidden bg-[#053014]">
//       {/* Brand Logo Area */}
//       <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
//         <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
//           <div className="w-6 h-6 bg-green-400 rounded-full" />
//         </div>
//         <span className="text-2xl font-bold text-white tracking-tight">SafeQly</span>
//       </div>

//       <div className="absolute top-20 left-8 grid grid-cols-5 gap-2 opacity-10 pointer-events-none">
//         {[...Array(25)].map((_, i) => (
//           <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400" />
//         ))}
//       </div>

//       <div className="relative z-10 p-8 md:p-16 h-full flex flex-col justify-center md:justify-start pt-32 md:pt-40">
//         <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
//           {title}
//         </h1>
//         <p className="text-green-100/80 text-lg max-w-md leading-relaxed">
//           {subtitle}
//         </p>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none">
        
//         {/* SVG Layer */}
//         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//           <defs>
//             <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
//               <polygon points="0 0, 6 2, 0 4" fill="#4ade80" fillOpacity="0.6" />
//             </marker>
//           </defs>

//           {CONNECTIONS.map((conn, i) => {
//             const start = AVATARS.find(a => a.id === conn.from);
//             const end = AVATARS.find(a => a.id === conn.to);
//             if (!start || !end) return null;

//             return (
//               <path
//                 key={i}
//                 // Using straight lines usually looks cleaner for a "Hub" shape, 
//                 // but we can keep a slight curve (Q) to make it look organic.
//                 d={`M ${start.x} ${start.y} Q ${(start.x + end.x)/2} ${(start.y + end.y)/2} ${end.x} ${end.y}`}
//                 fill="none"
//                 stroke="#4ade80"
//                 strokeWidth="0.4"
//                 strokeDasharray="4 4"
//                 className="opacity-40 animate-pulse"
//                 markerEnd="url(#arrowhead)"
//               />
//             );
//           })}
//         </svg>

//         {/* Avatars Layer */}
//         {AVATARS.map((avatar) => (
//           <div
//             key={avatar.id}
//             className="absolute transform hover:scale-110 transition-transform duration-300 ease-in-out z-10"
//             style={{
//               top: `${avatar.y}%`,
//               left: `${avatar.x}%`,
//               transform: 'translate(-50%, -50%)', 
//               animation: `float 6s ease-in-out infinite ${avatar.delay}`
//             }}
//           >
//             {/* Make the central avatar slightly larger to emphasize importance */}
//             <div className={`${avatar.id === 2 ? 'w-16 h-16 md:w-20 md:h-20 border-green-300' : 'w-12 h-12 md:w-14 md:h-14 border-green-500/30'} rounded-full p-1 bg-[#053014] backdrop-blur-sm border`}>
//               <img
//                 src={avatar.src}
//                 alt="User Avatar"
//                 className="w-full h-full rounded-full object-cover border-2 border-green-400 shadow-lg"
//               />
//             </div>
            
//             <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] p-1 rounded-full border-2 border-[#053014]">
//                ✓
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-600 rounded-full opacity-20 blur-3xl"></div>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
//           50% { transform: translate(-50%, -50%) translateY(-10px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OnboardingSide;