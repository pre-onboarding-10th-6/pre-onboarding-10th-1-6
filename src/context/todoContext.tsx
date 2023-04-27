import React, { createContext, useContext, useReducer } from 'react'

import todoReducer, { TodoState, TodoAction } from './todoReducer'

const initialState: TodoState = {
  todos: []
}

const TodoStateContext = createContext<TodoState | null>(null)
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | null>(
  null
)

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

const useTodoState = () => {
  const context = useContext(TodoStateContext)
  if (!context)
    throw new Error('useTodoContext must be used within a TodoProvider')
  return context
}

const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext)
  if (!context)
    throw new Error('useTodoDispatch must be used within a TodoProvider')
  return context
}

export { TodoProvider, useTodoState, useTodoDispatch }
