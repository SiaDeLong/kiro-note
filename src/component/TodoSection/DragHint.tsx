import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodos } from "~/context/TodoContext";
import { XMarkIcon } from "@heroicons/react/16/solid";

const DragHint: React.FC = () => {
  const { sortByDate } = useTodos();
  const [showHint, setShowHint] = useState(false);
  const [hasSeenHint, setHasSeenHint] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const seen = sessionStorage.getItem("dragHintSeen");
    if (seen) {
      setHasSeenHint(true);
    }
  }, []);

  useEffect(() => {
    // Show hint when switching to default mode for the first time
    if (!sortByDate && !hasSeenHint) {
      const showTimer = setTimeout(() => {
        setShowHint(true);
      }, 500);
      
      // Auto-dismiss after 1.5 seconds
      const dismissTimer = setTimeout(() => {
        dismissHint();
      }, 5000); // 500ms delay + 1500ms display = 2000ms total
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(dismissTimer);
      };
    } else {
      setShowHint(false);
    }
  }, [sortByDate, hasSeenHint]);

  const dismissHint = () => {
    setShowHint(false);
    setHasSeenHint(true);
    localStorage.setItem("dragHintSeen", "true");
  };

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="top-20 left-1/2 z-30 fixed max-w-md -translate-x-1/2"
        >
          <div className="flex items-center gap-3 bg-violet-600 dark:bg-violet-700 shadow-2xl px-4 py-3 rounded-xl text-white">
            <div className="flex-1">
              <p className="font-medium text-sm">
                💡 You can now drag and drop todos to reorder them!
              </p>
            </div>
            <button
              onClick={dismissHint}
              className="hover:bg-violet-700 dark:hover:bg-violet-800 p-1 rounded transition-colors"
              aria-label="Dismiss hint"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DragHint;
