export interface Todo {
  id: number
  isCompleted: boolean
  todo: string
  userId: number
}
export interface TodoStatus {
  isEditMode: boolean
  isChecked: boolean
  value: string
}

export interface updateTodo {
  todo: string
  isCompleted: boolean
}
