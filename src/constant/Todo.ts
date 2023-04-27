export interface TODO_ITEM {
  id: number
  todo: string
  isCompleted: boolean
}

export interface TODO_ITEM_PROPS {
  todos: TODO_ITEM
  checked: boolean
  editTodo: (id: number, todo: string, isCompleted: boolean) => void
}
