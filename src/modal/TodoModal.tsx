

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState, useRef } from "react";
import { useModal } from "~/context/ModalContext";
import type { Todo } from "~/Interface/Todo";
import { motion } from "framer-motion"
import { useTodos } from "~/context/TodoContext";

const TodoModal: React.FC<{
  todo?: Todo;
  nameForm: string;
}> = ({ todo, nameForm }) => {

  const { createTodo, editTodo } = useTodos();

  const today: Date = new Date();
  let day: number = today.getDate();
  let month: number = today.getMonth() + 1;
  const year: number = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate: string = year + "-" + month + "-" + day;
  const maxDate: string = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState<string>(() => {
    if (todo) {
      return todo.description;
    }
    return "";
  });
  const [title, setTitle] = useState<string>(() => {
    if (todo) {
      return todo.title;
    }
    return "";
  });
  const [date, setDate] = useState<string>(() => {
    if (todo) {
      return todo.date;
    }
    return todayDate;
  });
  const isTitleValid = useRef<boolean>(false);
  const isDateValid = useRef<boolean>(false);

  const [isImportant, setIsImportant] = useState<boolean>(() => {
    if (todo) {
      return todo.important;
    }
    return false;
  });

  const { closeTodoModal } = useModal();


  const addNewTodoHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTodo: Todo = {
        title: title,
        description: description,
        date: date,
        completed: todo? todo.completed : false,
        important: isImportant,
        id: todo?.id ? todo.id : Date.now().toString(),
        visibility: true
      };

      nameForm === "Add a todo"? createTodo(newTodo) : editTodo(newTodo);
      closeTodoModal();
    }
  };
  return (
    <div
      className="z-40 fixed place-items-center grid bg-slate-900/60 backdrop-blur-sm px-2 w-full h-full text-slate-600 dark:text-slate-200 text-xs sm:text-sm xl:text-base"
      onClick={closeTodoModal}
    >
      <motion.section
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative flex flex-col justify-start bg-slate-200 dark:bg-slate-900/95 shadow-2xl dark:backdrop-blur-md p-3 sm:p-5 dark:border dark:border-slate-800 rounded-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="close alert"
          className="right-3 sm:right-4 absolute"
          onClick={closeTodoModal}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="mb-5 font-medium text-lg md:text-2xl">{nameForm}</h2>
        <form
          className="flex flex-col stylesInputsField"
          onSubmit={addNewTodoHandler}
        >
          <label>
            Title
            <input
              type="text"
              placeholder="e.g, study for the test"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="w-full"
            />
          </label>
          <label>
            Date
            <input
              type="date"
              className="w-full"
              value={date}
              required
              onChange={({ target }) => setDate(target.value)}
              min={todayDate}
              max={maxDate}
            />
          </label>
          <label>
            Description (optional)
            <textarea
              placeholder="e.g, study for the test"
              className="w-full"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            ></textarea>
          </label>
          <InputCheckbox
            isChecked={isImportant}
            setChecked={setIsImportant}
            label="Mark as important"
          />
          <button type="submit" className="mt-5 btn">
            {nameForm}
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default TodoModal;

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="flex items-center mb-0 cursor-pointer">
      <div className="place-items-center grid bg-slate-300/[.5] dark:bg-slate-800 mr-2 border border-slate-300 dark:border-slate-700 rounded-full w-5 h-5">
        {isChecked && (
          <span className="block bg-violet-600 dark:bg-violet-800 rounded-full w-2 h-2"></span>
        )}
      </div>
      <span className="flex-1 order-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev: boolean) => !prev)}
      />
    </label>
  );
};
