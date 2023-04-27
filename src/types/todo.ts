export interface TodoProp {
  id: number
  isCompleted: boolean
  todo: string
  userId: number
}

export interface SignInResponse {
  [token: string]: string
}

export interface StatusInResponse {
  [status: number]: number
}
