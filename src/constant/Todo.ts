export interface TODO_ITEM {
  id: number
  todo: string
  isCompleted: boolean
}

export interface TODO_ITEM_PROPS {
  todos: TODO_ITEM
  updateTodo: (id: number, todo: string, isCompleted: boolean) => void
  deleteTodo: (id: number) => void
}
