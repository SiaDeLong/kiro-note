import { StarIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useTodos } from "~/context/TodoContext";

const BtnMarkAsImportant: React.FC<{
  todoId: string;
  todoImportant: boolean;
  isToday?: boolean;
}> = ({ todoId, todoImportant, isToday = false }) => {
  const { toggleImportant } = useTodos();

  return (
    <button
      title={todoImportant ? "unmark as important" : "mark as important"}
      onClick={() => toggleImportant(todoId)}
      className="ml-auto hover:text-slate-700 dark:hover:text-slate-200 transition"
    >
      <StarIcon 
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          todoImportant 
            ? "fill-rose-500 stroke-rose-500" 
            : isToday 
              ? "fill-none stroke-white stroke-2" 
              : "fill-none stroke-slate-700 dark:stroke-white stroke-2"
        }`}
      />
    </button>
  );
};

export default React.memo(BtnMarkAsImportant);
