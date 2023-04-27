export interface Todo {
  id: number
  todo: string
  isCompleted: boolean
}

export interface TodoComponentProps {
  todos: Todo
  updateTodo: (id: number, todo: string, isCompleted: boolean) => void
  deleteTodo: (id: number) => void
}
