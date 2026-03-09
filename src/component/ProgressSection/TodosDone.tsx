import React from "react";
import useTodayTodos from "~/hook/useTodayTodos";
import useCompletedTodos from "~/hook/useCompletedTodos";
import { useTodos } from "~/context/TodoContext";
import { CheckIcon } from "@heroicons/react/16/solid";
import { motion, AnimatePresence } from "framer-motion";

const TodosDone: React.FC = () => {
  const todaysTodos = useTodayTodos();
  const { todos } = useTodos();
  const { todos: todayTodosDone } = useCompletedTodos({
    todos: todaysTodos,
    done: true,
  });
  const { todos: allTodosDone } = useCompletedTodos({
    todos: todos,
    done: true,
  });

  const percentageTodayTodos =
    (todayTodosDone.length * 100) / todaysTodos.length;

  const percentageAllTodos = (allTodosDone.length * 100) / todos.length;

  const todaysTodosToShow = todaysTodos.slice(0, 3);
  
  return (
    <>
      {todaysTodos.length !== 0 && (
        <div className="mt-8">
          <span className="flex justify-between mb-2 font-medium dark:text-slate-300">
            <span>Todos today</span> {todayTodosDone.length}/
            {todaysTodos.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageTodayTodos + "%" }}></div>
          </div>
        </div>
      )}
      {todos.length !== 0 && (
        <div className="mt-6">
          <span className="flex justify-between mb-2 font-medium dark:text-slate-300">
            <span>All todos </span> {allTodosDone.length}/{todos.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageAllTodos + "%" }}></div>
          </div>
        </div>
      )}

      {todaysTodos.length === 0 && (
        <span className="block mt-6 pt-4 border-t-2 border-t-slate-200 dark:border-t-slate-800 dark:text-slate-400">
          No todos today
        </span>
      )}

      {todaysTodos.length > 0 && (
        <div className="mt-8">
          <span className="block mb-2 font-medium dark:text-slate-300">Today&apos;s todos</span>
          <ul>
            <AnimatePresence mode="popLayout">
              {todaysTodosToShow.map((todo) => (
                <motion.li 
                  key={todo.id} 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }
                  }}
                  className="py-2 pl-6 dark:text-slate-100 list-item"
                >
                  <span className="flex items-center gap-2">
                    {todo.completed ? <CheckIcon className="w-5 h-5 text-violet-500" /> : null} {todo.title}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </>
  );
};

export default React.memo(TodosDone);
