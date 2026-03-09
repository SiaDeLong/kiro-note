import React from "react";
import type { Todo } from '~/Interface/Todo';
import BtnToggleCompleted from "./TodoAction/BtnToggleCompleted";
import { CalendarDaysIcon } from "@heroicons/react/16/solid";
import useDate from "~/hook/useDate";
import BtnDeleteTodo from "./TodoAction/BtnDeleteTodo";
import BtnMarkAsImportant from "./TodoAction/BtnMarkAsImportant";
import BtnEditTodo from "./TodoAction/BtnEditTodo";
import { motion } from "framer-motion";
import { useModal } from "~/context/ModalContext";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoItem: React.FC<{ isListInView1: boolean; todo: Todo; isDragDisabled: boolean; isOverlay?: boolean }> = ({
  isListInView1,
  todo,
  isDragDisabled,
  isOverlay = false,
}) => {
  const dateFormated = useDate(todo.date);
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const todayDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const { openTodoModal, setTitle, setTodo } = useModal();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id, disabled: isDragDisabled || isOverlay });

  const style = isOverlay ? {} : {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const openEditModal = () => {
    if (isOverlay) return;
    setTitle("Edit todo");
    setTodo(todo);
    openTodoModal();
  }

  return (
    <>
      <motion.li 
        key={todo.id}
        ref={isOverlay ? undefined : setNodeRef}
        style={style}
        layout
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }} 
        transition={{ 
          duration: 0.3,
          layout: {
            type: "spring",
            stiffness: 300,
            damping: 30
          }
        }}
        className="md:hover:scale-105"
        {...(isOverlay ? {} : attributes)}
      >
        <article
          onClick={openEditModal}
          className={`bg-slate-100 rounded-xl p-3 sm:p-4 flex text-left transition-all duration-200 hover:shadow-xl hover:shadow-slate-300/50 dark:bg-slate-800/50 dark:backdrop-blur-sm dark:hover:shadow-violet-900/20 dark:border dark:border-slate-700/50 relative ${
            isDragDisabled || isOverlay ? 'cursor-pointer' : ''
          } ${isOverlay ? 'shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/70' : ''} ${isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"
            } ${todo.date === todayDate ? "bg-gradient-to-br from-violet-600 to-purple-600 text-slate-100 dark:from-violet-700 dark:to-purple-700 shadow-lg shadow-violet-500/30" : ""
            }`}
        >
          {/* Drag handle */}
          {!isDragDisabled && !isOverlay && (
            <div 
              className={`top-2 right-2 absolute opacity-50 hover:opacity-100 p-2 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing ${
                todo.date === todayDate 
                  ? 'hover:bg-violet-700 dark:hover:bg-violet-800' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              {...listeners}
            >
              <svg 
                className={`w-5 h-5 ${
                  todo.date === todayDate 
                    ? 'text-white' 
                    : 'text-slate-500 dark:text-slate-400'
                }`} 
                fill="currentColor" 
                viewBox="0 0 16 16"
              >
                <circle cx="3" cy="3" r="1.8"/>
                <circle cx="3" cy="8" r="1.8"/>
                <circle cx="3" cy="13" r="1.8"/>
                <circle cx="8" cy="3" r="1.8"/>
                <circle cx="8" cy="8" r="1.8"/>
                <circle cx="8" cy="13" r="1.8"/>
                <circle cx="13" cy="3" r="1.8"/>
                <circle cx="13" cy="8" r="1.8"/>
                <circle cx="13" cy="13" r="1.8"/>
              </svg>
            </div>
          )}
          <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}${todo.date === todayDate ? "border-violet-500 dark:border-violet-700" : ""}`}>
            <div
              className={`flex items-center justify-between ${isListInView1 ? "mb-1" : "mb-2"
                }`}
            >
              <span className="block font-medium dark:text-slate-100">
                {todo.title}
              </span>
            </div>
            <p
              title={todo.description}
              className={`description mb-2  ${isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
                } ${todo.date === todayDate ? "text-violet-200" : "text-slate-500 dark:text-slate-400"
                }`}
            >
              {todo.description}
            </p>

            <time className="flex mt-auto w-full">
              <CalendarDaysIcon className="mr-2 w-4 sm:w-5" /> {dateFormated}
            </time>
          </div>
          <div
            className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
              } ${todo.date === todayDate ? "border-violet-500 dark:border-violet-700" : ""}`}
              onClick={(e) => e.stopPropagation()}
          >
            <BtnToggleCompleted
              todoCompleted={todo.completed}
              todoId={todo.id}
              isListInView1={isListInView1}
            />
            <BtnMarkAsImportant todoId={todo.id} todoImportant={todo.important} isToday={todo.date === todayDate} />
            <BtnDeleteTodo todoId={todo.id} />
            <BtnEditTodo todo={todo} />
          </div>
        </article>
      </motion.li>
    </>
  );
};

export default React.memo(TodoItem);
