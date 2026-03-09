import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Todo } from '~/Interface/Todo';


interface TodoContextType {
  todos: Todo[];
  sortByDate: boolean;
  initTodo: () => void;
  createTodo: (newTodo: Todo) => void;
  editTodo: (editedTodo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  toggleImportant: (id: string) => void;
  enableAllVisibility: (matachedTodos?: Todo[]) => void;
  toggleSortByDate: () => void;
  reorderTodos: (newOrder: Todo[]) => void;
}

const date: Date = new Date();
const year: number = date.getFullYear();
const month: number = date.getMonth() + 1;
const day: number = date.getDate();

const todayDate = `${year}-${month.toString().padStart(2, "0")}-${day
  .toString()
  .padStart(2, "0")}`;

const defaultTodos: Todo[] = [
  {
    title: "Learn Nextjs",
    important: true,
    description: "Explore the official Nextjs website and their documentation. Looks for beginner tutorials on media platforms such as Youtube.",
    date: todayDate,
    completed: true,
    id: "t1",
    visibility: true,
  },
  {
    title: "Create a Nextjs App",
    important: false,
    description: "Learn the command to create a new Nextjs App and try to start the development environment. Goal is to see the landing page of Nextjs.",
    date: todayDate,
    completed: true,
    id: "t2",
    visibility: true,
  },
  {
    title: "Import Tailwindcss and Heroicons beforehand",
    important: false,
    description: "Find the way to properly import and configure the package to Nextjs App and try to apply the style to test it.",
    date: todayDate,
    completed: false,
    id: "t3",
    visibility: true,
  },
  {
    title: "Demonstration of Todo",
    important: true,
    description: "This todo is to demonstrate that is not today date.",
    date: "2100-10-5",
    completed: false,
    id: "t4",
    visibility: true,
  },
  {
    title: "Demonstration of Todo 2",
    important: false,
    description: "This todo is to demonstrate that is not today date.",
    date: "2100-10-5",
    completed: false,
    id: "t5",
    visibility: true,
  }
];

const defaultContextValue: TodoContextType = {
  todos: defaultTodos,
  sortByDate: true,
  initTodo: () => {
    // Implementation pending
  },
  createTodo: () => {
    // Implementation pending
  },
  editTodo: () => {
    // Implementation pending
  },
  removeTodo: () => {
    // Implementation pending
  },
  toggleTodo: () => {
    // Implementation pending
  },
  toggleImportant: () => {
    // Implementation pending
  },
  enableAllVisibility: () => {
    // Implementation pending
  },
  toggleSortByDate: () => {
    // Implementation pending
  },
  reorderTodos: () => {
    // Implementation pending
  }
};

const TodoContext = createContext<TodoContextType>(defaultContextValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortByDate, setSortByDate] = useState<boolean>(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const parsedTodos: Todo[] = JSON.parse(storedTodos) as Todo[];
        // Validate that it's an array
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          setTodos(defaultTodos);
          localStorage.setItem('todos', JSON.stringify(defaultTodos));
        }
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
        setTodos(defaultTodos);
        localStorage.setItem('todos', JSON.stringify(defaultTodos));
      }
    } else {
      // No todos in localStorage, use default todos
      setTodos(defaultTodos);
      localStorage.setItem('todos', JSON.stringify(defaultTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const toMilliseconds = (date: string) => Date.parse(date);
  const sortTodos = (todos: Todo[]) => {
    if (!sortByDate) return todos;
    return todos.slice().sort((todo1, todo2) => {
      const date1 = toMilliseconds(todo1.date);
      const date2 = toMilliseconds(todo2.date);

      // First, sort by date
      if (date1 < date2) {
        return -1;
      }
      if (date1 > date2) {
        return 1;
      }
      
      // If dates are the same, sort by importance (important first)
      if (todo1.important && !todo2.important) {
        return -1;
      }
      if (!todo1.important && todo2.important) {
        return 1;
      }
      
      // If importance is the same, sort by completion status (in progress first)
      if (!todo1.completed && todo2.completed) {
        return -1;
      }
      if (todo1.completed && !todo2.completed) {
        return 1;
      }
      
      return 0;
    });
  };

  const toggleSortByDate = () => {
    setSortByDate(prev => !prev);
  };

  const reorderTodos = (newOrder: Todo[]) => {
    setTodos(newOrder);
  };

  const initTodo = (): void => {
    // This function is no longer needed as initialization happens in useEffect
    // Keeping it for backward compatibility
  }

  const createTodo = (newTodo: Todo): void => {
    setTodos(prevTodos => sortTodos([...prevTodos, newTodo]));
  };

  const editTodo = (editedTodo: Todo): void => {
    setTodos(prevTodos => sortTodos(prevTodos.map(todo => (todo.id === editedTodo.id ? editedTodo : todo))));
  };
  
  const removeTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleImportant = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  };

  const enableAllVisibility = (matachedTodos?: Todo[]) => {
    setTodos(todos.map(todo => matachedTodos ?
      (matachedTodos.includes(todo) ?
        { ...todo, visibility: true } :
        { ...todo, visibility: false })
      :
      ({ ...todo, visibility: true })));
  };

  return (
    <TodoContext.Provider value={{ todos: sortTodos(todos), sortByDate, initTodo, createTodo, editTodo, removeTodo, toggleTodo, toggleImportant, enableAllVisibility, toggleSortByDate, reorderTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);