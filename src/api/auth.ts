import { authInstance } from '.'

export const SignInTodo = (email: string, password: string): Promise<any> =>
  authInstance.post(`/auth/signin`, {
    email,
    password
  })

export const SignUpTodo = (email: string, password: string): Promise<any> =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  })
