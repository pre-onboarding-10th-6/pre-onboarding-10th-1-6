import { authInstance } from '../utils/axios'

export const SignInTodo = (email: string, password: string) =>
  authInstance.post(`/auth/signin`, {
    email,
    password
  })

export const SignUpTodo = (email: string, password: string) =>
  authInstance.post(`/auth/signup`, {
    email,
    password
  })

// export const SignUpTodo = async (email: string, password: string) => {
//   try {
//     const res = await authInstance.post(`/auth/signup`, {
//       email,
//       password
//     })
//     return res.status
//   } catch (error: any) {
//     return error.response.status
//   }
// }
