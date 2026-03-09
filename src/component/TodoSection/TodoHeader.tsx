import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useModal } from "~/context/ModalContext";
import { useProgressMenu } from "~/context/ProgressMenuContext";
import SearchField from "./SearchField";
import SortToggle from "./SortToggle";

const TodoHeader: React.FC = () => {
    const { setTitle, setTodo, openTodoModal } = useModal();
    const { openProgressMenu } = useProgressMenu();

    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    const monthName: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const todayDate = `${year}, ${monthName[month]?.slice(0, 3) ?? 'Unknown'} ${day
        .toString()
        .padStart(2, "0")}`;

    const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}}`;

    const addNewTodo = () => {
        setTitle("Add a todo");
        setTodo({
            title: '',
            description: '',
            date: '',
            completed: false,
            important: false,
            id: '',
            visibility: true
        });
        openTodoModal()
    }

    return (
        <header className="relative flex flex-col gap-4">
            {/* Top row: Menu button, Logo (center on mobile), Add button */}
            <div className="flex justify-between items-center">
                <button onClick={openProgressMenu} className="xl:hidden block">
                    <Bars3BottomLeftIcon className="w-6 h-6" />
                </button>
                
                <div className="xl:hidden flex flex-col flex-1 justify-center items-center">
                    <span className="font-bold text-slate-600 dark:text-slate-100 text-sm uppercase tracking-wide">
                        Kiro Note
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                        記録ノート
                    </span>
                </div>

                <button className="xl:hidden right-4 bottom-4 z-20 fixed shadow-violet-500/30 shadow-xl dark:shadow-violet-900/50 px-5 py-3 text-sm btn"
                    onClick={addNewTodo}>
                    Add
                </button>
            </div>

            {/* Desktop layout: Search, Date, Add button */}
            <div className="hidden xl:flex xl:justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <SearchField />
                    <SortToggle />
                </div>
                <div className="left-1/2 absolute -translate-x-1/2">
                    <time dateTime={dateTimeFormat} className="dark:text-slate-300 whitespace-nowrap">{todayDate}</time>
                </div>
                <button className="min-w-max btn"
                    onClick={addNewTodo}>
                    Add new todo
                </button>
            </div>

            {/* Mobile: Search bar below */}
            <div className="xl:hidden flex items-center gap-2">
                <SearchField />
                <SortToggle />
            </div>
        </header>
    );
};

export default TodoHeader;
