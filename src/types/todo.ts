export interface TodoProp {
  id: number
  isCompleted: boolean
  todo: string
  userId: number
}

export interface SignInResponse {
  [access_token: string]: string
}

export interface StatusInResponse {
  [status: number]: number
}
