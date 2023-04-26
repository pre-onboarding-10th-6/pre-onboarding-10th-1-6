import { authInstance } from '../utils/axios'

export const SignInTodo = async (email: string, password: string) => {
  // const res = await axios.post(`${BASE_URL}/auth/signin`, {
  //   email,
  //   password
  // })
  const res = await authInstance.post(`/auth/signin`, {
    email,
    password
  })

  return res.data.access_token
}

export const SignUpTodo = async (email: string, password: string) => {
  try {
    const res = await authInstance.post(`/auth/signup`, {
      email,
      password
    })
    return res.status
  } catch (error: any) {
    return error.response.status
  }
}
