import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className="flex justify-center items-center bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 dark:shadow-violet-900/50 rounded-xl w-10 h-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized K with note lines */}
            <path
              d="M7 4V20M7 12L15 4M7 12L15 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 8H20M18 12H20M18 16H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* Accent dot */}
        <div className="-top-1 -right-1 absolute bg-purple-400 border-2 border-slate-200 dark:border-slate-900 rounded-full w-3 h-3"></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-tight">
          Kiro Note
        </span>
        <span className="font-medium text-slate-500 dark:text-slate-400 text-xs tracking-wide">
          記録ノート
        </span>
      </div>
    </div>
  );
};

export default Logo;
