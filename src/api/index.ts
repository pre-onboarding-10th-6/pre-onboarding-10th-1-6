import axios from 'axios'

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop'

export const SignInTodo = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/auth/signin`, {
    email,
    password
  })

  return res.data?.access_token
}

export const SignUpTodo = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      email,
      password
    })
    return res.status
  } catch (error: any) {
    return error.response.status
  }
}
