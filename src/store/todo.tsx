import React, { createContext, useReducer, ReactNode } from "react";

const TodoContext = createContext({
  todos: [] as Todo[],
  setTodos: (todos: Todo[]) => { todos },
  addTodo: (todo: Todo) => { todo },
  removeTodo: (id: number) => { id },
  toggleTodo: (id: number) => { id },
  updateTodo: (id: number, todo: string) => { id; todo },
});

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer((state: Todo[], action: { type: string, payload: unknown }) => {
    switch (action.type) {
      case "SET_TODOS":
        return action.payload as Todo[];
      case "ADD_TODO":
        return [...state, action.payload as Todo];
      case "REMOVE_TODO":
        return state.filter((todoItem: Todo) => todoItem.id !== action.payload);
      case "TOGGLE_TODO":
        return state.map((todoItem: Todo) =>
          todoItem.id === action.payload
            ? { ...todoItem, isCompleted: !todoItem.isCompleted }
            : todoItem
        );
      case "UPDATE_TODO":
        const { id, todo } = action.payload as { id: number, todo: string };
        return state.map((todoItem: Todo) =>
          todoItem.id === id
            ? { ...todoItem, todo }
            : todoItem
        );
      default:
        throw new Error("unknown action type");
    }
  }, []);

  const setTodos = (todos: Todo[]) => {
    dispatch({ type: "SET_TODOS", payload: todos });
  };

  const addTodo = (todo: Todo) => {
    dispatch({ type: "ADD_TODO", payload: todo });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };
  const updateTodo = (id: number, todo: string) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, todo } });
  };

  return <TodoContext.Provider value={{ todos, setTodos, addTodo, removeTodo, toggleTodo, updateTodo }} >
    {children}
  </TodoContext.Provider>
};

const useTodoContext = () => React.useContext(TodoContext);

export default useTodoContext;