import { instance } from './axios'

export const SignInTodo = (email: string, password: string): Promise<any> =>
  instance.post(`/auth/signin`, {
    email,
    password
  })

export const SignUpTodo = (email: string, password: string): Promise<any> =>
  instance.post(`/auth/signup`, {
    email,
    password
  })
