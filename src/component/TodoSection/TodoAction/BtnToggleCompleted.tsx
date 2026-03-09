import React from "react";
import { useTodos } from "~/context/TodoContext";
import { motion } from 'framer-motion';

const BtnToggleCompleted: React.FC<{
  todoCompleted: boolean;
  todoId: string;
  isListInView1: boolean;
}> = ({ todoCompleted, todoId, isListInView1 }) => {

  const { toggleTodo } = useTodos();

  return (
    <motion.button
      title={todoCompleted ? "mark as in progress" : "mark as completed"}
      className={`${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}
      onClick={() => toggleTodo(todoId)}
      initial={{ backgroundColor: '#fde68a', color: '#92400e' }}
      animate={{
        backgroundColor: todoCompleted ? '#a7f3d0' : '#fde68a',
        color: todoCompleted ? ' #065f46' : '#92400e'
      }}
      transition={{ duration: 0.75 }}
    >
      <span className="invisible sm:visible block sm:static absolute px-3 py-1">
        {todoCompleted ? "completed" : "in progress"}
      </span>
    </motion.button>
  );
};

export default React.memo(BtnToggleCompleted);
