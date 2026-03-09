import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useModal } from "~/context/ModalContext";
import { useTodos } from "~/context/TodoContext";
import { motion } from "framer-motion"

const ConfirmDeleteModal: React.FC<{
  text: string;
}> = ({ text }) => {

  const { removeTodo } = useTodos();
  const { todoIdToDelete, closeConfirmDeleteModal } = useModal();

  const confirmAndCloseModal = () => {
    removeTodo(todoIdToDelete);
    closeConfirmDeleteModal();
  };

  return (
    <div
    className="top-0 left-0 z-40 absolute place-items-center grid bg-slate-900/60 backdrop-blur-sm px-2 w-full h-full text-slate-600 dark:text-slate-200 text-xs sm:text-sm xl:text-base"
    onClick={closeConfirmDeleteModal}
    >
        <motion.section 
          className="relative flex flex-col justify-start bg-slate-200 dark:bg-slate-900/95 shadow-2xl dark:backdrop-blur-md p-3 sm:p-5 dark:border dark:border-slate-800 rounded-2xl w-full max-w-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
        <button
            aria-label="close alert"
            className="right-3 sm:right-4 absolute hover:text-violet-500 transition-colors duration-200"
            onClick={closeConfirmDeleteModal}
        >
            <XMarkIcon />
        </button>
        <h2 className="mb-5 font-medium dark:text-slate-100 text-lg md:text-2xl">Are you sure?</h2>
        <p className="text-slate-500 dark:text-slate-400">{text}</p>
        <div className="mt-7 ml-auto">
            <button onClick={closeConfirmDeleteModal} className="font-medium hover:text-violet-500 transition-colors duration-200">Cancel</button>
            <button onClick={confirmAndCloseModal} className="ml-6 btn">
            Confirm
            </button>
        </div>
        </motion.section>
    </div>
  );
};

export default ConfirmDeleteModal;
