export interface Todo {
  id: number
  todo: string
  isCompleted: boolean
}

export interface TodoStatus {
  isEditMode: boolean
  isChecked: boolean
  value: string
}

export interface UpdateTodo {
  todo: string
  isCompleted: boolean
}

export interface SignInResponse {
  [access_token: string]: string
}

export interface StatusInResponse {
  [status: number]: number
}

export type SubmitButtonStatus = 'SUBMIT' | 'CANCEL' | 'MODIFY' | 'DELETE'
