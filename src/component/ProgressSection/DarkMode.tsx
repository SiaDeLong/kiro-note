

import React from "react";
import { useTheme } from "~/context/ThemeContext";

const DarkMode: React.FC = () => {

  const { toggleTheme } = useTheme();
  
  return (
    <button
      className="group flex justify-between items-center mt-8 text-left"
      onClick={toggleTheme}
    >
      <span className="font-medium dark:text-slate-100">Dark Theme</span>
      <div className="relative flex dark:justify-end items-center bg-slate-200 dark:bg-slate-800/50 group-hover:shadow-md px-0.5 rounded-full w-10 h-5 transition-all duration-300">
        <div className="absolute bg-gradient-to-r from-violet-600 to-purple-600 shadow-md rounded-full w-4 h-4 transition-all duration-300"></div>
      </div>
    </button>
  );
};

export default React.memo(DarkMode);
