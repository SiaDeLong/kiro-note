import React from "react";
import { useTodos } from "~/context/TodoContext";
import { CalendarIcon, Bars3Icon } from "@heroicons/react/16/solid";

const SortToggle: React.FC = () => {
  const { sortByDate, toggleSortByDate } = useTodos();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSortByDate}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          sortByDate 
            ? "bg-violet-600 text-white dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-800" 
            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
        }`}
        title={sortByDate ? "Sorted by date" : "Default order - Drag to reorder"}
      >
        {sortByDate ? (
          <>
            <CalendarIcon className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">By Date</span>
          </>
        ) : (
          <>
            <Bars3Icon className="w-5 h-5" />
            <span className="hidden sm:inline font-medium text-sm">Default</span>
          </>
        )}
      </button>
      {!sortByDate && (
        <span className="hidden md:inline text-slate-500 dark:text-slate-400 text-xs animate-pulse">
          Drag to reorder
        </span>
      )}
    </div>
  );
};

export default SortToggle;
