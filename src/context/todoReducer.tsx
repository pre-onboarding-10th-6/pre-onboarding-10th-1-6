import { Todo } from '../interface/todo'

export interface TodoState {
  todos: Todo[]
}

export enum TodoActionTypes {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO'
}

interface SetTodoAction {
  type: TodoActionTypes.SET_TODOS
  payload: TodoState
}

interface AddTodoAction {
  type: TodoActionTypes.ADD_TODO
  payload: Todo
}

interface RemoveTodoAction {
  type: TodoActionTypes.REMOVE_TODO
  payload: {
    id: number
  }
}

interface UpdateTodoAction {
  type: TodoActionTypes.UPDATE_TODO
  payload: Todo
}

export type TodoAction =
  | SetTodoAction
  | AddTodoAction
  | RemoveTodoAction
  | UpdateTodoAction

const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
      return { ...state, todos: action.payload.todos }
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case TodoActionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {
                ...todo,
                todo: action.payload.todo,
                isCompleted: action.payload.isCompleted
              }
            : todo
        )
      }

    default:
      return state
  }
}

export default todoReducer
