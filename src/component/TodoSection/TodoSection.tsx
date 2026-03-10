import React, { useState } from "react";
import TodoHeader from "./TodoHeader";
import type { Todo } from '~/Interface/Todo';
import { useModal } from "~/context/ModalContext";
import { useTodos } from "~/context/TodoContext";
import TodoItem from "./TodoItem";
import DragHint from "./DragHint";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type Props = {
    title: string;
    todos: Todo[] | [];
};

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const TodoSection: React.FC<Props> = ({ title, todos }) => {
    const { openTodoModal } = useModal();
    const { sortByDate, reorderTodos } = useTodos();
    const [isListInView1] = useState<boolean>(false);
    const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

    const sensors = useSensors(
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const todo = todos.find((t) => t.id === active.id);
        setActiveTodo(todo ?? null);
        
        // Prevent scrolling during drag on mobile
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = todos.findIndex((todo) => todo.id === active.id);
            const newIndex = todos.findIndex((todo) => todo.id === over.id);

            const newOrder = arrayMove(todos, oldIndex, newIndex);
            reorderTodos(newOrder);
        }
        
        setActiveTodo(null);
        
        // Re-enable scrolling after drag
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
    };

    const handleDragCancel = () => {
        setActiveTodo(null);
        
        // Re-enable scrolling if drag is cancelled
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
    };

    const todosTitle = `${title} (${todos.length} ${todos.length === 1 ? "todo" : "todos"
        })`;

    return (
        <main className="ml-auto pt-5 pr-3 md:pr-8 pb-8 sm:pb-16 pl-3 md:pl-8 xl:pl-0 md:w-full xl:w-4/5 min-h-screen">
            <DragHint />
            <TodoHeader />
            <section>
                <h1 className="my-5 sm:my-8 font-medium dark:text-slate-200 text-lg md:text-2xl sm:text-left text-center">
                    {todosTitle}
                </h1>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <SortableContext
                        items={todos.map(todo => todo.id)}
                        strategy={verticalListSortingStrategy}
                        disabled={sortByDate}
                    >
                        <motion.ul
                            className={`todosList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${isListInView1
                                ? "grid-cols-1"
                                : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
                                }`}
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            layout
                        >
                            {todos.map((todo) => (
                                todo.visibility ?
                                    <TodoItem 
                                        key={todo.id} 
                                        isListInView1={isListInView1} 
                                        todo={todo} 
                                        isDragDisabled={sortByDate}
                                    /> :
                                    null
                            ))
                            }
                            <motion.li variants={item}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button
                                    onClick={openTodoModal}
                                    className={`border-2 border-slate-300
                    text-slate-400 w-full rounded-xl
                    border-dashed transition-all duration-200 hover:bg-slate-300
                    hover:text-slate-600 hover:border-violet-400
                    dark:border-slate-700 dark:hover:bg-slate-800/50 dark:hover:text-slate-300 dark:hover:border-violet-500 ${isListInView1 ? "h-20 sm:h-32" : "h-52 sm:h-64"
                                        }`}
                                >
                                    Add new todo
                                </button>
                            </motion.li>
                        </motion.ul>
                    </SortableContext>
                    <DragOverlay>
                        {activeTodo ? (
                            <div className="opacity-80 rotate-3 scale-105">
                                <TodoItem 
                                    isListInView1={isListInView1} 
                                    todo={activeTodo} 
                                    isDragDisabled={false}
                                    isOverlay={true}
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </section>
        </main>
    );
};

export default React.memo(TodoSection);

